import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import { loadEnv } from '@/env'
import { loadI18n } from '@/lang/loader'
import { loadRouter } from '@/router'

/** tạo app */
const APP = createApp(App)

/** hàm load các dữ liệu cần thiết */
async function load(){
  // load biến môi trường
  await loadEnv()

  // load ngôn ngữ
  await loadI18n(APP)

  // load router
  await loadRouter(APP)

  // mount app vào DOM
  APP.mount('#app')
}

// tải hàmg
load()

