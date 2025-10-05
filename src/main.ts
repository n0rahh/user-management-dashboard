import { createApp } from 'vue'

import { mountToastContainer } from '@/composables/useToast'

import App from './App.vue'
import './styles/global.scss'

mountToastContainer()

createApp(App).mount('#app')
