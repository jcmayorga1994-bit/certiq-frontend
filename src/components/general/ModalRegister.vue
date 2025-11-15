<template>
    <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" color="primary" rounded="xl" prepend-icon="mdi-login" variant="flat">
                Registrarse
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
                        <v-text-field v-model="data_post_user.name" 
                            label="Nombre"></v-text-field>
                        <v-text-field v-model="data_post_user.email" :rules="rules.requiredEmail"
                            label="Correo Electronico"></v-text-field>
                        <v-text-field v-model="data_post_user.password" :rules="rules.requiredPassword" label="Contraseña"
                            type="password"></v-text-field>
                        <v-text-field v-model="data_post_user.password_confirmation" :rules="rules.requiredPassword" label="Contraseña"
                            type="password"></v-text-field>
                        <v-btn :loading="loading" class="mt-2" text="Guardar" type="submit" block
                            color="primary"></v-btn>
                    </v-form>       
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
import { User } from '@/models/user'
import { USER_SERVICE } from '@/services/user_service'
import { AUTH_SERVICE } from '@/services/auth_service'

const rules = validationRules
const router = useRouter()

const data_post_user = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})
const loading = ref(false)
const isFormValid = ref(false)

async function submit() {
  if (isFormValid.value) {
    loading.value = true
    await AUTH_SERVICE.register(data_post_user.value)
    loading.value = false
  }
}

</script>
