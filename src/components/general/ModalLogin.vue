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
                    <v-form v-model="isFormValid" validate-on="submit lazy" @submit.prevent="submit">
                        <v-text-field v-model="dataLogin.email" :rules="rules.requiredEmail"
                            label="Correo Electronico"></v-text-field>
                        <v-text-field v-model="dataLogin.password" :rules="rules.requiredPassword" label="Contraseña"
                            type="password"></v-text-field>
                        <v-btn :loading="loading" class="mt-2" text="Iniciar Sesión" type="submit" block
                            color="primary"></v-btn>
                    </v-form>

                    <v-divider class="my-4"></v-divider>

                    <!-- Botón de Google -->
                    <v-btn @click="loginWithGoogle" :loading="googleLoading" block variant="outlined"
                        color="grey-darken-1" prepend-icon="mdi-google">
                        Continuar con Google
                    </v-btn>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="Cerrar" @click="isActive.value = false"></v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script lang="ts">
import { validationRules } from '@/utils/validationRules';
import { defineComponent } from 'vue';
import { googleTokenLogin } from 'vue3-google-login';

export default defineComponent({
    name: 'LoginView',
    data() {
        return {
            dataLogin: {
                email: null as string | null,
                password: null as string | null,
            },
            rules: validationRules,
            loading: false,
            googleLoading: false,
            isFormValid: false
        }
    },
    methods: {
        submit() {
            if (this.isFormValid) {
                this.loading = true;
                this.$router.push({ name: "Dashboard" });
                setTimeout(() => {
                    this.loading = false;
                }, 2000);
            }
        },

        async loginWithGoogle() {
            try {
                this.googleLoading = true;

                const response = await googleTokenLogin();

                console.log('Google Login Success:', response);
                console.log('Access Token:', response.access_token);

                // Aquí envías el token a tu backend
                // await this.sendGoogleTokenToBackend(response.access_token);

                // O decodifica el JWT para obtener info del usuario
                // const userData = this.decodeJWT(response.access_token);

            } catch (error) {
                console.error('Error en Google Login:', error);
            } finally {
                this.googleLoading = false;
            }
        }
    }
});
</script>