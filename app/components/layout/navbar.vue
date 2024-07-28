<template>
  <nav
    class="bg-white z-40 w-full py-2 drop-shadow-lg"
    :class="{
      '!static !text-black mb-10 !bg-white !drop-shadow-none': inline,
      '!bg-transparent text-white absolute': state === 'top',
      'fixed -translate-y-full': state === 'between-down',
      'fixed -translate-y-full transition-all duration-500': state === 'ready' || state === 'between-up',
      'fixed transition-all duration-500': state === 'visible',
    }"
  >
    <div class="container flex justify-between items-center">
      <nuxt-link to="/">
        <base-logo
          theme="light"
          class="h-16 md:h-20 xl:h-28"
          :class="{
            'opacity-0': state === 'top' && !inline,
          }"
        />
      </nuxt-link>
      <ul class="hidden lg:flex gap-4">
        <template
          v-for="item, index in items"
          :key="index"
        >
          <li class="md:text-sm lg:text-base">
            <nuxt-link :to="{ path: localePath('/'), hash: item.hash }">
              {{ $t(item.label) }}
            </nuxt-link>
          </li>
          <div
            v-if="index !== items.length - 1"
            class="h-7 w-0.5 bg-primary max-md:hidden"
          />
        </template>
      </ul>

      <button class="lg:hidden">
        <icon
          name="material-symbols:menu-rounded"
          size="32px"
          @click="open = !open"
        />
      </button>
    </div>

    <teleport to="body">
      <transition name="slide">
        <ul
          v-if="open"
          class="flex flex-col gap-8 bg-white fixed z-50 top-0 w-screen p-8 drop-shadow-lg"
        >
          <div class="absolute top-4 right-8">
            <button>
              <icon
                name="material-symbols:close-rounded"
                size="32px"
                @click="open = !open"
              />
            </button>
          </div>
          <template
            v-for="item, index in items"
            :key="index"
          >
            <li class="w-full">
              <nuxt-link
                :to="{ path: localePath('/'), hash: item.hash }"
                @click="open=false"
              >
                {{ $t(item.label) }}
              </nuxt-link>
            </li>
          </template>
        </ul>
      </transition>
    </teleport>
  </nav>
</template>

<script lang="ts" setup>
const state = ref<'top' | 'between-down' | 'between-up' | 'ready' | 'visible'>('top');

const open = ref(false);

const { y } = useWindowScroll();

const { inline } = useNavbar();

const localePath = useLocalePath();

watch(y, (value, oldValue) => {
  if (value < 100) {
    state.value = 'top';
  } else if (value < 300) {
    state.value = value > oldValue ? 'between-down' : 'between-up';
  } else if (oldValue > value) {
    state.value = 'visible';
  } else {
    state.value = 'ready';
  }
});

const items = [
  {
    label: 'navigation.index',
  },
  {
    hash: '#composers-guide',
    label: 'navigation.composers-guide',
  },
  {
    hash: '#workshops',
    label: 'navigation.workshops',
  },
  {
    hash: '#videos',
    label: 'navigation.videos',
  },
  {
    hash: '#biography',
    label: 'navigation.biography',
  },
  {
    hash: '#contact',
    label: 'navigation.contact',
  },
];
</script>
