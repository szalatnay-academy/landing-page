<template>
  <nuxt-link
    class="
      bg-gray-200
      rounded-xl
      shadow-sm
      flex
      justify-between
      gap-5
      hover:shadow-md
      duration-500
      cursor-pointer"
    :to="localePath({path: 'workshops', hash: `#${workshopId}`})"
  >
    <div class="w-11/12 p-6">
      <slot />
    </div>

    <div class="w-1/12 flex justify-end items-center pr-3">
      <icon
        name="material-symbols:chevron-left-rounded"
        size="48px"
        class="rotate-180 text-gray-400"
      />
    </div>
  </nuxt-link>
</template>
<script lang="ts" setup>
defineProps<{
  workshopId: string
}>();

const localePath = useLocalePath();
</script>
