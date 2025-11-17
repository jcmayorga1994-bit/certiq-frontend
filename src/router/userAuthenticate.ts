// import EmptyRouterView from '@/views/EmptyRouterView.vue';


//Ver si esto puede pasarse a compensable
// function lazyLoad(view, chunkName) {
//   return defineAsyncComponent({
//     loader: () => import(/* webpackChunkName: "[request]" */ `../views/${view}.vue`),
//     loadingComponent: Loading,
//     delay: 300, // muestra el loader si tarda más de 300ms
//     timeout: 10000 // corta si demora más de 10s
//   })
// }
export const routes = [
    {
        path: '/user',
        component: () => import('@/layouts/EmptyRouterView.vue'),
        redirect: { name: 'user.inicio' },
        meta: { requiresAuth: true },
        children: [
            {
                path: 'inicio',
                name: 'user.inicio',
                component: () => import('@/views/user/HomeView.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'my-lessons',
                name: 'user.my-lessons',
                component: () => import('@/views/user/MyLessonsView.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'exam-simulation',
                name: 'user.exam-simulation',
                component: () => import('@/views/user/ExamSimulationView.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'exam',
                name: 'user.exam',
                component: () => import('@/views/user/ExamsView.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'dashboard',
                name: 'user.dashboard',
                component: () => import('@/views/user/DashboardView.vue'),
                meta: { requiresAuth: true }
            }
        ]
    }

]