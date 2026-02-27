// https://nuxt.com/docs/api/configuration/nuxt-config
import IconsResolver from "unplugin-icons/resolver";
import ViteComponents from "unplugin-vue-components/vite";

const host = process.env.TAURI_DEV_HOST || "localhost";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,
  // 使开发服务器能够被其他设备发现，以便在 iOS 物理机运行。
  devServer: { host },
  app: {
    // baseURL: ".",
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
    // 为 Tauri 命令输出提供更好的支持
    clearScreen: false,
    // 启用环境变量
    // 其他环境变量可以在如下网页中获知：
    // https://v2.tauri.app/reference/environment-variables/
    envPrefix: ["VITE_", "TAURI_"],
    server: {
      // Tauri需要一个确定的端口
      strictPort: true,
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