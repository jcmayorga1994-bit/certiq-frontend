<template>
  <v-menu >
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        variant="outlined"
        size="small"
        class="text-white"
        block
      >       
        <span class="text-truncate"> {{ selectedItem?.flag }} {{ selectedItem?.text || 'Seleccionar opción' }}</span>
        <v-icon end size="small">mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-list density="compact" class="py-0">
      <v-list-item
        v-for="item in items"
        :key="item.value"
        @click="selectItem(item)"
        :class="{ 'bg-primary': selectedItem?.value === item.value }"
        class="px-3"
        min-height="48"
      >
        <v-list-item-title class="text-body-2">
          {{ item.flag }} {{ item.text }}
        </v-list-item-title>
        <v-list-item-subtitle class="text-caption">{{ item.description }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { defineComponent } from 'vue';


export default defineComponent({
  name: "TestX",
  data() {
    return {
      
      selectedItem: null,
      items: [
        { value: 1, text: 'Chile', flag: '🇨🇱', description: 'País sudamericano' },
        { value: 2, text: 'Uruguay', flag: '🇦🇷', description: 'País sudamericano' },
        { value: 3, text: 'EEUU', flag: '🇧🇷', description: 'País sudamericano' }
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