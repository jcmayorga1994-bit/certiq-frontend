<template>
    <MainTemplate>
        <template #container>
            <CarouselLesson />
        </template>
    </MainTemplate>
</template>

<script setup lang="ts">
import MainTemplate from '@/templates/MainTemplate.vue';
import CarouselLesson from '@/components/lessonParts/CarouselLesson.vue';
</script>