import { createRouter, createWebHistory } from 'vue-router';
import Home from "./views/Home.vue";
import Dashboard from "./views/Dashboard.vue";
import Preview from "./views/Preview.vue";
import {useAuthStore} from "./stores/auth/authStore.js";
import Auth from "./views/Auth.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/dashboard', component: Dashboard },
    { path: '/preview', component: Preview },
    { path: '/auth', component: Auth },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    if (!authStore.isAuthenticated) {
        await authStore.authorizeByToken();
    }

    if (!authStore.isAuthenticated) {
        if (to.path === '/preview' || to.path === '/auth') {
            next();
        } else {
            next('/preview');
        }
    } else {
        if (to.path === '/preview' || to.path === '/auth') {
            next('/');
        } else {
            next();
        }
    }
});

export default router;
