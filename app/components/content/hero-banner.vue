<template>
  <div class="relative bg-black">
    <div class="xl:container">
      <video
        ref="video"
        controls
        class="w-screen min-h-[500px] bg-black"
      >
        <source
          src="/videos/intro.mp4"
          type="video/mp4"
        >
      </video>
    </div>
    <transition name="fade">
      <div
        v-if="!isVideoShown"

        class="
          bg-black/50
          backdrop-blur-lg
          absolute
          top-0
          size-full

          z-10

          flex
          items-center
        "
      >
        <div class="space-y-6 container">
          <base-logo class="w-60 md:w-96" />

          <div>
            <h2 class="text-white text-2xl">
              {{ $t('hero-banner.title') }}
            </h2>

            <p class="text-white text-lg w-4/5 w-md:2/5 mb-2">
              <slot mdc-unwrap="p" />
            </p>
          </div>

          <base-button @click="showVideo">
            {{ $t('hero-banner.watch-video') }}
          </base-button>
        </div>
      </div>
    </transition>

    <div
      v-if="!isVideoShown"
      class="absolute w-full bottom-0 z-20 text-white flex justify-center pb-4"
    >
      <div class="space-y-3">
        <p>{{ $t('hero-banner.learn-more') }}</p>

        <img
          src="/icons/chevron.svg"
          class="mx-auto animate-bounce"
        >
      </div>
    </div>
  </div>
  <!-- TODO vue transition, plus actually center on mobile -->
  <a
    class="
      fixed
      bottom-6
      right-16
      md:right-4
      bg-black
      py-4
      px-5
      rounded-full
      text-white
      z-10
      transition-all
      duration-300
      flex
      gap-2"
    :class="{
      'translate-x-80': y > 300 || !showTranscriptionLink,
    }"
    href="/pdfs/butzemann-transkription.pdf"
    target="_blank"
  >
    <icon name="material-symbols:note" />
    <p>{{ $t('hero-banner.transcription') }}</p>
  </a>
</template>

<script lang="ts" setup>
const isVideoShown = ref(false);

const video = ref<HTMLVideoElement | undefined>(undefined);
const { playing, currentTime } = useMediaControls(video);

const { y } = useWindowScroll();

const showVideo = () => {
  isVideoShown.value = true;
  playing.value = true;
};

const showTranscriptionLink = computed(() => {
  if (video.value) {
    return currentTime.value >= 120;
  }
  return false;
});

onMounted(() => {
  if (import.meta.client) {
    const ua = globalThis.navigator.userAgent;
    const iOS = !!/ipad/i.test(ua) || !!/iphone/i.test(ua);
    const webkit = !!/webkit/i.test(ua);
    const iOSSafari = iOS && webkit && !/crios/i.test(ua);

    // Setting the video time on Safari for iOS results in strange behaviour
    // where the user can't control the video anymore
    if (!iOSSafari) {
      currentTime.value = 4.3;
    }
  }
});
</script>
