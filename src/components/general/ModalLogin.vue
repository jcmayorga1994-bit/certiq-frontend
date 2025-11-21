<template>
    <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" color="primary" rounded="xl" prepend-icon="mdi-login" variant="flat">
                Ingresar
            </v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card>
                <v-card-item>
                    <v-card-title>
                        Ingresar
                    </v-card-title>

                    <v-card-subtitle>
                        Inicie sesión para acceder a la información
                    </v-card-subtitle>
                </v-card-item>

                <v-card-text>
                    <v-form v-model="isFormValid" @submit.prevent="handleLogin">
                        <v-text-field v-model="dataLogin.email" :rules="rules.requiredEmail"
                            label="Correo Electronico"></v-text-field>
                        <v-text-field v-model="dataLogin.password" :rules="rules.requiredPassword" label="Contraseña"
                            type="password"></v-text-field>
                        <v-btn :loading="loading" class="mt-2" text="Iniciar Sesión" type="submit" block
                            color="primary"></v-btn>
                    </v-form>

                    <v-divider class="my-4"></v-divider>

                    <!-- Botón de Google -->
                    <!-- <v-btn @click="loginWithGoogle" :loading="googleLoading" block variant="outlined"
                        color="grey-darken-1" prepend-icon="mdi-google">
                        Continuar con Google
                    </v-btn> -->
                    <LoginGoogle></LoginGoogle>
                    <br>
                    <p class="text-center">
                        <ModalRegister />
                    </p>
                    <p class="text-center">
                        <a href="">¿Olvidó su contraseña?</a>
                    </p>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="Cerrar" @click="isActive.value = false"></v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { validationRules } from '@/utils/validationRules'
import { googleTokenLogin } from 'vue3-google-login'
import ModalRegister from './ModalRegister.vue'
import { useAuthStore } from '@/store/auth'
import LoginGoogle from './LoginGoogle.vue'
const authStore = useAuthStore()

const router = useRouter()

const dataLogin = ref({ email: '', password: '' })
const rules = validationRules
const loading = ref(false)
const googleLoading = ref(false)
const isFormValid = ref(false)
const errorMessage = ref('')
const errors = ref<{ [key: string]: string }>({})


const handleLogin = async () => {
    if (isFormValid.value) {
        loading.value = true
        errorMessage.value = ''
        errors.value = {}

        const result = await authStore.login(dataLogin.value)

        loading.value = false

        if (result?.success) {
            router.push({ name: 'user.inicio' })
        } else {
            errorMessage.value = result?.message || 'Error al iniciar sesión'
        }
    }
}
</script>
