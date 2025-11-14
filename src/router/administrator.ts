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
        path: '/admin',
        component: () => import('@/layouts/EmptyRouterView.vue'),
        // redirect: { name: 'admin.inicio' },
        children: [
            // {
            //     path: 'inicio',
            //     name: 'admin.inicio',
            //     component: () => import('@/views/admin/AdminInicio.vue')
            // },
            {
                path: 'users',
                name: 'admin.users',
                component: () => import('@/views/mainteiners/UserView.vue')
            },
            {
                path: 'upload',
                name: 'admin.upload',
                component: () => import('@/views/TestUpload.vue')
            }
        ]
    }

]