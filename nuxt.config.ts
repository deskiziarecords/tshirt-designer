// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/devtools',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon'
  ],
  plugins: [
    //
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
