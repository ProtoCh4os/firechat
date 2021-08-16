/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { firestorePlugin } from 'vuefire';
import { boot } from 'quasar/wrappers';

export default boot(({ Vue }) => {
  Vue.use(firestorePlugin);
});

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyAb4rfcwUJfnSr5rRvLxQIA6yoVEozmOiw',
  authDomain: 'firechat-45265.firebaseapp.com',
  projectId: 'firechat-45265',
  storageBucket: 'firechat-45265.appspot.com',
  messagingSenderId: '767930599078',
  appId: '1:767930599078:web:ac38b33dcdef5839db5667',
  measurementId: 'G-T7LMCY8B48',
};

const fireApp = firebase.initializeApp(config);

const [auth, firestore, storage, googleAuthProvider] = [
  fireApp.auth(),
  fireApp.firestore(),
  fireApp.storage(),
  new firebase.auth.GoogleAuthProvider(),
];

export { auth, firestore, storage, googleAuthProvider };
