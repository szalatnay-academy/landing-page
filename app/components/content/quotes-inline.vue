<template>
    <template v-for="quote, index in quotes" :key="index">
      «<i>{{ quote.quote }}»</i> - {{ quote.person }}
      <br><br>
    </template>
</template>

<script lang="ts" setup>
const quotes = useQuotes();
</script>
