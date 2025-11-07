<template>
  <v-app>
    <v-navigation-drawer style="background: linear-gradient(185deg, rgb(45 43 43) 0%, rgb(94 87 87) 100%);" v-model="drawer" dark app>
      <v-list dense>        
        Aqui va el Side Menu
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          Cerrar Sesion
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar style="background: #6366F1;
background: linear-gradient(90deg,rgba(99, 102, 241, 1) 0%, rgba(67, 56, 202, 1) 100%);" dense app>
      <v-app-bar-nav-icon
        color="white"
        @click="drawer = drawer ? false : true"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text font-weight-bold"
        >
        <v-icon dark>
          fa-feather-alt
        </v-icon>
        TITULO
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text" >
        <!-- {{ user.name }} {{ user.pather_lastname }} {{ user.mother_lastname }} -->
          Nombre Usuario
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <!-- <toast />
        <relogin />
        <loader />
        <confirm /> -->
        <!-- ACA VAN LOS COMPONENTES PROPIOS QUE NECESITARIA ABRIR EN CUALQUIER LADO -->
        <slot name="container"></slot>
      </v-container>
    </v-main>

    <v-footer padless inset app>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong> &copy; </strong>
        <!-- Versión {{ global }} -->
      </v-col>
    </v-footer>
  </v-app>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MainTemplate",
  data() {
    return {
      drawer: true,
      // global: process.env.VUE_APP_GLOBAL_VERSION,
    };
  },
});
</script>
<style>
.v-list-group__header.v-list-item.v-item--active.v-list-item--active.v-list-item--link.theme--dark.active-item {
  color: white;
  background: #bf1717;
}


</style>