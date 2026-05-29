// https://nuxt.com/docs/api/configuration/nuxt-config
import IconsResolver from "unplugin-icons/resolver";
import ViteComponents from "unplugin-vue-components/vite";
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
    clerk: {
      secretKey: process.env.NUXT_CLERK_SECRET_KEY,
    },
    betterAuth: {
      secret: process.env.BETTER_AUTH_SECRET,
    },
    public: {
      authProvider: process.env.NUXT_PUBLIC_AUTH_PROVIDER || "",
      baseUrl: process.env.BASE_URL || "",
      betterAuth: {
        baseUrl: process.env.BETTER_AUTH_URL || process.env.BASE_URL || "",
      },
      supabase: {
        url: process.env.NUXT_PUBLIC_SUPABASE_URL || "",
        anonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || "",
      },
    },
  },

  appConfig: {},

  build: {
    transpile: [],
  },

  css: ["@/assets/style/index.css"],

  nitro: {
    externals: {},
    ignore: [],
    imports: {
      exclude: [],
    },
    rollupConfig: {
      plugins: [],
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
        "dayjs",
        "dayjs/plugin/*.js",
        "lodash-unified",
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "@imengyu/vue3-context-menu",
        "@supabase/ssr",
      ],
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@element-plus/nuxt",
    "@vueuse/nuxt",
    [
      "unplugin-icons/nuxt",
      {
        autoInstall: true,
      },
    ],
    "@unocss/nuxt",
    ...(process.env.NUXT_PUBLIC_AUTH_PROVIDER === "clerk"
      ? (() => {
          try {
            require.resolve("@clerk/nuxt");
            return ["@clerk/nuxt"];
          } catch {
            return [];
          }
        })()
      : []),
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

