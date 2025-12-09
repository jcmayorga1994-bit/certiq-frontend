<template>
    <div class="text-center">
        <v-container>
            <v-row no-gutters>
                <v-col v-for="(value, index) in certifications" :key="index" cols="4">
                    <v-sheet elevation="4" class="text-body-2 mx-auto pa-2 ma-2" max-width="550">
                        <v-container fluid>
                            <v-row>
                                <v-col cols="12" md="3">
                                    <v-img height="88"
                                        src="https://cdn.vuetifyjs.com/docs/images/graphics/img-placeholder.png"
                                        cover></v-img>
                                    Aca podria ir el porcentaje de avance
                                    {{ value.country }}
                                </v-col>
                                <v-col cols="12" md="9">
                                    <p class="mb-4">
                                        {{ value.name }}
                                    </p>

                                    <p class="mb-3">
                                        {{ value.description }}
                                    </p>
                                    <v-btn class="text-none" color="info" rounded="0" variant="flat" block @click="router.push({ name: 'public.login' })">
                                        <span class="hidden-sm-and-down">
                                            Suscribirse
                                        </span>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>
<script setup>
import { CertificationService } from '@/services/certificationService';
import { useLoaderStore } from '@/store/loader';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const certifications = ref([])
const loaderStore = useLoaderStore();


onMounted(async () => {
    loaderStore.showLoader();
    try {
        const response = await CertificationService.get_public();
        certifications.value = response.data;
    } catch (error) {
        console.log(error);
        
    } finally {
        loaderStore.hideLoader();
    }

})
</script>