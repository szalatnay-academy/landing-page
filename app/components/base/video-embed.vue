<template>
  <iframe
    :src="url"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  />
</template>

<script lang="ts" setup>
defineProps<{
  url: string
}>();
</script>
