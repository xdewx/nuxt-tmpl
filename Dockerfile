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

RUN corepack enable && corepack prepare pnpm@11.21.0 --activate

COPY pnpm-lock.yaml package.json .npmrc pnpm-workspace.yaml nuxt.config.ts tsconfig.json ./

# Drop the root `postinstall: nuxt prepare` — it needs source files that are only
# COPY'd below; dependency build scripts (better-sqlite3 etc.) still run normally
RUN npm pkg delete scripts.postinstall && HUSKY=0 pnpm install --frozen-lockfile

COPY . .

RUN touch .env.production

ARG DATABASE_URL=file:./data/dev.db
ENV DATABASE_URL=$DATABASE_URL
RUN npx prisma generate

RUN pnpm build

# ===== Runner: Debian-slim to match builder's glibc (better-sqlite3 native binary) =====
FROM node:24-slim AS runner

ARG UID=1001

WORKDIR /app

RUN useradd -M -d /app -u ${UID} -s /usr/sbin/nologin nuxt \
    && mkdir -p /app/data && chown -R nuxt /app

COPY --from=builder /app/.output /app/.output

EXPOSE 3000

ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0

USER nuxt

CMD ["node", ".output/server/index.mjs"]
