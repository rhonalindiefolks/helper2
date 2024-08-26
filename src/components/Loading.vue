<template>
    <div class="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Loading',
});
</script>

<style scoped>
/* Aquí puedes agregar estilos adicionales si es necesario */
</style>