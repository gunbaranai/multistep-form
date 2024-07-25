import './assets/main.css'

import { createApp } from 'vue'
import Form from './Form.vue'
import router from './router'

const app = createApp(Form)

app.use(router)

app.mount('#app')
