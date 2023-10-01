<script>
import BaseButton from '../components/BaseButton.vue'
import BaseLabel from '../components/BaseLabel.vue';
import BaseInput from '../components/BaseInput.vue';

     export default {
    name: 'Register',
    components: { BaseButton, BaseLabel, BaseInput }
}
</script>

<template>
    <div class="max-w-screen-sm flex flex-col justify-center m-auto">
        <h1 class="text-3xl font-black mb-4">Crear cuenta</h1>
        <form action="#">
            <div>
                <BaseLabel for="email">Email</BaseLabel>
                <BaseInput 
                type="email" 
                id="email"/>
            </div>
            <div>
                <BaseLabel for="password">Contraseña</BaseLabel>
                <BaseInput 
                type="password" 
                id="password"/>
            </div>
            <BaseButton>Registrarme</BaseButton>
        </form>
     </div>
</template>