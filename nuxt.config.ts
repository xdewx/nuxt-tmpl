// https://nuxt.com/docs/api/configuration/nuxt-config
import IconsResolver from "unplugin-icons/resolver";
import ViteComponents from "unplugin-vue-components/vite";
import typescript from "@rollup/plugin-typescript";

// console.info(process.env);

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,
  clerk: {
    // signInUrl: "/sign-in",
    // signUpUrl: "/sign-up",
    afterSignOutUrl: "/",
    signInForceRedirectUrl: "/dashboard",
    signInFallbackRedirectUrl: "/dashboard",
  },
  app: {},
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    baseUrl: process.env.BASE_URL,
    clerk: {
      enabled: process.env.ENABLE_CLERK === "1",
      secretKey: process.env.NUXT_CLERK_SECRET_KEY,
    },
    betterAuth: {
      enabled: process.env.ENABLE_BETTER_AUTH === "1",
      secret: process.env.BETTER_AUTH_SECRET,
      baseUrl: process.env.BETTER_AUTH_URL || process.env.BASE_URL,
    },
  },
  appConfig: {},
  build: {
    transpile: [],
  },
  css: ["@/assets/index.css"],
  nitro: {
    externals: {},
    ignore: [],
    imports: {
      exclude: [],
    },
    rollupConfig: {
      plugins: [
        // typescript({})
      ],
    },
  },
  imports: {
    scan: false,
    presets: [],
    dirs: [],
  },
  components: {
    dirs: [],
  },
  router: {
    options: {
      hashMode: false,
    },
  },
  vite: {
    plugins: [
      ViteComponents({
        resolvers: [IconsResolver({})],
      }),
    ],
    optimizeDeps: {
      include: [
        "dayjs", // CJS
        "dayjs/plugin/*.js",
        "lodash-unified",
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "@imengyu/vue3-context-menu",
      ],
    },
  },
  modules: [
    "@clerk/nuxt",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@element-plus/nuxt",
    // "@nuxtjs/stylelint-module",
    "@vueuse/nuxt",
    [
      "unplugin-icons/nuxt",
      {
        autoInstall: true,
      },
    ],
    "@unocss/nuxt",
  ],
  i18n: {
    defaultLocale: "zh-CN",
    locales: [
      {
        code: "zh-CN",
        name: "中文",
        file: "zh-CN.json",
      },
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
    ],
  },
  eslint: {
    config: {},
  },
});
