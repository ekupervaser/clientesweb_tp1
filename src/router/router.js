
import Home from './../pages/Home.vue'
import MyProfile from './../pages/MyProfile.vue'
import UserProfile from './../pages/UserProfile.vue'
import Chat from './../pages/Chat.vue'
import PrivateChat from './../pages/PrivateChat.vue'
import Register from './../pages/Register.vue'
import Login from './../pages/Login.vue'
import Panel from './../pages/Panel.vue'
import NewCourse from './../pages/NewCourse.vue'
import Courses from './../pages/Courses.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { subscribeToAuth } from '../services/Auth'

const routes = [
    {path: '/',                 component: Home},
    {path: '/perfil',           component: MyProfile,      meta: { requiresAuth: true }, },
    {path: '/usuario/:id',      component: UserProfile,    meta: { requiresAuth: true }, },
    {path: '/chat',             component: Chat,           meta: { requiresAuth: true }, },
    {path: '/usuario/:id/chat', component: PrivateChat,    meta: { requiresAuth: true }, },
    {path: '/panel',            component: Panel,          meta: { requiresAuth: true }, },
    {path: '/cargar-curso',     component: NewCourse,      meta: { requiresAuth: true }, },
    {path: '/cursos',           component: Courses},
    {path: '/registro',         component: Register},
    {path: '/login',            component: Login},

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