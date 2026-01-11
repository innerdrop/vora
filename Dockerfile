# ============================================================
# VORA - Production Dockerfile
# Using Debian Slim for better compatibility with Prisma/OpenSSL
# ============================================================

FROM node:20-slim AS base

# Install dependencies only when needed
FROM base AS deps
RUN apt-get update && apt-get install -y openssl
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Generate Prisma client
RUN npx prisma generate

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build the application
# Note: Database access during build might fail, so we ensure 
# pages that need DB are dynamic or handle errors gracefully.
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user with home directory
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 --ingroup nodejs --home /home/nextjs --shell /bin/bash nextjs

# Set correct permissions for home
RUN mkdir -p /home/nextjs && chown -R nextjs:nodejs /home/nextjs

# Copy built assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# Copy FULL node_modules to ensure Prisma CLI is available
COPY --from=builder /app/node_modules ./node_modules

# Set permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
ENV HOME "/home/nextjs"

CMD ["node", "server.js"]
