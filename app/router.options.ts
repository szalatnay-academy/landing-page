
import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig>{
  async scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    const findEl = async (hash: string, x = 0) => {
      return (
        document.querySelector(hash)
        || new Promise(resolve => {
          if (x > 50) {
            return resolve(document.querySelector('#app'));
          }
          setTimeout(() => {
            resolve(findEl(hash, ++x || 1));
          }, 100);
        })
      );
    };

    if (to.hash) {
      const el = await findEl(to.hash);

      // For page switches we start the scroll animation from the top
      if (to.path !== from.path) {
        window.scrollTo({ left: 0, top: 0 });
      }

      // eslint-disable-next-line unicorn/prefer-ternary
      if ('scrollBehavior' in document.documentElement.style) {
        return window.scrollTo({ left: 0, top: el.offsetTop - 50, behavior: 'smooth' });
      } else {
        return window.scrollTo({ left: 0, top: el.offsetTop });
      }
    }

    return { left: 0, top: 0 };
  },
};
