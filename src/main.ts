import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import { loadEnv } from '@/utils/app'

/** tạo app */
const APP = createApp(App)

/** hàm load các dữ liệu cần thiết */
async function load(){
  // load biến môi trường
  await loadEnv()

  // mount app vào DOM
  APP.mount('#app')
}

// tải hàmg
load()

