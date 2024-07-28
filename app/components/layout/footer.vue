<template>
  <footer class="w-full py-16 bg-black border-b-4 border-b-primary">
    <div class="container flex items-center justify-between flex-col md:flex-row">
      <nuxt-link to="/">
        <base-logo class="h-20 md:h-32" />
      </nuxt-link>

      <div class="text-white flex flex-col items-center justify-center md:items-end gap-6 pt-10 md:pt-0 md:pr-6 md:border-r-primary md:border-r-4">
        <nuxt-link :to="localePath('imprint')">
          {{ $t('navigation.imprint') }}
        </nuxt-link>
        <nuxt-link :to="localePath('privacy-policy')">
          {{ $t('navigation.privacy-policy') }}
        </nuxt-link>
        <p>© szalatnay.academy {{ new Date().getFullYear() }}</p>
      </div>
    </div>
  </footer>
</template>
<script lang="ts" setup>
const localePath = useLocalePath();
</script>
