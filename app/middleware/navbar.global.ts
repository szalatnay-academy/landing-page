export default defineNuxtRouteMiddleware(to => {
  const { inline } = useNavbar();

  inline.value = useRouteBaseName()(to) !== 'index';
});
