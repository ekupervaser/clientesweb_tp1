<script>
import CourseCards from '../components/CourseCards.vue'
export default {
     name: 'Home',
     components: { CourseCards },
}

</script>

<template>
     <h1 class="text-3xl font-black mb-4 text-center">iLearn</h1>
     <p class="text-xl text-center">Únete a la Revolución del Aprendizaje con <strong>iLearn</strong></p>
     <p class="mb-3 mt-2 w-3/4 text-center mx-auto">Ya sea que estés buscando mejorar tus habilidades profesionales, explorar nuevos intereses o avanzar en tu carrera, en iLearn tenemos la experiencia y el conocimiento para guiarte.</p>

     <div class="flex justify-center">
          <button class="my-3 py-1 px-3 rounded w-1/5 mx-auto bg-blue-700 text-white hover:bg-blue-600 disabled:bg-blue-400 active:bg-blue-800 transition">
               <router-link
               :to="`/cursos`"
               >Ver cursos
          </router-link>
          </button>
     </div>

     <div class="container">
          <img src="/banner.jpg" alt="Banner">
     </div>
</template>