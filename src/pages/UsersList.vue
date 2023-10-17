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
        <div>
            <h1>Listado de Usuarios</h1>
            <ul>
                <li v-for="user in userList">
                    <router-link :to="`/usuario/${user.id}`" class=" ml-1 text-blue-600 underline">{{ user.email }}</router-link>
                </li>
            </ul>
        </div>
    </template>

</template> 