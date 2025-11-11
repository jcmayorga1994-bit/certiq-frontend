<template>
  <v-list class="text-white bg-transparent" density="compact">
    <v-list-group v-for="(item, i) in items" :key="i" :value="item.text">
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          :title="item.text"
          :prepend-icon="item.icon"
          class="text-left"
        ></v-list-item>
      </template>

      <v-list-item
        v-for="(children, j) in item.childrens"
        :key="j"
        :prepend-icon="children.icon"
        :title="children.text"
        :value="children.text"
        class="text-left pl-8"
      ></v-list-item>
    </v-list-group>
  </v-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "SideMenuPublic",
  data() {
    return {
      items: [
        {
          text: 'Nuestros cursos',
          icon: 'mdi-book-open-page-variant',
          childrens: [{
            text: 'Todos los cursos',
            icon: 'mdi-book-open-variant'
          }]
        },
        {
          text: 'Simulado',
          icon: 'mdi-file-document',
          childrens: []
        },
        {
          text: 'Certificación',
          icon: 'mdi-certificate',
          childrens: []
        }
      ]
    }
  },
}) 
</script>

<style scoped>
/* Forzar alineación a la izquierda */
:deep(.v-list-item__content) {
  text-align: left !important;
}

:deep(.v-list-item-title) {
  text-align: left !important;
}
</style>