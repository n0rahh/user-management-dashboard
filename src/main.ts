import { createApp } from 'vue'

import App from './App.vue'
import './styles/global.scss'

import { mountToastContainer } from '@/composables/useToast'

mountToastContainer()

createApp(App).mount('#app')
