<script>
import BaseButton from '../components/BaseButton.vue';
import CoursePanel from '../components/CoursePanel.vue';

export default {
    name: 'Panel',
    components: { CoursePanel, BaseButton },
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

        <div class="m-auto">
            <router-link class="bg-slate-300 p-3 rounded-lg m-3" :to="`/admin-cursos`">Administrar cursos</router-link>

            <button class="bg-slate-300 p-3 rounded-lg m-3">Ver cursos por usuario</button>
        </div>

    </div>
</template>