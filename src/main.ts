import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vue3GoogleLogin from 'vue3-google-login';
import { createPinia } from 'pinia'
import { useAuthStore } from './store/auth'
import vuetify from './plugins/vuetify'
import 'vuetify/styles' 

// const appVersion = process.env.VUE_APP_GLOBAL_VERSION;
// const browserVersion = window.localStorage.getItem("appVersion");

// if (appVersion !== browserVersion) {
//   window.localStorage.setItem("appVersion", appVersion as string);
//   window.location.reload();
// }
const app = createApp(App)
const pinia = createPinia()

app.use(vuetify)
app.use(store)
app.use(router)
app.use(pinia)

// Inicializar autenticación desde localStorage
const authStore = useAuthStore()
authStore.initAuth()

// Si hay token, verificar que sea válido
if (authStore.isAuthenticated) {
  authStore.fetchUser()
}

app.mount('#app')
