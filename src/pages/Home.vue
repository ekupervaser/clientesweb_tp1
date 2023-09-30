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
     
     <div class="mt-5"><CourseCards></CourseCards></div>

</template>