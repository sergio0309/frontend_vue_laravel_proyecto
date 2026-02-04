<template>

  <button @click="obtenerPublicaciones">Obtener datos</button><br><br>

  <table border="1">
    <thead>
      <tr>
        <th>ID</th>
        <th>TÍTULO</th>
        <th>DESCRIPCIÓN</th>
        <th>IMAGEN</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="publi in publicaciones">
        <td>{{ publi.id }}</td>
        <td>{{ publi.title }}</td>
        <td>{{ publi.description }}</td>
        <td>
          <img :src="publi.cover_image" alt="imagen" width="150" />
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Solo para depuración -->
  <!-- {{ publicaciones }} -->
</template>

<script setup>
import { onMounted, ref } from 'vue'

// variable reactiva
const publicaciones = ref([])

// onMounted
onMounted(() => {
  // obtenerPublicaciones()
})

// funciones
function obtenerPublicaciones() {
  fetch('https://dev.to/api/articles')
    .then(response => response.json())
    .then(json => {
      publicaciones.value = json
    })
}
</script>

<style scoped>
</style>
