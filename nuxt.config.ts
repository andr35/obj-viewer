// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  ssr: false,

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("a-"),
    },
  },

  ui: {
    icons: ["bi"],
  },
});
