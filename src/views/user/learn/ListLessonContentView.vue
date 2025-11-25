<template>
    <MainTemplate>
        <template #container>
            <div class="text-left">
                <v-carousel>
                    <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover></v-carousel-item>

                    <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>

                    <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-carousel-item>
                </v-carousel>
            </div>
        </template>
    </MainTemplate>

</template>
<script setup>
import MainTemplate from '@/templates/MainTemplate.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
console.log(route.query.id)

</script>