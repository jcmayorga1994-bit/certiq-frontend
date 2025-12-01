<template>
  <v-overlay 
    :model-value="isLoading" 
    class="align-center justify-center"
    persistent
    :scrim="true"
  >
    <v-progress-circular
      color="primary"
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLoaderStore } from '@/store/loader';

const loaderStore = useLoaderStore();
const { isLoading } = storeToRefs(loaderStore);
</script>