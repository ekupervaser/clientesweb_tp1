
import Home from './../pages/Home.vue'
import Profile from './../pages/Profile.vue'
import About from './../pages/About.vue'
import Chat from './../pages/Chat.vue'
import Register from './../pages/Register.vue'
import Login from './../pages/Login.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { subscribeToAuth } from '../services/Auth'

const routes = [
    {path: '/',              component: Home},
    {path: '/perfil',        component: Profile, meta: { requiresAuth: true }, },
    {path: '/chat',          component: Chat,    meta: { requiresAuth: true }, },
    {path: '/quienes-somos', component: About},
    {path: '/registro',      component: Register},
    {path: '/login',         component: Login},
];

const router = createRouter({
    routes, 
    history: createWebHashHistory(),
});

let user = {
    id: null,
    email: null,
};

subscribeToAuth(newUser => user = newUser);

router.beforeEach((to, from) => {
    if (user.id === null && to.meta.requiresAuth) {
        return '/login';
    }
});

export default router;