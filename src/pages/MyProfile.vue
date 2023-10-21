<script>

import { subscribeToAuth } from '../services/auth'

export default {
    name: 'MyProfile',
    data() {
        return {
            user: {
                id: null,
                email: null,
            }
        }
    },
    mounted() {
        subscribeToAuth(user => {
            this.user = {...user};
        });
    }
}
</script>

<template>
    <div class="flex flex-col items-center">
        <h1 class="text-3xl font-black mb-4 text-center">Mi perfil</h1>

        <div>
            <img src="../../public/user.png" alt="" class="max-w-[150px]">
        </div>

        <div class="mt-5">
            <p class="font-bold">Email</p>
            <p>{{ user.email }}</p>
        </div>
    </div>
</template>
