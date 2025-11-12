<template>
  <v-app>
    <!-- Drawer lateral -->
    <v-navigation-drawer v-model="drawer" :width="400" permanent app
      style="background: linear-gradient(185deg, rgb(45 43 43) 0%, rgb(94 87 87) 100%);">
      <SelectedCountry />
      <SideMenuPublic />

      <template #append>
        <div class="pa-2 text-white cursor-pointer">
          Cerrar Sesión
        </div>
      </template>
    </v-navigation-drawer>

    <!-- App bar superior -->
    <v-app-bar app style="background: linear-gradient(90deg, rgba(99,102,241,1) 0%, rgba(67,56,202,1) 100%);">
      <template #prepend>
        <v-app-bar-nav-icon color="white" @click="drawer = !drawer" />
      </template>

      <v-toolbar-title class="text-white font-weight-bold d-flex align-center">
        <v-icon color="white" class="mr-2">mdi-certificate</v-icon>
        TITULO
      </v-toolbar-title>

      <template #append>
        <span class="mr-4">
          <ModalLogin />
        </span>
      </template>
    </v-app-bar>

    <!-- Contenido principal -->
    <v-main>
      <v-container fluid>
        <slot name="container"></slot>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>&copy;</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ModalLogin from '@/components/general/ModalLogin.vue'
import SelectedCountry from '@/components/sideMenus/SelectedCountry.vue'
import SideMenuPublic from '@/components/sideMenus/SideMenuPublic.vue'

// Estado reactivo
const drawer = ref(true)
</script>
