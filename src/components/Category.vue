<script setup>
import _teams from './../data/teams.json'

const { category } = defineProps({ category: { type: Object } })
</script>

<template>
  <div class="p-4 bg-gray-100 rounded-lg shadow-sm">
    <h5 class="text-lg font-semibold text-gray-800">{{ category.category.name }}</h5>
    <p class="text-gray-600">Género: {{ category.category.gender }}</p>
  </div>
</template>

<style scoped></style>
