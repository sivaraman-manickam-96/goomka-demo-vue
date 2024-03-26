import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import veeValidateConfig from '../veeValidateConfig.js'
import globalVars from '/src/assets/globalVars.vue'

const app = createApp(App);
app.use(globalVars);
app.use(router);
app.use(veeValidateConfig);
app.mount('#app')
