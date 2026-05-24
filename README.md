# Nuxt Template

always use the latest version of Nuxt

## Features

- i18n（国际化）
- Pinia（状态管理）
- Element Plus（UI 组件库）
- UnoCSS（原子化 CSS）
- ESLint（代码检查）
- VueUse（组合式工具集）
- unplugin-icons（图标自动引入）
- vue3-context-menu（右键菜单）
- Husky & commitlint（Git 提交规范）
- Prisma + SQLite（数据库，可选 PostgreSQL）
- Auth: Clerk / Better-Auth / Supabase（可选）

## Auth

通过环境变量切换认证方式：

```bash
# clerk（默认）
ENABLE_CLERK=1
NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY=xxx
NUXT_CLERK_SECRET_KEY=xxx

# better-auth
ENABLE_BETTER_AUTH=1
BETTER_AUTH_SECRET=xxx

# supabase
NUXT_PUBLIC_AUTH_PROVIDER=supabase
NUXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NUXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

## Database

### Prisma（默认）

```bash
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:studio
```

### Supabase（可选）

搭配 Supabase CLI 使用，`scripts/supabase` 会自动从 `.env` 读取 `SUPABASE_DB_URL` 并注入 `PGSSLMODE=disable`：

```bash
# 推送迁移到本地数据库
./scripts/supabase db push

# 创建新迁移文件
supabase migration new 描述
./scripts/supabase db push
```

## Scripts

| 脚本 | 用途 |
|------|------|
| `scripts/supabase` | Supabase CLI wrapper，自动注入 `--db-url` + `PGSSLMODE=disable`（绕过 bug #4839） |

## Development

```bash
pnpm dev
```

## TODO

- [ ] global error handler at server side
- [ ] [`@clerk/nuxt` not work under `hashMode`](https://github.com/clerk/javascript/issues/8357)
- [ ] `afterSignOutUrl` & `signInForceRedirectUrl` not work

## FAQ

1. Could not locate the bindings file: better-sqlite3

> `pnpm rebuild better-sqlite3`
