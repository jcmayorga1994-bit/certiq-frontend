<template>
    <v-menu min-width="200px">
        <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
                <v-avatar color="info" size="large">
                    <v-icon icon="mdi-account"></v-icon>
                </v-avatar>
            </v-btn>
        </template>
        <v-card>
            <v-card-text>
                <div class="mx-auto text-center">
                    <v-avatar color="info">
                        <v-icon icon="mdi-account"></v-icon>
                    </v-avatar>
                    <h3>{{ authStore.user?.name }}</h3>
                    <p class="text-caption mt-1">
                        {{ authStore.user?.email }}
                    </p>
                    <v-divider class="my-3"></v-divider>
                    <v-btn variant="text">
                        Editar Cuenta
                    </v-btn>
                    <v-divider class="my-3"></v-divider>
                    <v-btn variant="text" @click="handleLogout">
                        Cerrar Sesión
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-menu>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  await authStore.logout();
  router.push({ name: 'HomePublic' })
};
</script>