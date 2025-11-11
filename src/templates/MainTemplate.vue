<template>
  <v-app>
    <v-navigation-drawer 
      :width="400" 
      permanent 
      style="background: linear-gradient(185deg, rgb(45 43 43) 0%, rgb(94 87 87) 100%);"
      v-model="drawer" 
      app
    >
      <SelectedCountry />
      <SideMenuPublic />
      
      <template v-slot:append>
        <div class="pa-2 text-white">
          Cerrar Sesion
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar 
      style="background: linear-gradient(90deg,rgba(99, 102, 241, 1) 0%, rgba(67, 56, 202, 1) 100%);" 
      app
    >
      <template v-slot:prepend>
        <v-app-bar-nav-icon color="white" @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <v-toolbar-title class="text-white font-weight-bold">
        <v-icon color="white">mdi-certificate</v-icon>
        TITULO
      </v-toolbar-title>
      <template v-slot:append>
        <span class="mr-4">
          <v-btn color="primary" rounded="xl" prepend-icon="mdi-login" variant="flat">
            Ingresar
          </v-btn>
        </span>
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <slot name="container"></slot>
      </v-container>
    </v-main>

    <v-footer app>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>&copy;</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import SelectedCountry from "@/components/sideMenus/SelectedCountry.vue";
import SideMenuPublic from "@/components/sideMenus/SideMenuPublic.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainTemplate",
  components: {
    SelectedCountry,
    SideMenuPublic
  },
  data() {
    return {
      drawer: true,
    };
  },
});
</script>