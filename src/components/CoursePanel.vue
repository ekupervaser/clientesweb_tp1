<script>
import { importCursos } from '../services/courses.js'
import { deleteCourse } from '../services/panel.js'
import Loader from './Loader.vue';

export default {
    name: "CoursePanel",
    data() {
        return {
            isLoading: true,
            courses: [],
        };
    },
    methods: {
    eliminarCurso(cursoId) {
      deleteCourse(cursoId)
        .then(() => {
        })
        .catch((error) => {
        });
    },
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
  <div class="container flex flex-col" v-if="!isLoading">
    <div class="container mx-auto">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="px-6 py-3 bg-gray-300 text-left">Nombre</th>
              <th class="px-6 py-3 bg-gray-300 text-left">Descripción</th>
              <th class="px-6 py-3 bg-gray-300 text-left">Precio</th>
              <th class="px-6 py-3 bg-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in courses">
              <td class="border px-6 py-4">{{course.name}}</td>
              <td class="border px-6 py-4">{{course.description}}</td>
              <td class="border px-6 py-4">${{course.price}}</td>
              <td class="border px-6 py-4">
                <button @click="eliminarCurso(course.id)" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="text-center" v-else><Loader></Loader></div>
</template>