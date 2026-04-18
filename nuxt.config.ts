// https://nuxt.com/docs/api/configuration/nuxt-config
import IconsResolver from "unplugin-icons/resolver";
import ViteComponents from "unplugin-vue-components/vite";
import typescript from "@rollup/plugin-typescript";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,
  app: {},
  runtimeConfig: {},
  appConfig: {},
  build: {
    transpile: [],
  },
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
      hashMode: true,
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