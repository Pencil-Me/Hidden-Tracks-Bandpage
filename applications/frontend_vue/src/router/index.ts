import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ImpressumView from '@/views/ImpressumView.vue';
import DatenschutzView from '@/views/DatenschutzView.vue';

// Route Configuration
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/impressum',
    name: 'impressum',
    component: ImpressumView
  },
  {
    path: '/datenschutz',
    name: 'datenschutz',
    component: DatenschutzView
  }
];

// Create Router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Restore scroll position
    if (savedPosition) return savedPosition;

    // Scroll to hash
    if (to.hash) return { el: to.hash, behavior: 'smooth' };

    // Scroll to top
    window.scrollTo(0, 0);
    return {};
  }
});

export default router;
