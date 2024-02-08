// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      viewport: 'width=device-width, height=device-height, initial-scale=1, maximum-scale=1',
      charset: 'utf-8',
      meta: [
        { name: 'viewport', content: 'width=device-width' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  css: ['@/assets/styles/destyle.css', '@/assets/styles/common.css'],
  runtimeConfig: {
    public: {
      liffId: '',
      channelSecret: '',
      redirectUri: '',
    }
  },
  alias: {
    "*": "types/*",
  },
})
