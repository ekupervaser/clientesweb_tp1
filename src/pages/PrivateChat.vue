<script>
import BaseButton from '../components/BaseButton.vue';
import BaseTextarea from '../components/BaseTextarea.vue';
import Loader from '../components/Loader.vue';
import { getUserProfileById } from '../services/user';

export default {
    name: 'PrivateChat',
    components: { Loader, BaseTextarea, BaseButton },
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
            <h1 class="text-3xl font-black mb-4 text-center">Conversación con {{ user.email }}</h1>

            <h2 class="sr-only">Mensajes</h2>
            <div class="min-h-[400px] p-4 mb-4 border border-gray-300 rounded">

            </div>

            <h2 class="sr-only">Enviar mensajes</h2>
            <form 
            class="flex gap-2"
                action=""
                @submit.prevent="()=>{}"
                >

                <label for="message" class="sr-only"></label>
                <BaseTextarea
                id="message"
                class="w-11/12"
                />

                <BaseButton class="w-1/12">Enviar</BaseButton>

            </form>
        </template>
</template>