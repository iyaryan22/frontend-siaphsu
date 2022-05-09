import { createApp } from 'vue'
import 'alga-css/dist/alga.min.css'
//import 'alga-css/dist/alga-animate.min.css'
import router from './router'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.mount('#app')