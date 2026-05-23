# ===== Builder: Debian-based for best prebuilt binary compatibility =====
FROM node:24-slim AS builder

RUN sed -i 's|deb.debian.org|mirrors.ustc.edu.cn|g' /etc/apt/sources.list.d/debian.sources 2>/dev/null; \
    sed -i 's|security.debian.org|mirrors.ustc.edu.cn|g' /etc/apt/sources.list.d/debian.sources 2>/dev/null; \
    apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    g++ \
    make \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10 --activate

COPY pnpm-lock.yaml package.json .npmrc pnpm-workspace.yaml nuxt.config.ts tsconfig.json ./

RUN HUSKY=0 pnpm install --frozen-lockfile

COPY . .

RUN touch .env.production

ARG DATABASE_URL=file:./data/dev.db
ENV DATABASE_URL=$DATABASE_URL
RUN npx prisma generate

RUN pnpm build

# ===== Runner: Alpine for minimal final image =====
FROM node:24-alpine AS runner

ARG UID=1001

WORKDIR /app

RUN adduser -S -u ${UID} nuxt

COPY --from=builder /app/.output /app/.output

EXPOSE 3000

ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0

USER nuxt

CMD ["node", ".output/server/index.mjs"]
