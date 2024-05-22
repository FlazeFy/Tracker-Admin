import { createRouter, createWebHistory } from 'vue-router'
import MapView from '../views/MapView.vue'
import ManageView from '../views/ManageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/map',
      name: 'map',
      component: MapView
    },
    {
      path: '/manage',
      name: 'manage',
      component: ManageView
    },
  ]
})

export default router
