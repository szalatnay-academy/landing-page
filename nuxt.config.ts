// https://nuxt.com/docs/guide/directory-structure/nuxt.config#nuxt-config-file
export default defineNuxtConfig({
  compatibilityDate: '2024-07-28',
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96',
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      meta: [
        { name: 'apple-mobile-web-app-title', content: 'szalatnay.academy' },
      ],
    },
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxt/icon',
    'nuxt-og-image',
    'nuxt-swiper',
    '@nuxtjs/turnstile',
    '@nuxt/scripts',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],
  css: [
    '~/assets/scss/main.scss',
    '~/assets/fonts/plus-jakarta-sans/stylesheet.css',
  ],
  icon: {
    serverBundle: {
      collections: ['material-symbols'],
    },
  },
  scripts: {
    registry: {
      matomoAnalytics: {
        disableCookies: true,
      },
    },
  },
  runtimeConfig: {
    public: {
      scripts: {
        matomoAnalytics: {
          matomoUrl: '',
          siteId: 0,
        },
      },
    },
    contact: {
      email: '',
      token: '',
      url: ''
    }
  },
  site: {
    name: 'szalatnay.academy',
  },
  sitemap: {
    defaults: {
      priority: 1,
      changefreq: 'daily',
    },
  },
  i18n: {
    locales: [
      {
        code: 'de',
        file: 'de.json',
        language: 'de-CH',
        name: 'German',
      },
    ],
    strategy: 'prefix_except_default',
    defaultLocale: 'de',
    customRoutes: 'config',
    pages: {
      // routes for / and /workshops shouldn't be necessarily added here
      // but otherwise they don't show up in the sitemap
      '/': {
        de: '/',
      },
      '/workshops': {
        de: '/workshops',
      },
      '/workshop-archive': {
        de: '/workshop-archive',
      },
      imprint: {
        de: '/impressum',
      },
      'privacy-policy': {
        de: '/datenschutzerklaerung',
      },
    },
  },
  ogImage: {
    fonts: [
      'Plus+Jakarta+Sans:500',
    ],
  },
  routeRules: {
    // Sub-pages have less priority than /
    '/**': { sitemap: { priority: 0.9, changefreq: 'weekly' } },
    '/datenschutzerklaerung': { sitemap: { priority: 0.4, changefreq: 'monthly' } },
    '/impressum': { sitemap: { priority: 0.4, changefreq: 'monthly' } },
    '/': { sitemap: { priority: 1, changefreq: 'weekly' } },
  },
  content: {
    experimental: { sqliteConnector: 'native' },
  },
});