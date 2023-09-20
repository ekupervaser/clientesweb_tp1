<script>
     export default {
          name: 'Login',
     }
</script>

<template>
     <h1 class="text-3xl font-black mb-4">Iniciar sesión</h1>

     <form action="#">
        <div>
            <label for="email">Email</label>
            <input 
            type="email" 
            id="email">
        </div>
        <div>
            <label for="password">Contraseña</label>
            <input 
            type="password" 
            id="password">
        </div>
        <button type="submit">Ingresar</button>
     </form>
</template>