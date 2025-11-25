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

// Marca como activo si la ruta coincide
const isActive = (name: string) => {
    return router.name === name;
};

const items = [
    {
        text: 'Home',
        icon: 'mdi-home',
        path: 'user.inicio',
        childrens: []
    },
    {
        text: 'Learn',
        icon: 'mdi-book-open-page-variant',
        path: 'user.learn',
        childrens: []
    },
    {
        text: 'Leaderboard',
        icon: 'mdi-pencil-ruler',
        path: 'user.leaderboard',
        childrens: []
    },
    {
        text: 'Practice',
        icon: 'mdi-school',
        path: 'user.practice',
        childrens: []
    },
    {
        text: 'Settings',
        icon: 'mdi-view-dashboard',
        path: 'user.settings',
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