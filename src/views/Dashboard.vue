<template>
  <MainTemplate>

    <template v-slot:container>
      <div class="text-center">
        <h1>Resumen de tu actividad y progreso</h1>
        <v-card color="indigo">
          <v-card-title>
            Total de Cursos Completados: 0
          </v-card-title>
        </v-card>
        <v-card color="indigo">
          <v-card-title>
            Cursos Completados: 0
          </v-card-title>
        </v-card>
        <v-card color="indigo">
          <v-card-title>
            Progreso Promedio: 0
          </v-card-title>
        </v-card>
        <v-card color="indigo">
          <v-card-title>
            Horas de estudio: 0
          </v-card-title>
        </v-card>
        <v-card>
          <v-card-title>
            Progreso por curso
          </v-card-title>
          <v-card-text>
            <v-progress-linear color="blue-darken-3" model-value="20" :height="8"></v-progress-linear>
          </v-card-text>
        </v-card>
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