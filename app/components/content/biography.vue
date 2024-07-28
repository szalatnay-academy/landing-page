<template>
  <section class="container">
    <h2 id="biography">
      <slot name="title" mdc-unwrap="p" />
    </h2>

    <div>
      <slot mdc-unwrap="p" />
    </div>
  </section>
</template>

