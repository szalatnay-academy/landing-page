<template>
  <section class="container">
    <h2 id="workshops">
      <slot
        name="title"
        mdc-unwrap="p"
      />
    </h2>

    <p class="mb-6">
      <slot
        name="description"
        mdc-unwrap="p"
      />
    </p>

    <div class="flex flex-col gap-6 mb-6">
      <slot
        name="items"
        mdc-unwrap="p"
      />
    </div>

    <base-button :to="{name: 'workshops', hash: '#contact'}">
      {{ $t('workshops.sign-up') }}
    </base-button>
  </section>
</template>
