FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY pnpm-lock.yaml package.json .npmrc ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

ARG UID=1000

FROM node:22-alpine AS runner

WORKDIR /app

RUN addgroup --system --gid ${UID} nodejs && \
    adduser --system --uid ${UID} nuxt

COPY --from=builder /app/.output /app/.output

EXPOSE 3000

ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0

USER nuxt

CMD ["node", ".output/server/index.mjs"]
