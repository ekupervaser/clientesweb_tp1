<script>
import { importCursos } from '../services/courses.js'
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

<div class="container flex flex-col">
    <p class="mb-3 w-3/4 text-center mx-auto">Ya sea que estés buscando mejorar tus habilidades profesionales, explorar nuevos intereses o avanzar en tu carrera, en iLearn tenemos la experiencia y el conocimiento para guiarte.</p>

    <div class="flex gap-5 justify-between mt-3">
            <div v-if="!isLoading" class="bg-white rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-4 flex flex-col justify-between p-4" v-for="course in courses"
            key="course.id"
            >
            <div>
                <div class="text-xl font-bold mb-2">{{ course.name }}</div>
                <div class="text-gray-600">{{ course.description }}</div>
            </div>
                <div class="ml-auto">
                    <p class="bg-slate-200 w-min px-2 rounded font-bold">${{ course.price }}</p>
                </div>
            <!--     <div><img :src="course.image" alt="bla"></div> -->
            </div>
            <div v-else><Loader></Loader></div>
        </div>
    </div>
</template>