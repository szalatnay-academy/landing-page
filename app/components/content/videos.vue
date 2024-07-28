<template>
  <section class="container">
    <h2 id="videos">
      {{ $t('navigation.videos') }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-20">
      <base-video-embed
        v-for="video, index in videos" :key="index" :url="video.url"
        class="w-full h-[330px] md:h-[200px] xl:h-[250px]"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
const videos = computed(() => [
  {
    url: 'https://www.youtube-nocookie.com/embed/cfsM5Yu0JL0',
  },
  {
    url: 'https://www.youtube-nocookie.com/embed/gETxNGKJJM0',
  },
  {
    url: 'https://www.youtube-nocookie.com/embed/_01KzA6R94I',
  },
]);
</script>
