import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vue3GoogleLogin from 'vue3-google-login';
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
})
createApp(App).
    use(vuetify).
    use(store).
    use(router).
    use(vue3GoogleLogin, {
        clientId: '628906036129-gs3d52h8hfp9rfdp9s2fib8muq4l85o4.apps.googleusercontent.com'
    }).
    mount('#app')

