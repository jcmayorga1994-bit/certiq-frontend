<template>
  <v-data-table-server
    :items="items"
    :headers="headers"
    :items-length="total"
    :loading="loading"
    item-value="name"
    v-model:items-per-page="itemsPerPage"
  >
  </v-data-table-server>
</template>

<script setup>
import { UserService } from '@/services/user_service';
import { ref, onMounted } from 'vue';

const loading = ref(false);
const items = ref([]);
const total = ref(0);
const itemsPerPage = ref(10); // Número, no arreglo

const headers = [
  { title: 'Name', key: 'name' }
];

onMounted(async () => {
  loading.value = true;

  const response = await UserService.getAll();
  items.value = response.data;   // asumiendo user_service devuelve { data, total }
  total.value = response.total;

  loading.value = false;
});
</script>
