import { getJWT } from '@/hooks/useJWT'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: 'default' },
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('../views/Reports.vue'),
    meta: { layout: 'default' },
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/Projects.vue'),
    meta: { layout: 'default' },
  },
  {
    path: '/projects/create',
    name: 'ProjectsCreate',
    component: () => import('../views/ProjectsCreate.vue'),
    meta: { layout: 'default' },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: { layout: 'plain', public: true },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (!getJWT() && !to.meta.public) {
    return next('/auth')
  }
  next()
})

export default router
