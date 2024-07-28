<template>
  <section class="container">
    <h2 class="mb-10">
      <slot name="title" mdc-unwrap="p"/>
    </h2>
    <client-only>
      <swiper-container
        :slides-per-view="1"
        :breakpoints="breakpoints"
        :autoplay="{delay: 5000, disableOnInteraction: true}"
        :space-between="48" :pagination="true">
        <swiper-slide v-for="quote, index in quotes" :key="index">
          <div class="flex items-start gap-5">
            <img src="/icons/quote.svg" aria-hidden="true" class="w-8">
            <div>
              <i>«{{ quote.quote }}»</i>
              <br><br>
                - {{ quote.person }}
            </div>
          </div>
        </swiper-slide>
      </swiper-container>
    </client-only>
  </section>
</template>
<script lang="ts" setup>
const quotes = useQuotes();

const breakpoints = {
  750: {
    slidesPerView: 2,
  },
  1200: {
    slidesPerView: 3,
  },
};
</script>

<style lang="scss" scoped>
.swiper-pagination-active {
  @apply bg-primary;
}

swiper-container::part(bullet-active) {
  @apply bg-primary opacity-100;
}
</style>
