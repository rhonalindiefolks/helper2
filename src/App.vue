<script setup>
import { ref, onMounted } from 'vue'
import OrganizerForm from './components/OrganizerForm.vue'
import Tournaments from './components/Tournaments.vue'

import { getTournament } from './service.js'

const data = ref()

function isDataValid(timestamp) {
  const oneDay = 24 * 60 * 60 * 1000 // Milliseconds in one day
  const now = new Date().getTime()
  return now - timestamp < oneDay
}

const handleFormSubmit = (formData) => {
  data.value = formData

  const timestamp = new Date().getTime()
  localStorage.setItem('user', JSON.stringify(formData.user))
  localStorage.setItem('timestamp', timestamp.toString())
}

onMounted(async () => {
  let user = localStorage.getItem('user')
  const savedTimestamp = localStorage.getItem('timestamp')

  if (user && savedTimestamp && isDataValid(parseInt(savedTimestamp))) {
    user = JSON.parse(user)
    try {
      const tournaments = await getTournament(user.slug, user.token.accessToken)
      data.value = { user, tournaments }
    } catch (error) {
      data.value = null
      console.error(error)
    }
  }
})
</script>

<template>
  <main>
    <div class="flex h-screem mt-4 ml-4">
      <div class="w-1/4">
        <OrganizerForm class="px-5" @submitForm="handleFormSubmit" />
      </div>

      <div class="w-3/4">
        <div class="ml-4" v-if="data">
          <Tournaments :tournaments="data.tournaments" :user="data.user" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
