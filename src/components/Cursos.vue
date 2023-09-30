<script>
import { importCursos } from '../services/cursos.js'


export default {
    name: "Cursos",
    data() {
        return {
            courses: [],
        }
    },
    mounted() {
        importCursos(data => {
            this.courses = data;
        });
    },
};
</script>

<template>
    <h2 class="text-3xl font-black mb-4">TP 1</h2>

    <p class="mb-3">Ya sea que estés buscando mejorar tus habilidades profesionales, explorar nuevos intereses o avanzar en tu carrera, en iLearn tenemos la experiencia y el conocimiento para guiarte.</p>

    <div class="flex gap-5 justify-between">

        <div>
            <div>
                <div class="mb-3" v-for="course in courses"
                key="message.id"
                >
                    <div><b>Nombre:</b> {{ course.name }}</div>
                    <div><b>Descripción:</b> {{ course.description }}</div>
                </div>
            </div>
     <!--    <div v-else><Loader /></div> -->
    </div>
</div>
</template>