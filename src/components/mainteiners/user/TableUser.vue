<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    item-value="name"
  ></v-data-table-server>
</template>
<script setup>
import { ref } from 'vue'
  const itemsPerPage = ref([])

</script>