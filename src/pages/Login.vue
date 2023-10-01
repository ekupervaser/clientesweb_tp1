<script>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseInput from '../components/BaseInput.vue';
import { login } from '../services/Auth';

export default {
    name: 'Login',
    components: { BaseButton, BaseLabel, BaseInput },
    emits: ['logged'],
    data() {
        return {
            isLoading: false,
            form: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        doLogin() {
            this.isLoading = true;

            login({
                ...this.form,
            })
            .then(user => {
                this.$emit('logged', {...user});
            })
            .finally(() => {
                this.isLoading = false;
            });
        }
    }
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
                type="email" 
                id="email"
                v-model="form.email"
                />
            </div>
            <div>
                <BaseLabel for="password">Contraseña</BaseLabel>
                <BaseInput 
                type="password" 
                id="password"
                v-model="form.password"
                />
            </div>
            <BaseButton>Iniciar sesión</BaseButton>
        </form>
     </div>
</template>