import eslintPlugin from '@elia-schenker/eslint-plugin';
import withNuxt from '.nuxt/eslint.config.mjs';

export default withNuxt(...eslintPlugin.configs['flat/base']);
