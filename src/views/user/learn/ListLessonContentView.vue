<template>
    <MainTemplate>
        <template #container>
            <div v-if="lesson_content">
                <h1>{{ lesson_content.lesson?.title }}</h1>
                <h3>{{ lesson_content.content_json.lesson_json.objective }}</h3>
                <v-divider :thickness="6"></v-divider>
                <br>
                <div class="text-left">
                    <v-carousel progress="primary" v-model="carouselSelected" hide-delimiters>
                        <template v-slot:prev="{ props }">
                            <v-btn v-if="carouselSelected != 0" color="success" variant="elevated"
                                @click="props.onClick">Anterior</v-btn>
                        </template>
                        <template v-slot:next="{ props }">
                            <v-btn v-if="carouselSelected != lesson_content.content_json.lesson_json.blocks.length - 1"
                                color="info" variant="elevated" @click="props.onClick">Siguiente</v-btn>
                            <v-btn v-if="carouselSelected == lesson_content.content_json.lesson_json.blocks.length - 1"
                                color="info" variant="elevated" @click="router.push({ name: 'user.learn.feedback', query: { id: lesson_content.id } })">Finalizar</v-btn>
                        </template>

                        <v-carousel-item v-for="(blocks, index) in lesson_content.content_json.lesson_json.blocks"
                            :key="index" cover>
                            <v-sheet class="ma-2 pa-2 me-auto mx-auto" max-width="1000" width="100%" rounded>
                                <div v-if="blocks.type !='quiz_multiple_choice'">
                                    {{ blocks.text }}
                                </div>
                                <div v-else>
                                    <strong>{{ blocks.explanation }}</strong><br>
                                    {{ blocks.question }}

                                    <v-radio-group v-model="arrayResponse[index]">
                                        <v-radio
                                            v-for="(option, i) in blocks.options"
                                            :key="i"
                                            :label="option"
                                            :value="option"
                                            color="primary"
                                        />
                                    </v-radio-group>
                                </div>
                            </v-sheet>
                        </v-carousel-item>

                    </v-carousel>
                </div>
            </div>
        </template>
    </MainTemplate>
</template>

<script setup lang="ts">
import { LessonContentService } from '@/services/lessonContentServices';
import { LessonContent } from "@/models/lessonContent"
import MainTemplate from '@/templates/MainTemplate.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute();
const router = useRouter();
const lesson_content = ref<LessonContent | null>(null)
const carouselSelected = ref(0)
const arrayResponse = ref<string[]>([])
onMounted(async () => {
    lesson_content.value = await LessonContentService.getById(route.query.id);
})
</script>
