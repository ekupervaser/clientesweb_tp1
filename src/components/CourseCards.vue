<script>
import { importCursos } from '../services/cursos.js'
import Loader from './Loader.vue';

export default {
    name: "CourseCards",
    data() {
        return {
            isLoading: true,
            courses: [],
        };
    },
    mounted() {
        this.isLoading = true;
        importCursos(courses => {
            this.courses = courses;
            this.isLoading = false;
        });
    },
    components: { Loader }
};
</script>

<template>
    <h2 class="text-3xl font-black mb-4">Una nueva generación de cursos</h2>

    <p class="mb-3">Ya sea que estés buscando mejorar tus habilidades profesionales, explorar nuevos intereses o avanzar en tu carrera, en iLearn tenemos la experiencia y el conocimiento para guiarte.</p>

    <div class="flex gap-5 justify-between">
        <div>
            <div v-if="!isLoading" class="mb-3" v-for="course in courses"
            key="message.id"
            >
                <div><b>Nombre:</b> {{ course.name }}</div>
                <div><b>Descripción:</b> {{ course.description }}</div>
            </div>
            <div v-else><Loader></Loader></div>
        </div>
    </div>
</template>