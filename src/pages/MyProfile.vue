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
    <h1 class="text-3xl font-black mb-4 text-center">Mi perfil</h1>

    <div>
        <p class="font-bold">Email</p>
        <p>{{ user.email }}</p>
    </div>
</template>
