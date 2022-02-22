import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/home.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router