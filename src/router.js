import { createRouter, createWebHistory } from 'vue-router';
import Home from "./views/Home.vue";
import Dashboard from "./views/Dashboard.vue";
import Preview from "./views/Preview.vue";
import Auth from "./views/Auth.vue";
import Survey from "./views/Survey.vue"; // Импортируем компонент Survey
import { useAuthStore } from "./stores/auth/authStore.js";

const routes = [
    { path: '/', component: Home },
    { path: '/dashboard', component: Dashboard },
    { path: '/preview', component: Preview },
    { path: '/auth', component: Auth },
    { path: '/survey', component: Survey }, // Добавляем новый маршрут для Survey
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    // Пропускаем авторизационные проверки для маршрута /survey
    if (to.path === '/survey') {
        return next(); // Пропускаем проверку и продолжаем навигацию
    }

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
