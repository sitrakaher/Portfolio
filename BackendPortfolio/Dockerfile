# 1️⃣ Stage dependencies
FROM node:24-alpine AS deps
WORKDIR /app
COPY package*.json ./
# Copier Prisma config et schema pour npm install/postinstall
RUN npm install
COPY prisma ./prisma
COPY prisma.config.ts ./

# 2️⃣ Stage build
FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN npx prisma generate

# 3️⃣ Stage production
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src ./src
COPY --from=builder /app/package*.json ./

EXPOSE 4000
CMD ["node", "src/server/app.js"]