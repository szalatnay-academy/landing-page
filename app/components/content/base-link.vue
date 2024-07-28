<template>
  <nuxt-link-locale
    :to="route"
    class="text-primary"
    :class="{
      'text-black underline': dark
    }"
    :target="target ? '_blank' : '_self'"
  >
    <slot mdc-unwrap="p" />
  </nuxt-link-locale>
</template>
<script lang="ts" setup>
import type { RouteLocationRaw } from '#vue-router';

const props = defineProps<{
  to: RouteLocationRaw
  hash?: string
  target?: boolean
  dark?: boolean
}>();

const route = computed<RouteLocationRaw>(() => {
  if (props.hash) {
    return { path: '/', hash: props.hash };
  }

  return props.to;
});
</script>
