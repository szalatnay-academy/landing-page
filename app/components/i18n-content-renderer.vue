<template>
  <content-renderer
    v-if="data"
    :value="data"
    tag="main"
  />
</template>
<script lang="ts" setup>
const props = withDefaults(defineProps<{
  path?: string
}>(), {
  path: '',
});

const siteConfig = useSiteConfig();
const { locale } = useI18n();
const route = useRoute();

const localizedPath = computed(() => `/${locale.value}/${props.path}`);
const key = computed(() => `${locale.value}-${props.path}`);

const { data } = await useAsyncData(key, () => queryCollection('content').path(localizedPath.value).first());

useSeoMeta({
  title: data.value?.title,
  ogTitle: data.value?.title,
  twitterTitle: data.value?.title,
  description: data.value?.description,
  ogDescription: data.value?.description,
  twitterDescription: data.value?.description,
  twitterCard: 'summary_large_image',
  ogType: 'website',
  ogSiteName: 'szalatnay.academy',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  ogUrl: `${siteConfig.url}${route.fullPath}`,
  ogImageAlt: data.value?.description,
});

defineOgImageComponent('MainOgImage', {
  title: data.value?.title,
});
</script>
