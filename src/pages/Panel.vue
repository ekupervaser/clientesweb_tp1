<script>
import CoursePanel from '../components/CoursePanel.vue';
import { subscribeToAuth } from "../services/Auth";

export default {
    name: 'Panel',
    components: { CoursePanel },
    data() {
        return {
            isLoading: true, 
            courses: [],
       }
    },
}
    


</script>

<template>
    <div class="max-w-screen-sm flex flex-col justify-center m-auto">
        <h1 class="text-3xl font-black mb-4 text-center">Panel de administración</h1>
    </div>
        <CoursePanel></CoursePanel>
    <div class="flex">
        <router-link class="my-5 py-3 px-3 rounded w-full text-center bg-blue-700 text-white hover:bg-blue-600 disabled:bg-blue-400 active:bg-blue-800 transition" :to="`/cargar-curso`">Cargar nuevo curso</router-link>
    </div>
</template>