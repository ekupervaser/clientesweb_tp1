<script>
export default {
    name: 'BaseInput',
    props: ['modelValue'],
    emits: ['update:modelValue'],
}
</script>

<template>
    <input 
    class="border border-blue-500 rounded p-1 w-full"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    >
</template>