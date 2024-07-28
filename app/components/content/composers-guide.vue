<template>
  <section id="composers-guide" class="container space-y-10">
    <div class="flex max-md:flex-col gap-10">
      <img
        src="/young-composers-guide.png"
        alt="Young Composer's Guide to the Piano Score"
        class="max-md:mx-auto max-md:w-3/5 md:h-96 drop-shadow-lg"
      >
      <div>
        <h2>
          <slot
            name="title"
            mdc-unwrap="p"
          />
        </h2>

        <div class="flex flex-col gap-5">
          <slot />
          <div class="flex gap-2">
            <base-button :to="{path: '/', hash: '#contact'}" class="w-min">
              {{ $t('composers-guide.order') }}
            </base-button>
            <base-button to="/pdfs/young-composers-guide-to-the-piano-score-examples-and-ideas-copyright.pdf" target="_blank" class="w-min">
              {{ $t('composers-guide.example') }}
            </base-button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex max-md:flex-col gap-10 justify-center">
      <base-video-embed url="https://www.youtube-nocookie.com/embed/plnMAP-DNSk" class="video" />
      <base-video-embed url="https://www.youtube-nocookie.com/embed/vdcajQwJwy8" class="video" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.video {
  @apply w-full h-[350px] md:h-[270px] xl:h-[360px];
}
</style>
