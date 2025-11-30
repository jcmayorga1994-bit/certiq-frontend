<template>
    <div class="relative inline-block">
        <div 
            id="googleButton" 
            :style="{ opacity: loading ? 0.5 : 1, pointerEvents: loading ? 'none' : 'auto' }">
        </div>
        
        <!-- Loader overlay -->
        <div 
            v-if="loading" 
            class="absolute inset-0 flex items-center justify-center">
            <v-progress-circular
                indeterminate
                color="primary"
                :size="40"
                :width="4"
            ></v-progress-circular>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useAlertStore } from '@/store/alert'

const authStore = useAuthStore()
const router = useRouter()
const alertStore = useAlertStore()

const loading = ref(false)

onMounted(() => {
    window.google.accounts.id.initialize({
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleCallback,
    })

    window.google.accounts.id.renderButton(
        document.getElementById("googleButton")!,
        { theme: "filled_blue", size: "large", shape: "pill" }
    )
})

async function handleGoogleCallback(response: any) {
    loading.value = true
    const credential = response.credential

    try {
        const result = await authStore.loginGoogle(credential)

        if (result?.success) {
            router.push({ name: 'user.home' })
        } else {
            alertStore.error('No autorizado. Por favor, inicia sesión nuevamente.')
        }

    } catch (err) {
        console.error("Error Google login", err)
        alertStore.error('Error al iniciar sesión con Google.')
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.relative {
    position: relative;
}

.inline-block {
    display: inline-block;
}

.absolute {
    position: absolute;
}

.inset-0 {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.flex {
    display: flex;
}

.items-center {
    align-items: center;
}

.justify-center {
    justify-content: center;
}
</style>