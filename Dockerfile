# Étape 1 : Installation des dépendances
FROM node:20-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Étape 2 : Build de l'application
FROM node:20-bookworm-slim AS builder
WORKDIR /app

# Installation d'OpenSSL pour le build
RUN apt-get update && apt-get install -y openssl

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Générer le client Prisma avec les bons binaires
RUN npx prisma generate
RUN npm run build

# Étape 3 : Image de production
FROM node:20-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

# ⚠️ AJOUT CRUCIAL : Installer OpenSSL aussi dans l'étape runner
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Créer un utilisateur non-root
RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]