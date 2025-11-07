<template>
  <MainTemplate>
    <template #MyCourses>
      <p>Aquí van los cursos del usuario</p>
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