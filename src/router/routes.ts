import type { RouteRecordRaw } from 'vue-router';

declare module 'vue-router' {
    interface RouteMeta {
        layout?: 'Default' | 'Auth'; // Các giá trị hợp lệ của layout
    }
}
// Định nghĩa meta mặc định
const defaultMeta = { layout: 'Default' };
const authMeta = { layout: 'Auth' };

// Hàm tạo route để tiện tái sử dụng
function createRoute(path: string, name: string, component: () => Promise<any>, meta: Record<string, any> = {}, props: boolean | Record<string, any> | ((route: any) => Record<string, any>) = false ) {
    return { path, name, component, meta, props };
}

// Gom route trong một array
export const routes: RouteRecordRaw[] = [
    // Sử dụng layout Default
    createRoute('/', 'Home', () => import('@/views/Home.vue'), defaultMeta),
    createRoute('/products', 'Products', () => import('@/views/Products.vue'), defaultMeta),
    createRoute('/about', 'About', () => import('@/views/About.vue'), defaultMeta),
    createRoute('/posts', 'Posts', () => import('@/pages/posts/Posts.vue'), defaultMeta),

    createRoute('/post/:id', 'PostDetail', () => import('@/pages/posts/PostDetail.vue'), defaultMeta, true),
    createRoute('/product/:id', 'ProductDetail', () => import('@/pages/products/ProductDetail.vue'), defaultMeta, true),
    // Sử dụng layout Auth
    createRoute('/login', 'Login', () => import('@/pages/Login.vue'), authMeta),
    createRoute('/register', 'Register', () => import('@/pages/Register.vue'), authMeta),
    // Not Found routes
    createRoute('/404', 'NotFound', () => import('@/pages/404.vue'), defaultMeta),
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
    }
];
