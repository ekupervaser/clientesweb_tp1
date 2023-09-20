
import About from './../pages/About.vue'
import Chat from './../pages/Chat.vue'
import Register from './../pages/Register.vue'
import Login from './../pages/Login.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {path: '/', component: Chat},
    {path: '/quienes-somos', component: About},
    {path: '/registro', component: Register},
    {path: '/login', component: Login},
];

const router = createRouter({
    routes, 
    history: createWebHashHistory(),
})

export default router;