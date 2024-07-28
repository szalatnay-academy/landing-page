<template>
  <nuxt-layout>
    <main class="flex justify-center items-center">
      <h2>
        {{ $t('not-found.title') }}
      </h2>
    </main>
  </nuxt-layout>
</template>

<script lang="ts" setup>
const title = $t('not-found.title');

useSeoMeta({
  title,
  ogTitle: title,
});
</script>