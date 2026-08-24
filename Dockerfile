# ==========================================
# STAGE 1: Dependencies (Dependencies only)
# ==========================================
FROM node:20-alpine AS deps
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

# ==========================================
# STAGE 2: Builder (Compile TS & Assets)
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

RUN npm run test:e2e

RUN npm run build

ENV NODE_ENV=production
RUN npm prune --production

# ==========================================
# STAGE 3: Production Runner
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production

USER node

COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist
COPY --chown=node:node --from=builder /usr/src/app/public ./public

EXPOSE 3000

CMD ["node", "dist/main.js"]