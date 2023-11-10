<script>
import Loader from '../components/Loader.vue';
import { getUsers } from '../services/user'

export default {
    name: 'UsersList',
    components: { Loader },
    data () {
        return {
            usersLoading: true,
            userList: [],
        }
    },
    async mounted() {
    this.usersLoading = true;
    await this.fetchUsers();
    this.usersLoading = false;
},
methods: {
    async fetchUsers() {
    try {
        const userList = await getUsers();
        this.userList = userList;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
},
},
};
</script>

<template>
    <Loader v-if="usersLoading"></Loader>
    <template v-else>
        <div class="text-center flex flex-col items-center">
            <h1 class="text-3xl font-black mb-4 text-center">Usuarios</h1>
            <p class="mb-2">Listado de usuarios para contactar vía Chat</p>
            <ul class="m-0">
                <li v-for="user in userList"
                class="bg-gray-300 px-10 py-2 my-1 mx-0 rounded">
                    <router-link :to="`/usuario/${user.id}/chat`" class=" ml-1 text-black-600 underline">{{ user.email }}</router-link>
                </li>
            </ul>
        </div>
    </template>
</template> 