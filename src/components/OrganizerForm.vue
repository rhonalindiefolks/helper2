<script setup>
import { ref } from 'vue'
import { defineEmits } from 'vue'
import { getTournament, login } from '@/service'

const emit = defineEmits(['submitForm'])

const organizador = ref({
  email: 'cordoba@yopmail.com',
  password: 'Cordoba#1234',
  slug: 'cordoba-flow'
})

const handleSubmit = async () => {
  try {
    const user = await login(organizador.value)
    const tournaments = await getTournament(organizador.value.slug, user.token.accessToken)
    user.slug = organizador.value.slug

    emit('submitForm', { user, tournaments })
  } catch (error) {
    alert('Error al iniciar sesión')
    console.error('Error handling form submission:', error)
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
        <input
          v-model="organizador.email"
          type="email"
          id="email"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Contraseña:</label>
        <input
          v-model="organizador.password"
          type="password"
          id="password"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="slug" class="block text-sm font-medium text-gray-700">Slug:</label>
        <input
          v-model="organizador.slug"
          type="text"
          id="slug"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Enviar
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
