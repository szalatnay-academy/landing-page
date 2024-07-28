<!-- eslint-disable vue/component-name-in-template-casing -->
<!-- Necessary for the component html, body and head to work -->
<template>
  <Html
    :lang="head.htmlAttrs?.lang"
    :dir="head.htmlAttrs?.dir"
  >
    <Head>
      <template
        v-for="link in head.link"
        :key="link.id"
      >
        <Link
          :id="link.id"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
      </template>
      <template
        v-for="meta in head.meta"
        :key="meta.id"
      >
        <Meta
          :id="meta.id"
          :property="meta.property"
          :content="meta.content"
        />
      </template>
    </Head>
    <Body>
      <nuxt-layout>
        <nuxt-page />
      </nuxt-layout>
    </Body>
  </Html>
</template>

<script lang="ts" setup>
const head = useLocaleHead();
</script>
