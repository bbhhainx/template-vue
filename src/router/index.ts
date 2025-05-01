// src/router/index.ts
import type { App } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Cấu hình các route
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue') // Lazy load
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


/** Hàm load router */ 
export async function loadRouter(APP: App<Element>) {
  // sử dụng router trong app
  APP.use(router)
}
