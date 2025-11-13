import { createRouter, createWebHistory } from 'vue-router'
import { routes as administrator } from './administrator'
const routes = [
  {
    path: '/',
    name: 'HomePublic',
    component: () => import(/* webpackChunkName: "chunk-HomePublic" */ '@/views/HomePublic.vue')
  },
  ...administrator
  // ❌ Ruta 404 (fallback)
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'notfound',
  //   component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFoundView.vue')
  // }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
