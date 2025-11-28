<template>
    <MainTemplate>
        <template #container>
            <div class="text-center">
                <v-sheet elevation="4" class="text-body-2 mx-auto" max-width="550">
                    <v-container fluid>
                        <v-row>
                            <v-col cols="12" md="3">
                                <v-img height="88"
                                    src="https://cdn.vuetifyjs.com/docs/images/graphics/img-placeholder.png"
                                    cover></v-img>
                                Aca podria ir el porcentaje de avance
                            </v-col>
                            <v-col cols="12" md="9">
                                <p class="mb-4">
                                    Titulo de la certificación
                                </p>

                                <ul class="ps-4 mb-6">
                                    <li>
                                        <a href="#">5 Ways to See if Referral Programs Can Work for You</a>
                                    </li>
                                    <li>
                                        <a href="#">The 6 Key Benefits of Referral Marketing</a>
                                    </li>
                                    <li>
                                        <a href="#">Leading Indicators of Referral Program Success</a>
                                    </li>
                                    <li>
                                        <a href="#">Debunking the Top 5 Worst Referral Program Myths</a>
                                    </li>
                                </ul>

                                <v-btn class="text-none" color="info" rounded="0" variant="flat" block>
                                    <span class="hidden-sm-and-down">
                                        Explore our 38+ Referral Program Resources
                                    </span>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-sheet>
            </div>
        </template>
    </MainTemplate>
</template>

<script setup lang="ts">
import MainTemplate from '@/templates/MainTemplate.vue'
</script>
