<template>
  <MainTemplate>

    <template v-slot:container>
      <div class="text-center">
        <h1>Bienvenido a la página pública</h1>
        <p>Explora nuestros cursos y recursos disponibles para todos los usuarios.</p>
      </div>
    </template>

  </MainTemplate>
</template>
<script lang="ts">
import MainTemplate from '@/templates/MainTemplate.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomePublic',
    components: {
        MainTemplate        
    },
});
</script>