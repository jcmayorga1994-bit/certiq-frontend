import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vue3GoogleLogin from 'vue3-google-login';

// Vuetify
import vuetify from './plugins/vuetify'
import 'vuetify/styles' 

// const appVersion = process.env.VUE_APP_GLOBAL_VERSION;
// const browserVersion = window.localStorage.getItem("appVersion");

// if (appVersion !== browserVersion) {
//   window.localStorage.setItem("appVersion", appVersion as string);
//   window.location.reload();
// }

createApp(App).
    use(vuetify).
    use(store).
    use(router).
    use(vue3GoogleLogin, {
        clientId: '628906036129-gs3d52h8hfp9rfdp9s2fib8muq4l85o4.apps.googleusercontent.com'
    }).
    mount('#app')

