<script>
import CourseCards from '../components/CourseCards.vue'
export default {
     name: 'Home',
     components: { CourseCards },
}

</script>

<template>
     <h1 class="text-3xl font-black mb-4">iLearn</h1>
     <p>Únete a la Revolución del Aprendizaje con <strong>iLearn</strong></p>
     
     <div><CourseCards></CourseCards></div>

</template>