#!/bin/bash

# ====================================================
# VORA - VPS Setup Script
# ====================================================

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}>>> Iniciando despliegue de VORA...${NC}"

# 1. Configurar Variables de Entorno
if [ ! -f .env ]; then
    echo -e "${BLUE}>>> Creando archivo .env...${NC}"
    
    # Generar un secret aleatorio
    AUTH_SECRET=$(openssl rand -base64 32)
    
    cat > .env << EOL
# --- DATABASE ---
DATABASE_URL="postgresql://postgres:postgres@db:5432/vora?schema=public"

# --- NEXTAUTH ---
NEXTAUTH_URL="https://vora.usev.app"
NEXTAUTH_SECRET="${AUTH_SECRET}"

# --- APP ---
NEXT_PUBLIC_APP_URL="https://vora.usev.app"
NODE_ENV="production"
EOL
    echo -e "${GREEN}>>> Archivo .env creado con éxito.${NC}"
else
    echo -e "${BLUE}>>> Archivo .env ya existe, saltando creación.${NC}"
fi

# 2. Docker Deploy
echo -e "${BLUE}>>> Levantando contenedores Docker...${NC}"
docker compose -f docker-compose.prod.yml up -d --build

# 3. Esperar a que la DB esté lista
echo -e "${BLUE}>>> Esperando a la base de datos...${NC}"
sleep 10

# 4. Migraciones y Seed
echo -e "${BLUE}>>> Ejecutando migraciones y seed...${NC}"
docker exec vora-web npx prisma db push
docker exec vora-web npx prisma db seed

# 5. Configuración Nginx
NGINX_CONF="/etc/nginx/sites-available/vora.usev.app"

if [ -d "/etc/nginx/sites-available" ]; then
    echo -e "${BLUE}>>> Configurando Nginx...${NC}"
    
    # Check if we have sudo privileges
    if [ "$EUID" -ne 0 ]; then 
        echo -e "${RED}Nota: Se requiere sudo para configurar Nginx. Te pedirá contraseña.${NC}"
        SUDO="sudo"
    else
        SUDO=""
    fi

    # Crear config
    $SUDO bash -c "cat > $NGINX_CONF" << EOL
server {
    server_name vora.usev.app;

    location / {
        proxy_pass http://localhost:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

    # Link simbólico
    if [ ! -f "/etc/nginx/sites-enabled/vora.usev.app" ]; then
        $SUDO ln -s $NGINX_CONF /etc/nginx/sites-enabled/
    fi

    # Test y Restart
    $SUDO nginx -t && $SUDO systemctl restart nginx
    echo -e "${GREEN}>>> Nginx configurado exitosamente.${NC}"
else
    echo -e "${RED}>>> No se detectó instalación estándar de Nginx. Saltando configuración automática.${NC}"
fi

# 6. Certbot (SSL)
echo -e "${BLUE}====================================================${NC}"
echo -e "${GREEN}>>> DESPLIEGUE FINALIZADO${NC}"
echo -e "${BLUE}====================================================${NC}"
echo -e "Para activar HTTPS, ejecutá manualmente:"
echo -e "${GREEN}sudo certbot --nginx -d vora.usev.app${NC}"
echo -e "${BLUE}====================================================${NC}"
