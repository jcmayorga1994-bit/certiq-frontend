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
        path: '/',
        component: () => import('@/layouts/EmptyRouterView.vue'),
        redirect: { name: 'home' },
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import(/* webpackChunkName: "chunk-HomePublic" */ '@/views/HomePublic.vue')
            },
            {
                path: 'login',
                name: 'public.login',
                component: () => import(/* webpackChunkName: "chunk-LoginView" */ '@/views/LoginView.vue')
            },
        ]
    }

]