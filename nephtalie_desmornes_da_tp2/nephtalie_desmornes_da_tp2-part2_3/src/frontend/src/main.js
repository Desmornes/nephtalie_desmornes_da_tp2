import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import Bootstrap and BootstrapVue CSS files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import Font Awesome
import 'font-awesome/css/font-awesome.min.css'

// Import custom CSS
import './assets/css/style.css'

// Import event bus
import { eventBus } from './eventBus'

const app = createApp(App)

// Use router
app.use(router)

// Add event bus to global properties
app.config.globalProperties.$eventBus = eventBus

// Mount the app
app.mount('#app')
