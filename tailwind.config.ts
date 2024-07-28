import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      colors: {
        primary: '#E9B400',
        error: '#BD2125',
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
} satisfies Config;
