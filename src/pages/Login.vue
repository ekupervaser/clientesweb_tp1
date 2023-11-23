<script setup>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseInput from '../components/BaseInput.vue';
import { login } from '../services/Auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const loginLoading = ref(false);
const form = ref({
    email: '',
    password: '',
});

const doLogin = async () => {
    try {
        loginLoading.value = true;
        await login({
            ...form.value,
        });

        router.push('/');
    } catch (error) {
        // Manejar el mensaje de error
    }
    loginLoading.value = false;
}

</script>

<template>
    <div class="max-w-screen-sm flex flex-col justify-center m-auto">
        <h1 class="text-3xl font-black mb-4">Iniciar sesión</h1>
        <form action="#"
        @submit.prevent="doLogin"
        >
            <div>
                <BaseLabel for="email">Email</BaseLabel>
                <BaseInput
                :disabled="loginLoading"
                type="email" 
                id="email"
                v-model="form.email"
                />
            </div>
            <div>
                <BaseLabel for="password">Contraseña</BaseLabel>
                <BaseInput 
                :disabled="loginLoading"
                type="password" 
                id="password"
                v-model="form.password"
                />
            </div>
            <BaseButton :loading="loginLoading">Iniciar sesión</BaseButton>
        </form>
     </div>
</template>