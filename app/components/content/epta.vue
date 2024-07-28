<template>
  <section class="bg-black border-y-4 border-primary py-10 text-white">
    <div class="container flex justify-between max-md:flex-col gap-10">
      <div class="flex flex-col">
        <h2>
          <slot name="title" mdc-unwrap="p" />
        </h2>

        <p class="mb-4 md:max-w-[50%]">
          <slot name="description" mdc-unwrap="p" />
        </p>

        <base-button to="https://epta.ch/de/veranstaltungen/aktuelle-veranstaltung" target="_blank" class="w-max">
          {{ $t("epta.action") }}
        </base-button>
      </div>

      <img src="/epta-flyer.jpg" alt="EPTA Flyer" class="w-[250px]">
    </div>
  </section>
</template>
