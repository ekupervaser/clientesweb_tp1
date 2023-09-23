<script>
import Loader from './Loader.vue';

export default {
    name: 'BaseButton',
    components: { Loader },
    props: {
        loading: {
            type: Boolean,
            default: false,
        }
    },
}
</script>

<template>
    <button class="my-3 py-1 px-3 rounded w-full bg-blue-700 text-white hover:bg-blue-600 disabled:bg-blue-400 active:bg-blue-800 transition" type="submit" 
    :disabled="loading"
    >

        <template v-if="!loading">
            <slot>Enviar</slot>
        </template>
        <template v-else>
            <Loader></Loader>
        </template>
    </button>
</template>