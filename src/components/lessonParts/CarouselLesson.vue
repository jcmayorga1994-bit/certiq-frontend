<template>
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
                        color="info" variant="elevated" @click="handleNext(props.onClick)"
                        :disabled="isCurrentBlockQuizAndNotAnswered()">
                        Siguiente
                    </v-btn>
                    <v-btn v-if="carouselSelected == lesson_content.content_json.lesson_json.blocks.length - 1"
                        color="info" variant="elevated" @click="handleFinish"
                        :disabled="isCurrentBlockQuizAndNotAnswered()">
                        Finalizar
                    </v-btn>
                </template>

                <v-carousel-item v-for="(blocks, index) in lesson_content.content_json.lesson_json.blocks" :key="index"
                    cover>
                    <v-sheet class="ma-2 pa-2 me-auto mx-auto" max-width="1000" width="100%" rounded>
                        <div v-if="blocks.type != 'quiz_multiple_choice'">
                            {{ blocks.text }}
                        </div>
                        <div v-else>
                            <strong>{{ blocks.explanation }}</strong><br>
                            {{ blocks.question }}

                            <v-radio-group v-model="arrayResponse[index]"
                                @update:model-value="validateAnswer(index, blocks.correct_option_index)">
                                <v-radio v-for="(option, i) in blocks.options" :key="i" :label="option" :value="i"
                                    color="primary" />
                            </v-radio-group>

                            <!-- Mensaje de validación -->
                            <v-alert v-if="quizValidation[index] !== null"
                                :type="quizValidation[index] ? 'success' : 'error'"
                                :icon="quizValidation[index] ? 'mdi-check-circle' : 'mdi-alert-circle'" class="mt-3"
                                variant="tonal">
                                {{ quizValidation[index]
                                    ? '¡Correcto! Esa es la respuesta correcta.'
                                    : 'Esa no es la respuesta correcta. Intenta de nuevo.' }}
                            </v-alert>
                        </div>
                    </v-sheet>
                </v-carousel-item>

            </v-carousel>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LessonContentService } from '@/services/lessonContentServices';
import { LessonContent } from "@/models/lessonContent"
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLoaderStore } from '@/store/loader';

const route = useRoute();
const router = useRouter();
const lesson_content = ref<LessonContent | null>(null)
const carouselSelected = ref(0)
const arrayResponse = ref<number[]>([])
const quizValidation = ref<(boolean | null)[]>([])
const loaderStore = useLoaderStore();

onMounted(async () => {
    loaderStore.showLoader();
    try {
        lesson_content.value = await LessonContentService.getById(route.query.id);
        // Inicializar array de validación
        if (lesson_content.value) {
            quizValidation.value = new Array(lesson_content.value.content_json.lesson_json.blocks.length).fill(null);
        }
    } catch (error) {
        console.log(error);

    } finally {
        loaderStore.hideLoader();
    }

})

const validateAnswer = (index: number, correctOptionIndex: number) => {
    const selectedOptionIndex = arrayResponse.value[index];
    quizValidation.value[index] = selectedOptionIndex === correctOptionIndex;
}

const isCurrentBlockQuizAndNotAnswered = () => {
    if (!lesson_content.value) return false;

    const currentBlock = lesson_content.value.content_json.lesson_json.blocks[carouselSelected.value];

    // Si es un quiz
    if (currentBlock.type === 'quiz_multiple_choice') {
        // Verificar si no ha respondido o si la respuesta es incorrecta
        return quizValidation.value[carouselSelected.value] !== true;
    }

    return false;
}

const handleNext = (nextFunction: () => void) => {
    if (!isCurrentBlockQuizAndNotAnswered()) {
        nextFunction();
    }
}

const handleFinish = () => {
    if (!isCurrentBlockQuizAndNotAnswered() && lesson_content.value) {
        
        router.push({ name: 'user.learn.feedback', query: { id: lesson_content.value.id } });
    }
}
</script>