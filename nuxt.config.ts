// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  components: [
    {
      path: '~/components',
      extensions: ['.vue'],
    }
  ],
  css: [
    '@/assets/css/app.css'
  ]

})
