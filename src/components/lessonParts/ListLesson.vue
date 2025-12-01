<template>
    <v-card v-for="(lesson, i) in lessons" :key="i" class="mx-auto text-left" prepend-icon="mdi-check-bold"
        @click="router.push({ name: 'user.learn.content', query: { id: lesson.id } })" :title="lesson.title">
    </v-card>
</template>

<script setup>
import { LessonService } from '@/services/lessonServices';
import { useLoaderStore } from '@/store/loader';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const lessons = ref([])
const loaderStore = useLoaderStore();
onMounted(async () => {
    loaderStore.showLoader();
    try {
        const RESPONSE_LESSON = await LessonService.find_by_certification({
            certification_id: route.query.id
        });
        lessons.value = RESPONSE_LESSON.data;        
    } catch (error) {
        console.log(error);        
    } finally {
        loaderStore.hideLoader();
    }

});
</script>
