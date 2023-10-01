<script>
import Chat from './pages/Chat.vue';
import { logout, subscribeToAuth } from './services/Auth'
import Home from './pages/Home.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
    name: "App",
    components: { Chat, Home, Header, Footer },
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
    <div class="container">

        <Header></Header>
        
        <div class="container m-auto p-10">
        <router-view></router-view>
        </div>

        <Footer></Footer>
    </div>
</template>