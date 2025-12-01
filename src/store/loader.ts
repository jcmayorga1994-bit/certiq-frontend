import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoaderStore = defineStore('loader', () => {
  const isLoading = ref(false);
  const loadingCount = ref(0);

  const showLoader = () => {
    loadingCount.value++;
    isLoading.value = true;
  };

  const hideLoader = () => {
    loadingCount.value--;
    if (loadingCount.value <= 0) {
      loadingCount.value = 0;
      isLoading.value = false;
    }
  };

  const resetLoader = () => {
    loadingCount.value = 0;
    isLoading.value = false;
  };

  return {
    isLoading,
    showLoader,
    hideLoader,
    resetLoader
  };
});