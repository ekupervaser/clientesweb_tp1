<script>
import Chat from './pages/Chat.vue';
import { logout, subscribeToAuth } from './services/auth'

export default {
    name: "App",
    components: {Chat},
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

    <header class="flex gap-4 items-center p-4 bg-blue-50">
        <div>
            <p class="text-xl">Página principal</p>
        </div>
        <nav>
            <ul class="flex gap-5">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/quienes-somos">About</router-link>
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
                        <router-link to="/registro">Mi perfil</router-link>
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
    </header>

    <!--
    Acá va a venir el renderizado de las rutas cuando agreguemos Vue Router.
    Mientras tanto, vamos a renderizar la "vista" del Chat.
    -->
    <div class="container m-auto p-10">
     <!--    <Chat /> -->

     <router-view></router-view>
    </div>

    <footer class="bg-blue-700 text-white h-20 flex justify-center items-center">
        <p>Trabajo práctico N° 1</p>
    </footer>
</template>