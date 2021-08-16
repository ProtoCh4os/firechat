import { route } from 'quasar/wrappers';
import VueRouter from 'vue-router';
import { Store } from 'vuex';
import routes from './routes';

export default route<Store<any>>(({ Vue, store }) => {
  Vue.use(VueRouter);

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  Router.beforeEach((to, _from, next) => {
    const inLoggedPath = !to.meta?.public && !to.meta?.global;
    const isLogged = !!store.state.session?.user;

    // console.log({ inLoggedPath, isLogged, to });

    if (inLoggedPath && !isLogged) {
      return next('/login');
    }

    if (!inLoggedPath && isLogged) {
      return next('/app');
    }

    return next();
  });

  return Router;
});
