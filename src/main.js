import { createApp } from 'vue'
import App from './App.vue' 
import router from './router'
import store from './store'
import '@/assets/index.css'
import useMessage from './components/base/message/message'
createApp(App)
.use(store)
.use(router)
.use(useMessage)
.mount('#app')

