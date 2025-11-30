<template>
  <MainTemplate>
    <template #container>
      <div class="text-center">
        <h1>Certificación 1 (aca se debe cargar la certificacion) </h1>
        <ListLessons />
      </div>
    </template>
  </MainTemplate>
</template>

<script setup lang="ts">
import ListLessons from '@/components/lessonParts/ListLesson.vue';
import MainTemplate from '@/templates/MainTemplate.vue'
</script>
