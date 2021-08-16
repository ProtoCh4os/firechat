import { store as storeWrapper } from 'quasar/wrappers';
import Vuex, { Store as VuexStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

import sessionModule from './session';

export const modules = {
  session: sessionModule,
};

export type StoreModules = typeof modules;

export default storeWrapper(({ Vue }) => {
  Vue.use(Vuex);

  const vuexLocal = new VuexPersistence<StoreModules>({
    storage: window.localStorage,
  });

  const storeInstance = new VuexStore<StoreModules>({
    modules,
    strict: !!process.env.DEBUGGING,
    plugins: [vuexLocal.plugin],
  });
  return storeInstance;
});
