<template>
  <v-app>
    <!-- Drawer lateral -->
    <v-navigation-drawer v-model="drawer" :width="400" app
      style="background: linear-gradient(185deg, rgb(45 43 43) 0%, rgb(94 87 87) 100%);">
      <SelectedCountry />
      <br>
      <SideMenuUser v-if="authStore.isAuthenticated" />
      <SideMenuPublic v-else />

      <!-- <template #append>
        <v-list-item @click="handleLogout" link>
          <template v-slot:prepend>
            <v-icon class="pa-2 text-white cursor-pointer">mdi-logout</v-icon>
          </template>
<v-list-item-title class="pa-2 text-white cursor-pointer">Cerrar Sesión</v-list-item-title>
</v-list-item>
</template> -->
    </v-navigation-drawer>

    <!-- App bar superior -->
    <v-app-bar app style="background: linear-gradient(90deg, rgba(99,102,241,1) 0%, rgba(67,56,202,1) 100%);">
      <template #prepend>
        <v-app-bar-nav-icon color="white" @click="drawer = !drawer" />
      </template>
      <template #title>
        <v-toolbar-title>
          <v-img style="margin-top: 1em;" :width="300" aspect-ratio="16/9" :src="require('@/assets/logo2.png')"></v-img>
        </v-toolbar-title>
      </template>
      <template #append>
        <span class="mr-4">
          <CardLoginUser v-if="authStore.isAuthenticated"></CardLoginUser>
          <ModalLogin v-else />
        </span>
      </template>
    </v-app-bar>

    <!-- Contenido principal -->
    <v-main>
      <!-- <v-parallax src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"> -->
      <v-container fluid>
          <LoaderComponent />
          <AlertNotification />
          <slot name="container"></slot>          
        </v-container>
      <!-- </v-parallax> -->
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>&copy;</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ModalLogin from "@/components/general/ModalLogin.vue";
import SelectedCountry from "@/components/sideMenus/SelectedCountry.vue";
import SideMenuPublic from "@/components/sideMenus/SideMenuPublic.vue";
import { useAuthStore } from "@/store/auth";
import SideMenuUser from "@/components/sideMenus/SideMenuUser.vue";
import AlertNotification from '@/components/general/AlertNotification.vue'
import CardLoginUser from "@/components/general/CardLoginUser.vue";
import LoaderComponent from "@/components/general/LoaderComponent.vue";
const authStore = useAuthStore();
const drawer = ref(false);


</script>
