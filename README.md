# 🏥 VORA - Medicine Beyond Distance

**VORA** es una plataforma SaaS que conecta profesionales de la salud itinerantes con pacientes en zonas remotas, especialmente Ushuaia y Tierra del Fuego.

![VORA Banner](./public/og-image.png)

## ✨ Características Principales

### Para Pacientes
- 🔍 **Discovery Engine**: Buscá profesionales por especialidad, fecha de llegada y valoración
- 📅 **Reserva de Turnos**: Sistema automatizado de turnos con recordatorios
- 📁 **Vault Médico**: Acceso seguro a recetas y estudios compartidos
- ⭐ **Reviews**: Sistema de valoraciones verificadas

### Para Profesionales
- 📆 **Gestión de Giras**: Publicá tus viajes médicos con fechas y disponibilidad
- 💳 **Cobro de Señas**: Integración con MercadoPago/Stripe
- 🔒 **Vault Médico**: Compartí documentos encriptados con tus pacientes
- 📊 **Analytics**: Panel con métricas de tu práctica

### Planes de Suscripción
| Feature | Start (Gratis) | Grow ($15.000/mes) | Elite ($35.000/mes) |
|---------|----------------|--------------------|--------------------|
| Perfil Público | ✅ | ✅ | ✅ |
| Giras por mes | 1 | 4 | Ilimitadas |
| WhatsApp Button | ❌ | ✅ | ✅ |
| Cobro de Señas | ❌ | ❌ | ✅ |
| Vault Médico | ❌ | ❌ | ✅ |
| Recordatorios Auto | ❌ | ❌ | ✅ |

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **UI**: Framer Motion, Lucide Icons, Shadcn-inspired components
- **Backend**: Next.js Server Actions, tRPC (opcional)
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js con RBAC
- **Storage**: Supabase Storage / AWS S3
- **Payments**: MercadoPago, Stripe
- **Containerization**: Docker + Docker Compose

## 🚀 Quick Start

### Prerrequisitos
- Node.js 20+
- PostgreSQL 16+
- Docker (opcional)

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/vora.git
cd vora

# Instalar dependencias
npm install

# Configurar variables de entorno
cp env.template .env.local
# Editar .env.local con tus valores

# Generar cliente Prisma
npm run db:generate

# Ejecutar migraciones
npm run db:push

# Sembrar datos iniciales
npm run db:seed

# Iniciar servidor de desarrollo
npm run dev
```

### Con Docker

```bash
# Levantar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f web
```

## 📁 Estructura del Proyecto

```
vora/
├── prisma/
│   ├── schema.prisma      # Esquema de base de datos
│   └── seed.ts            # Datos iniciales
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (auth)/        # Rutas de autenticación
│   │   ├── admin/         # Panel de administración
│   │   ├── dashboard/     # Panel de profesional
│   │   ├── paciente/      # Panel de paciente
│   │   ├── buscar/        # Discovery engine
│   │   ├── profesionales/ # Perfiles públicos
│   │   └── precios/       # Página de precios
│   ├── components/
│   │   ├── ui/            # Componentes atómicos
│   │   ├── layout/        # Layout components
│   │   └── forms/         # Form components
│   ├── lib/               # Utilidades y configuración
│   ├── hooks/             # Custom React hooks
│   ├── store/             # Zustand stores
│   └── types/             # TypeScript definitions
├── public/                # Assets estáticos
├── Dockerfile             # Imagen de producción
└── docker-compose.yml     # Orquestación de servicios
```

## 🔐 Roles de Usuario

| Rol | Descripción |
|-----|-------------|
| `SUPER_ADMIN` | Acceso total a la plataforma |
| `PRO_START` | Profesional con plan gratuito |
| `PRO_GROW` | Profesional con plan Grow |
| `PRO_ELITE` | Profesional con plan Elite |
| `PATIENT` | Paciente / Usuario final |

## 📜 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo con Turbopack
npm run build        # Build de producción
npm run start        # Iniciar en producción
npm run lint         # Linter
npm run db:generate  # Generar cliente Prisma
npm run db:push      # Push schema a DB
npm run db:migrate   # Crear migración
npm run db:seed      # Sembrar datos
npm run db:studio    # Abrir Prisma Studio
npm run db:reset     # Reset completo de DB
```

## 🎨 Design System

### Colores
- **Primary**: `#0A192F` (Midnight Navy - Confianza)
- **Accent**: `#00F5D4` (Electric Mint - Tech/Frescura)
- **Secondary**: `#64748B` (Slate - Modernidad)

### Tipografía
- **Sans**: Inter
- **Display**: Plus Jakarta Sans

## 📄 Cuentas de Demo

Después de ejecutar `npm run db:seed`:

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@vora.health | admin123 |
| Profesional | demo.doctor@vora.health | demo123 |
| Paciente | paciente@demo.com | demo123 |

## 🤝 Contribuir

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-feature`)
3. Commit cambios (`git commit -m 'Add nueva feature'`)
4. Push a la rama (`git push origin feature/nueva-feature`)
5. Abrir Pull Request

## 📝 Licencia

MIT License - Ver [LICENSE](LICENSE) para más detalles.

---

**VORA** - Conectando salud y distancia 🏥🌎

Desarrollado con ❤️ para el fin del mundo
