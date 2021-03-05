import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './sdk/flexible'
import './styles/index.scss'
import 'animate.css'
import 'swiper/swiper.scss'

import VueTouch from '/@/directives/touch/index.js'

const app = createApp(App)
app.use(VueTouch)
app.use(router)
app.mount('#app')