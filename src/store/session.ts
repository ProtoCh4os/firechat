import {
  Module,
  VuexModule,
  Mutation,
  getModule,
} from 'vuex-module-decorators';
import firebase from 'firebase';
import { Store } from 'vuex';

export type UserData = {
  uid: string;
  name: string;
  image: string | null;
};

@Module({
  name: 'session',
  namespaced: true,
})
export default class SessionModule extends VuexModule {
  user: UserData | null = null;

  @Mutation
  login(user: firebase.User) {
    this.user = {
      name: user.displayName ?? '',
      uid: user.uid,
      image: user.photoURL,
    };
  }

  @Mutation
  logout() {
    this.user = null;
  }
}

export const sessionStore = (store: Store<any>) =>
  getModule(SessionModule, store);
