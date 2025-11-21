<template>
    <div>
        <div id="googleButton"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useAlertStore } from '@/store/alert'

const authStore = useAuthStore()
const router = useRouter()
const alertStore = useAlertStore();
onMounted(() => {
    window.google.accounts.id.initialize({
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleCallback,
    });

    window.google.accounts.id.renderButton(
        document.getElementById("googleButton")!,
        { theme: "filled_blue", size: "large", shape: "pill" }
    );
});


async function handleGoogleCallback(response: any) {
    const credential = response.credential;
    try {
        const result = await authStore.loginGoogle(credential)

        if (result?.success) {
            router.push({ name: 'user.inicio' })
        } else {
            alertStore.error('No autorizado. Por favor, inicia sesión nuevamente.');
        }

    } catch (err) {
        console.error("Error Google login", err);
    }
}
</script>
