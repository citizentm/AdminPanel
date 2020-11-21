import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './assets/css/tailwind.css'

import { Heading } from '@/components/ui'

import router from './router'
import store from './store'

createApp(App)
  .use(store)
  .use(router)
  .component('Heading', Heading)
  .mount('#app')
