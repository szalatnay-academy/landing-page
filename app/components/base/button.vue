<template>
  <component
    :is="element"
    class="
      bg-primary
      py-2.5
      px-4
      rounded-lg
      text-white
    "
    :to="to"
    :target="target"
  >
    <slot />
  </component>
</template>
<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router';
import { NuxtLinkLocale } from '#components';

const props = defineProps<{
  to?: RouteLocationRaw
  target?: '_blank'
}>();

const element = computed(() => (props.to ? NuxtLinkLocale : 'button'));
</script>
