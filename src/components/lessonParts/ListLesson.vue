<template>
    <v-card 
        v-for="(lesson, i) in lessons" 
        :key="i" 
        class="mx-auto text-left" 
        prepend-icon="mdi-check-bold"
        @click="router.push({ name: 'user.learn.content', query: { id: lesson.id }
 })"
        :title="lesson.title">
    </v-card>
</template>

<script setup>
import { LessonService } from '@/services/lessonServices';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(false);
const lessons = ref([])
onMounted(async () => {
    loading.value = true;
    const RESPONSE_LESSON = await LessonService.getAll();
    lessons.value = RESPONSE_LESSON.data;
    loading.value = false;
});
</script>
