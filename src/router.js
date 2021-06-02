import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Login from '@/views/BasicPages/Login'
import Register from '@/views/BasicPages/SignUp'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/impressum',
    name: 'Impressum',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/BasicPages/Impressum.vue')
  },
  {
    path: '/datenschutz',
    name: 'Datenschutz',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/BasicPages/Datenschutz.vue')
  },
  {
    path: "/admin",
    name: "admin",
    component: () =>
        import('@/views/BasicPages/Admin.vue')
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: Register
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to) {
    // if (savedPosition) {
    //   return savedPosition;
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            selector: to.hash,
            behavior: 'smooth',
          });
        }, 200);
      });
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/login', '/sign-up', '/home', '/impressum', '/datenschutz'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
