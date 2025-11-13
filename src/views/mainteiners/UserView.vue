<template>
  <MainTemplate>
    <template #container>
      <div class="text-center">
        <h1>Bienvenido a CertiQ</h1>
        <p>Esta es la página principal para usuarios autenticados.</p>    
      </div>
      <v-card>
        <v-card-text>
          <table-user></table-user>
        </v-card-text>
      </v-card>
    </template>
  </MainTemplate>
</template>

<script setup lang="ts">
import MainTemplate from '@/templates/MainTemplate.vue'
import TableUser from '@/components/mainteiners/user/TableUser.vue';
</script>
