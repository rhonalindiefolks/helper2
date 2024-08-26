<script setup>
import { ref, computed } from 'vue';

import TeamTable from './TeamTable.vue';
import Loading from './Loading.vue';

import _teams from './../data/teams.json';
import { createTeam } from '@/service';

const { tournaments, user } = defineProps({ tournaments: Array, user: Object })

const nteams = ref(0)
const selectedTournamentId = ref(null)
const selectCategoryId = ref(null)
const isLoading = ref(false);
const logs = ref([]);

const playersSelect = ref([])

const selectedTournament = computed(() => {
  return tournaments.find((tournament) => tournament.id === selectedTournamentId.value)
})

const teams = computed(() => {
  if (!selectCategoryId) {
    return []
  }

  const filters = []

  for (let team of _teams) {
    team.selected = false
    if (team.categoryId === selectCategoryId?.value) {
      filters.push(team)
    }
  }

  return filters
})

/**
 * Genera pares únicos de elementos sin reutilizar identificadores y excluyendo ciertos IDs.
 * @param {Array} items - Array de elementos para formar los pares.
 * @param {number} m - Número de pares a generar.
 * @param {Array} ignoreIds - Array de IDs a ignorar.
 * @returns {Array} Array de pares generados.
 */
const generatePairs = (items, m, ignoreIds = []) => {
  const n = items.length
  if (m > (n * (n - 1)) / 2) {
    throw new Error('The number of requested pairs exceeds the possible number of combinations.')
  }

  const allPairs = []
  const usedIds = new Set(ignoreIds)

  for (let i = 0; i < items.length; i++) {
    if (usedIds.has(items[i])) continue
    for (let j = i + 1; j < items.length; j++) {
      if (usedIds.has(items[j])) continue
      allPairs.push([items[i], items[j]])
    }
  }

  const selectedPairs = []
  while (selectedPairs.length < m && allPairs.length > 0) {
    const index = Math.floor(Math.random() * allPairs.length)
    const [item1, item2] = allPairs.splice(index, 1)[0]

    if (!usedIds.has(item1) && !usedIds.has(item2)) {
      selectedPairs.push([item1, item2])
      usedIds.add(item1)
      usedIds.add(item2)
    }
  }

  return selectedPairs
}

/**
 *
 */
const handleRegisterTeams = () => {
  const categoryId = selectCategoryId.value
  const tournamentId = selectedTournamentId.value
  const palyers = playersSelect.value.map((d) => d.id)
  const _teams = generatePairs(palyers, nteams.value)

  generateTeams(_teams, {
    categoryId,
    tournamentId,
    slug: user.slug,
    accessToken: user.token.accessToken
  })
}

/**
 *
 */
const generateTeams = (_teams, { categoryId, slug, tournamentId, accessToken }) => {
  const process = async () => {
    let well = 0, faild = 0;
    for (let team of _teams) {
      try {
        let data = JSON.stringify({
          status: 'accept',
          playerAId: team[1],
          playerBId: team[0],
          categoryId: categoryId
        })

        await createTeam(data, slug, tournamentId, accessToken);
        well++;
      } catch (error) {
        faild++;
        console.error('Error registrando equipos:', error.response)
      }
    }
    logs.value.push(`CATEGORIA ${selectCategoryId?.value} --> CORRECTAMENTE ${well} EQUIPOS Y FALLARON ${faild}`);
  }

  isLoading.value = true;

  process().then(() => {
    isLoading.value = false;
  })
}

const handleSelectedItems = (items) => {
  playersSelect.value = items
}
</script>

<template>
  <div class="w-full p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Torneo</h2>
    <Loading v-if="isLoading" />

    <select v-model="selectedTournamentId" class="p-2 mb-4 border border-gray-300 rounded-md">
      <option disabled>Selecciona un torneo</option>
      <option v-for="tournament in tournaments" :key="tournament.id" :value="tournament.id">
        {{ tournament.name }} {{ tournament.status }}
      </option>
    </select>

    <div v-if="selectedTournament" class="mt-4">
      <h3 class="text-xl font-semibold text-gray-800">{{ selectedTournament.name }}</h3>
      <p class="text-gray-700">
        {{ selectedTournament.status }} - {{ selectedTournament.description }}
      </p>

      <div class="mt-6">
        <h4 class="text-lg font-medium text-gray-700 mb-2">Categorías:</h4>
        <select class="p-2 mb-4 border border-gray-300 rounded-md" v-model="selectCategoryId">
          <option v-for="category in selectedTournament.categories" :key="category.id" :value="category.category.id">
            {{ category.category.gender }} # {{ category.category.name }}
          </option>
        </select>
        <TeamTable :teams="teams" @selectedItems="handleSelectedItems" />
      </div>
    </div>

    <div class="mt-4 text-sm">
      <input v-model="nteams" type="number" class="border mt-4 border-gray-300 rounded-md p-2 mr-3"
        placeholder="Numero de equipos a inscribir" />
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="handleRegisterTeams">
        procesar
      </button>
      <p class="mt-4 text-gray-500">Nota: {{ playersSelect.length }} equipos seleccionados.</p>
    </div>

    <div class="mt-2">
      <lu class="text-sm">
        <li v-for="log in logs" :key="log">{{ log }}</li>
      </lu>
    </div>

  </div>
</template>

<style scoped></style>
