import { RouteConfig } from 'vue-router';
import chat from 'pages/app/Chat.vue';
import friends from 'pages/app/Friends.vue';
import settings from 'pages/app/Settings.vue';
import home from 'pages/app/Index.vue';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('src/pages/Index.vue'),
    meta: {
      public: true,
    },
  },
  {
    path: '/login',
    component: () => import('src/pages/Login.vue'),
    meta: {
      public: true,
    },
  },
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'chat', component: chat },
      { path: 'friends', component: friends },
      { path: 'settings', component: settings },
      { path: '', component: home },
    ],
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
    meta: {
      global: true,
    },
  },
];

export default routes;
