<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" variant="outlined" size="small" class="text-white" block>
        <span class="text-truncate"> <img :src="selectedItem?.flag" width="30" height="24" alt="Ucrania"> {{ selectedItem?.text || 'Seleccionar opción' }}</span>
        <v-icon end size="small">mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-list density="compact" class="py-0">
      <v-list-item v-for="item in items" :key="item.value" @click="selectItem(item)"
        :class="{ 'bg-primary': selectedItem?.value === item.value }" class="px-3" min-height="48">
        <v-list-item-title class="text-body-2">
          <img :src="item.flag" width="30" height="24" alt="Ucrania"> {{ item.text }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { defineComponent } from 'vue';


export default defineComponent({
  name: "SelectedCountry",
  data() {
    return {

      selectedItem: null,
      items: [
        { value: 1, text: 'Chile', flag: 'https://flagcdn.com/112x84/cl.webp' },
        { value: 2, text: 'Uruguay', flag: 'https://flagcdn.com/112x84/uy.webp' },
        { value: 3, text: 'EEUU', flag: 'https://flagcdn.com/112x84/es.webp' }
      ]
    }
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item
      this.isOpen = false
    }
  }
}) 
</script>