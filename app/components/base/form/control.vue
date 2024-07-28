<template>
  <div
    class="control-element relative flex flex-col gap-2"
    :class="{
      'error': errors.length
    }"
  >
    <label :for="id">
      {{ $t(label) }}
    </label>

    <slot />

    <p
      v-if="errors && errors.length > 0"
      class="text-error absolute -bottom-7"
    >
      {{ errors[0].$message }}
    </p>
  </div>
</template>
<script lang="ts" setup>
import type { ErrorObject } from '@vuelidate/core';

defineProps<{
  id: string
  label: string
  errors: ErrorObject[]
}>();
</script>
