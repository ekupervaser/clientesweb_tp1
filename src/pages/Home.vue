<script>
import Cursos from '../components/Cursos.vue'
     export default {
          name: 'Home',
          components: { Cursos },
     }

</script>

<template>
     <h1 class="text-3xl font-black mb-4">iLearn</h1>
     <p>Únete a la Revolución del Aprendizaje con <strong>iLearn</strong></p>
     
     <Cursos></Cursos>

</template>