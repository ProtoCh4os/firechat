<template>
  <div>
    <q-card class="fixed-center q-pa-xl text-center form">
      <ValidationObserver v-slot="{ handleSubmit }">
        <q-form @submit.prevent="handleSubmit(submit)">
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
          <br />
          <div class="flex flex-center" style="gap: 10px">
            <q-btn
              :loading="loading"
              @click="close"
              color="secondary mr-md"
              v-close-popup
            >
              Cancel</q-btn
            >
            <q-btn :loading="loading" type="submit" color="primary"
              >Sign up</q-btn
            >
          </div>
        </q-form>
      </ValidationObserver>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { auth } from 'src/boot/vuefire';

@Component({
  components: { ValidationProvider, ValidationObserver },
})
export default class Signup extends Vue {
  open = true;

  loading = false;

  email = '';

  password = '';

  @Emit()
  logged() {
    this.loading = false;
  }

  close() {
    (this.$refs.dialog as any)?.hide();
  }

  show() {
    (this.$refs.dialog as any)?.hide();
  }

  submit() {
    this.loading = true;
    auth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.logged();
      })
      .catch((er) => {
        this.$q.dialog({
          title: 'Error',
          message: er.message,
        });
      })
      .finally(() => this.close());
  }
}
</script>
