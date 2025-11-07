<template>
  <MainTemplate>
    <template #Dashboard>
      <p>Aquí va el dashboard</p>
    </template>
  </MainTemplate>
</template>
<script lang="ts">
import MainTemplate from '@/templates/MainTemplate.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MyCourses',
    components: {
        MainTemplate        
    },
});
</script>