import { createApp } from 'vue'
import './styles/index.less'
import App from './App'
import router from './router'

createApp(App).use(router).mount('#app')
