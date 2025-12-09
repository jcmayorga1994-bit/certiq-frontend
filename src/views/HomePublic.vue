<template>
  <MainTemplate>
    <template #container>
      <div class="text-center">
        <h1>Bienvenido a la página pública</h1>
        <p>Explora nuestros cursos y recursos disponibles para todos los usuarios.</p>
      </div>
      <list-certifications-public />
    </template>
  </MainTemplate>
</template>

<script setup lang="ts">
import MainTemplate from '@/templates/MainTemplate.vue'
import ListCertificationsPublic from '@/components/certification/ListCertificationsPublic.vue'
</script>
