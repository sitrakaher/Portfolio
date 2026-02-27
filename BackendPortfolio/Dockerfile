# ── Stage builder ──
FROM node:24-alpine AS builder
WORKDIR /app

# Copier uniquement package.json + package-lock.json
COPY package*.json ./

COPY prisma ./prisma/

# Installer toutes les dépendances (dev inclus pour Prisma)
RUN npm ci

# Copier tout le code (y compris prisma/schema.prisma)
COPY . .

# Variables pour Prisma au build
ARG DATABASE_URL
ARG JWT_SECRET
ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=$JWT_SECRET

# Générer Prisma Client
RUN npx prisma generate

# ── Stage runner (image finale légère) ──
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 expressjs

# Copier seulement ce qui est nécessaire depuis builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src ./src
COPY --from=builder /app/package*.json ./

USER expressjs

EXPOSE 4000

RUN 

CMD npx prisma db seed && node src/server/app.js