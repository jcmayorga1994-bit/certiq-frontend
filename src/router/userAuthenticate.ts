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
                path: 'home',
                name: 'user.home',
                component: () => import('@/views/user/HomeView.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'my_certifications',
                name: 'user.my_certifications',
                component: () => import('@/views/user/certification/myCertificationsView.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'learn',
                name: 'user.learn',
                component: () => import('@/views/user/learn/LearnView.vue'),
                meta: { requiresAuth: true },
            },
            {
                path: 'learn/content',
                name: 'user.learn.content',
                component: () => import('@/views/user/learn/ListLessonContentView.vue'),
                meta: { requiresAuth: true },
                props: true
            },
            {
                path: 'learn/content/feedback',
                name: 'user.learn.feedback',
                component: () => import('@/views/user/learn/FeedbackView.vue'),
                meta: { requiresAuth: true },
                props: true
            },
            {
                path: 'leaderboard',
                name: 'user.leaderboard',
                component: () => import('@/views/user/LeaderboardView.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'practice',
                name: 'user.practice',
                component: () => import('@/views/user/PracticeView.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'settings',
                name: 'user.settings',
                component: () => import('@/views/user/ProfileView.vue'),
                meta: { requiresAuth: true }
            }
        ]
    }

]