<template>
  <v-app>
    <v-navigation-drawer style="background: linear-gradient(185deg, rgb(45 43 43) 0%, rgb(94 87 87) 100%);"
      v-model="drawer" dark app>
      <v-list density="compact">
        <Test />
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          Cerrar Sesion
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar style="background: #6366F1;
background: linear-gradient(90deg,rgba(99, 102, 241, 1) 0%, rgba(67, 56, 202, 1) 100%);" dense app>
      <template v-slot:prepend>
        <v-app-bar-nav-icon color="white" @click="drawer = drawer ? false : true"></v-app-bar-nav-icon>
      </template>
      <template v-slot:title>
        <v-toolbar-title class="text-white font-weight-bold">
          <v-icon dark>
            mdi-certificate
          </v-icon>
          TITULO
        </v-toolbar-title>
      </template>
      <template v-slot:append>
        <v-toolbar-title class="text-white">
          <!-- {{ user.name }} {{ user.pather_lastname }} {{ user.mother_lastname }} -->
          Nombre Usuario
        </v-toolbar-title>
      </template>

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
import Test from "@/components/sideMenus/Test.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "MainTemplate",
  components: {
    Test,
  },
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