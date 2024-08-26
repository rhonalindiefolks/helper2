<script setup>
import { ref, watch } from 'vue'

import ItemTeam from './ItemTeam.vue'

const props = defineProps({ teams: { type: Array, required: true } })

const items = ref([])
const selected = ref(false)

const emit = defineEmits(['selectedItems'])

const handleSelectAll = () => {
  for (let team of items.value) {
    team.selected = !selected.value
  }
}

watch(
  () => props.teams,
  (newTeams) => {
    items.value = newTeams.map((team) => ({ ...team, selected: false }))
  },
  { deep: true }
)

watch(
  () => items,
  (nItems) => {
    console.log(nItems.value)
    emit(
      'selectedItems',
      nItems.value.filter((team) => team.selected)
    )
  },
  { deep: true }
)
</script>

<template>
  <div class="bg-white overflow-auto text-sm max-h-[200px]">
    <div class="flex-grow">
      <table class="min-w-full bg-white border border-gray-300 max-h-[400px] rounded-md">
        <thead>
          <tr class="bg-gray-200 text-gray-600 text-left">
            <th class="py-2 px-2 border-b text-center">
              <input type="checkbox" v-model="selected" @click="handleSelectAll" />
            </th>
            <th class="py-2 px-4 border-b">ID</th>
            <th class="py-2 px-4 border-b">Nombre</th>
            <th class="py-2 px-4 border-b">Género</th>
          </tr>
        </thead>
        <tbody>
          <ItemTeam v-for="team in items" :key="team.id" :team="team" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
