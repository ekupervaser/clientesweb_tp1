<script>
import Chat from './pages/Chat.vue';
import { logout, subscribeToAuth } from './services/Auth'
import Home from './pages/Home.vue';
 import Footer from './components/Footer.vue';

export default {
    name: "App",
    components: { Chat, Home, Footer },
    data() {
        return {
            user: {
                id: null,
                email: null,
            }
        }
    },
    methods: {
        handleLogout () {
            logout();
            this.$router.push('/login');
        }
    },
    mounted() {
        subscribeToAuth(user => {
            this.user = {...user};
        });
    }
};
</script>

<template>

<header>
    <div class=" bg-blue-50">
        <div class="container m-auto flex gap-4 items-center p-4">
            <div>
                <img src="../../favicon-32x32.png" alt="">
            </div>
            <nav>
                <ul class="flex gap-5">
                    <li>
                        <router-link to="/">Home</router-link>
                    </li>
                    <li>
                        <router-link to="/cursos">Cursos</router-link>
                    </li>
                    <template v-if="user.id === null">
                        <li>
                            <router-link to="/registro">Registro</router-link>
                        </li>
                        <li>
                            <router-link to="/login">Iniciar sesión</router-link>
                        </li>
                    </template>
                    <template v-else>
                        <li>
                            <router-link to="/chat">Chat</router-link>
                        </li>
                        <li>
                            <router-link to="/perfil">Mi perfil</router-link>
                        </li>
                        <li>
                            <router-link to="/panel">Panel</router-link>
                        </li>
                        <li>
                            <form action=""
                            @submit.prevent="handleLogout"
                            >
                                <button type="submit">{{user.email}} (Cerrar sesión)</button>
                            </form>
                        </li>
                    </template>
                </ul>
            </nav>
        </div>
    </div>
</header>

        <div class="container m-auto p-10">
        <router-view></router-view>
        </div>

        <Footer></Footer>
</template>