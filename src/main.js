import './assets/main.css'
import route from "./route"
import { createApp } from 'vue'
import App from './App.vue'

const app =createApp(App)
app.use(route)
app.mount('#app')
