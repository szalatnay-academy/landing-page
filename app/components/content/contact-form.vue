<template>
  <section
    id="contact"
    class="container"
  >
    <h2 class="col-span-full">
      <slot
        name="title"
        mdc-unwrap="p"
      />
    </h2>
    <form
      class="grid md:grid-cols-2 gap-10"
      @submit.prevent="submit"
    >
      <base-form-control
        id="firstname"
        label="forms.labels.firstname"
        required
        class="col-span-1"
        :errors="v$.firstName.$errors"
      >
        <input
          id="firstname"
          v-model="form.firstName"
          autocomplete="off"
          type="text"
          :disabled="formState !== 'ready' || error !== undefined"
          @focus="activateCaptcha = true"
        >
      </base-form-control>

      <base-form-control
        id="lastname"
        label="forms.labels.lastname"
        required
        class="col-span-1"
        :errors="v$.lastName.$errors"
      >
        <input
          id="lastname"
          v-model="form.lastName"
          autocomplete="off"
          type="text"
          :disabled="formState !== 'ready' || error !== undefined"
          @focus="activateCaptcha = true"
        >
      </base-form-control>

      <base-form-control
        id="email"
        label="forms.labels.email"
        required
        class="col-span-1 md:col-span-2"
        :errors="v$.email.$errors"
      >
        <input
          id="email"
          v-model="form.email"
          autocomplete="off"
          type="email"
          :disabled="formState !== 'ready' || error !== undefined"
          @focus="activateCaptcha = true"
        >
      </base-form-control>

      <base-form-control
        id="message"
        label="forms.labels.message"
        required
        class="col-span-1 md:col-span-2"
        :errors="v$.message.$errors"
      >
        <textarea
          id="message"
          v-model="form.message"
          autocomplete="off"
          :disabled="formState !== 'ready' || error !== undefined"
          @focus="activateCaptcha = true"
        />
      </base-form-control>

      <nuxt-turnstile
        v-if="activateCaptcha"
        v-model="form.token"
        class="hidden"
        :options="{
          'error-callback': onCaptchaError
        }"
      />

      <div class="space-y-5">
        <base-button
          class="max-w-fit min-w-[150px]"
          type="submit"
          :loading="formState === 'sending'"
          :disabled="formState !== 'ready' || error"
        >
          <template v-if="formState === 'ready'">
            {{ $t('contact.send') }}
          </template>
          <template v-else>
            <i class="icon-sent" />
            {{ $t('contact.sent') }}
          </template>
        </base-button>

        <p v-if="error" class="text-error">
          {{ $t(error) }}
        </p>
      </div>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import {
  required, email, minLength, maxLength, helpers,
} from '@vuelidate/validators';

const props = defineProps<{
  type: 'contact' | 'workshop'
}>();

const { t } = useI18n();

const formState = ref<'ready' | 'sending' | 'sent'>('ready');
const error = ref<string>();
const activateCaptcha = ref(false);

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  message: '',
  token: '',
});

const rules = {
  firstName: {
    required: helpers.withMessage(t('forms.validation.required.firstname'), required),
    minLength: helpers.withMessage(t('forms.validation.min-length.firstname', { characters: 1 }), minLength(1)),
    maxLength: helpers.withMessage(t('forms.validation.max-length.firstname', { characters: 100 }), maxLength(100)),
  },
  lastName: {
    required: helpers.withMessage(t('forms.validation.required.lastname'), required),
    minLength: helpers.withMessage(t('forms.validation.min-length.lastname', { characters: 1 }), minLength(1)),
    maxLength: helpers.withMessage(t('forms.validation.max-length.lastname', { characters: 100 }), maxLength(100)),
  },
  email: {
    required: helpers.withMessage(t('forms.validation.required.email'), required),
    email: helpers.withMessage(t('forms.validation.email'), email),
  },
  message: {
    required: helpers.withMessage(t('forms.validation.required.message'), required),
    minLength: helpers.withMessage(t('forms.validation.min-length.message', { characters: 5 }), minLength(5)),
    maxLength: helpers.withMessage(t('forms.validation.max-length.message', { characters: 2000 }), maxLength(2000)),
  },
};

const v$ = useVuelidate(rules, form);

const onCaptchaError = () => {
  error.value = 'forms.error.captcha';
};

const submit = async () => {
  formState.value = 'sending';

  if (!await v$.value.$validate()) {
    formState.value = 'ready';
    return;
  }

  try {
    await $fetch('/api/contact', { method: 'POST',
      body: {
        type: props.type,
        ...form,
      } });
    formState.value = 'sent';
    return;
  } catch (e) {
    console.log('Error while submitting feedback', e);
    error.value = 'forms.error.generic'
  }
  formState.value = 'ready';
};
</script>
