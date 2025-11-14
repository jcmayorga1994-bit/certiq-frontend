<template>
  <MainTemplate>
    <template #container>
        <TestUpload />
    </template>
  </MainTemplate>
</template>

<script setup lang="ts">
import MainTemplate from '@/templates/MainTemplate.vue'
import TestUpload from '@/components/general/TestUpload.vue';
</script>
