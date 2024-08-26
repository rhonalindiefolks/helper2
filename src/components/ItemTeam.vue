<script setup>
import { ref, computed } from 'vue'

const { team } = defineProps({ team: { type: Object, required: true } })

const truncatedId = computed(() => {
  const id = team.id.toString()
  const length = 6
  return id.length > length ? id.slice(0, length) : id
})
</script>

<template>
  <tr>
    <td class="py-2 px-2 border-b text-center">
      <input type="checkbox" v-model="team.selected" />
    </td>
    <td class="py-1 px-2 border-b">{{ truncatedId }}</td>
    <td class="py-1 px-2 border-b">{{ team.firstName }} {{ team.lastName }}</td>
    <td class="py-1 px-2 border-b">{{ team.gender }}</td>
  </tr>
</template>

<style scoped></style>
