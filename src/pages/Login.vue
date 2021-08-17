<template>
  <div class="background">
    <q-card
      class="fixed-center q-pa-md text-center"
      style="width: clamp(200px,50%,700px)"
    >
      <h3 style="font-family: 'Fira Sans'">Firechat</h3>
      <br />
      <ValidationObserver v-slot="{ handleSubmit }">
        <q-form @submit.prevent="handleSubmit(authManual)">
          <ValidationProvider
            name="Email"
            rules="required|email"
            v-slot="{ errors }"
          >
            <q-input
              name="email"
              class="block"
              label="Email"
              v-model.trim="email"
              id="email"
              :error="!!errors.length"
              :error-message="errors[0]"
            ></q-input>
          </ValidationProvider>
          <ValidationProvider
            name="Password"
            rules="required|min:6"
            v-slot="{ errors }"
          >
            <q-input
              name="Password"
              type="password"
              class="block"
              label="Password"
              v-model.trim="password"
              id="password"
              :error="!!errors.length"
              :error-message="errors[0]"
            ></q-input>
          </ValidationProvider>
          <span v-if="errorMessage">{{ errorMessage }}</span>
          <br />
          <div class="row no-wrap justify-evenly">
            <q-btn :loading="loading" @click="signup" color="primary"
              >Sign up</q-btn
            >
            <q-btn :loading="loading" type="submit" color="positive"
              >Log in</q-btn
            >
          </div>
        </q-form>
      </ValidationObserver>
      <hr />
      <q-btn class="google" @click="authWithGoogle">
        <q-icon name="fab fa-google" />
        Sign in with Google</q-btn
      >
    </q-card>
    <q-dialog v-model="signUpOpen" no-esc-dismiss persistent>
      <SignUp />
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { auth, googleAuthProvider } from 'boot/vuefire';
import { sessionStore as session } from 'src/store/session';
import firebase from 'firebase';
import SignUp from 'src/components/Signup.vue';
import { isFirebaseAuthError } from 'src/utils/firebase';

@Component({
  components: { ValidationProvider, ValidationObserver, SignUp },
})
export default class App extends Vue {
  email = '';

  password = '';

  loading = false;

  errorMessage = '';

  signUpOpen = false;

  mounted() {
    auth.onAuthStateChanged((user) => user && this.login(user));
  }

  reset() {
    this.email = '';
    this.password = '';
  }

  login(user: firebase.User) {
    session(this.$store).login(user);
    this.$router.replace('/app');
    this.loading = false;
  }

  authManual() {
    this.loading = true;
    this.errorMessage = '';

    auth.signInWithEmailAndPassword(this.email, this.password).catch((er) => {
      if (isFirebaseAuthError(er)) {
        switch (er.code) {
          case 'auth/too-many-requests':
            this.errorMessage =
              'This account was temporarily blocked due to many attempts to login';
            break;

          case 'auth/wrong-password':
            this.errorMessage = 'Incorrect/invalid password or email';
            break;

          case 'auth/user-not-found':
            this.errorMessage = 'Incorrect/invalid password or email';
            break;

          default:
            this.errorMessage = er.message;
        }
      }
      this.errorMessage = er.message;
      this.loading = false;
    });
  }

  signup() {
    this.signUpOpen = true;
  }

  authWithGoogle() {
    auth.signInWithPopup(googleAuthProvider);
  }
}
</script>

<style lang="scss" scoped>
.background {
  height: 100%;
  width: 100%;
  background: url('/sky.jpg');
  background-repeat: cover;
  position: absolute;
}
.google {
  background: #fff;
  color: #000;
  .fa-google {
    margin-right: 5px;
    background: conic-gradient(
        from -45deg,
        #ea4335 110deg,
        #4285f4 90deg 180deg,
        #34a853 180deg 270deg,
        #fbbc05 270deg
      )
      73% 55%/150% 150% no-repeat;
    background-clip: text;
    color: transparent;
  }
}
</style>
