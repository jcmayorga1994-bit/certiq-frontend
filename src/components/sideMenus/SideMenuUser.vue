<template>
    <div v-for="(item, i) in items" :key="i">
        
        <!-- Ítems sin hijos -->
        <v-list-item
            v-if="item.childrens.length === 0"
            :title="item.text"
            :prepend-icon="item.icon"
            class="text-white bg-transparent text-left"
            :active="isActive(item.path)"
            @click="router.push({ name: item.path })"
        />

        <!-- Ítems con hijos -->
        <v-list v-else class="text-white bg-transparent" density="compact">
            <v-list-group :value="isActive(item.path)">
                
                <template #activator="{ props }">
                    <v-list-item
                        v-bind="props"
                        :title="item.text"
                        :prepend-icon="item.icon"
                        class="text-left"
                        :active="isActive(item.path)"
                        @click="router.push({ name: item.path })"
                    />
                </template>

                <v-list-item
                    v-for="(children, j) in item.childrens"
                    :key="j"
                    :title="children.text"
                    :prepend-icon="children.icon"
                    :active="isActive(children.path)"
                    class="text-left pl-8"
                    @click="router.push({ name: children.path })"
                />
            </v-list-group>
        </v-list>

    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Marca como activo si la ruta coincide
const isActive = (name: string) => {
    return route.name === name;
};

const items = [
    {
        text: 'Inicio',
        icon: 'mdi-home',
        path: 'user.inicio',
        childrens: []
    },
    {
        text: 'Mis Lecciones',
        icon: 'mdi-book-open-page-variant',
        path: 'user.my-lessons',
        childrens: []
    },
    {
        text: 'Simulación de Exámenes',
        icon: 'mdi-pencil-ruler',
        path: 'user.exam-simulation',
        childrens: []
    },
    {
        text: 'Exámenes',
        icon: 'mdi-school',
        path: 'user.exam',
        childrens: []
    },
    {
        text: 'Dashboard',
        icon: 'mdi-view-dashboard',
        path: 'user.dashboard',
        childrens: []
    },
];
</script>


<style scoped>
:deep(.v-list-item--active) {
    background-color: rgba(255, 255, 255, 0.1) !important;
    border-left: 3px solid #fff !important;
    color: #fff !important;
}
</style>