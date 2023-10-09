<script>
import Loader from '../components/Loader.vue';
import { getUserProfileById } from '../services/user';

export default {
    name: 'UserProfile',
    components: { Loader },
    data() {
        return {
            isLoading: true,
            user: {
                id: null,
                email: null,
            }
        };
    },
    async mounted() {
        this.isLoading = true;
        this.user = await getUserProfileById(this.$route.params.id);
        this.isLoading = false;
    },
}
</script>

<template>
    <Loader v-if="isLoading"></Loader>
    <template v-else>
        <h1 class="text-3xl font-black mb-4 text-center">Perfil de {{ user.email }}</h1>
    </template>

    <br class="mb-4"/>

    <h2 class="mb-2 text-xl">Conversación privada</h2>

    <router-link 
    :to="`/usuario/${user.id}/chat`"
    class="text-blue-600">Iniciar una conversación privada con {{ user.email }}</router-link>
</template>