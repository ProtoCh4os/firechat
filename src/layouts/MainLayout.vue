<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="fas fa-bars"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Firechat
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen">
      <q-list class="items">
        <q-item
          v-for="{ title, icon, caption, link } in essentialLinks"
          :key="title"
          clickable
          @click="goToLink(link)"
        >
          <q-item-section v-if="icon" avatar class="relative-position">
            <q-icon :name="icon" class="absolute-center" />
          </q-item-section>

          <q-item-section class="relative-position">
            <div style="vertical-align: center">
              <q-item-label>{{ title }}</q-item-label>
              <q-item-label caption v-if="caption">
                {{ caption }}
              </q-item-label>
            </div>
          </q-item-section>
        </q-item>
        <q-item class="sign-out" clickable @click="logout">
          <q-item-section avatar class="relative-position">
            <q-icon name="fas fa-sign-out-alt" class="absolute-center" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Sign out</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue';
import { sessionStore } from 'src/store/session';
import { auth } from 'boot/vuefire';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: { EssentialLink },
})
export default class MainLayout extends Vue {
  leftDrawerOpen = false;

  essentialLinks = [
    {
      title: 'Home',
      caption: 'Home dashboard',
      icon: 'fas fa-home',
      link: '/app',
    },
    {
      title: 'Chats',
      caption: 'Talk and listen',
      icon: 'fas fa-comment',
      link: '/app/chat',
    },
    {
      title: 'Friends',
      caption: 'See your friends',
      icon: 'fas fa-users',
      link: '/app/friends',
    },
    {
      title: 'Settings',
      caption: 'Change your config',
      icon: 'fas fa-wrench',
      link: '/app/settings',
    },
  ];

  logout() {
    sessionStore(this.$store).logout();
    auth.signOut();
    this.$router.replace('/login');
  }

  goToLink(link: string) {
    this.$router.push(link);
    this.leftDrawerOpen = false;
  }
}
</script>

<style lang="scss" scoped>
.items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;

  .sign-out {
    margin-top: auto;
    margin-bottom: 10px;
  }
}
</style>
