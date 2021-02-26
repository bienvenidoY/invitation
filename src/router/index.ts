import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('/@/views/home/index.vue')
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('/@/views/edit/index.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes,
})

export default router