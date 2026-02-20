<template>
  <div class="card relative min-h-[200px]">

    <!-- Spinner -->
    <div
      v-if="cargando"
      class="absolute inset-0 flex items-center justify-center bg-white/70 z-10"
    >
      <ProgressSpinner
        style="width:50px;height:50px"
        strokeWidth="8"
        fill="transparent"
        animationDuration=".5s"
      />
    </div>

    <h6 class="mb-2">Tailwindcss</h6>

    <table class="min-w-full table-auto border-collapse">
      <thead>
        <tr class="bg-blue-500 text-white">
          <th class="px-4 py-2 border border-gray-300">ID</th>
          <th class="px-4 py-2 border border-gray-300">NOMBRE</th>
          <th class="px-4 py-2 border border-gray-300">CORREO</th>
          <th class="px-4 py-2 border border-gray-300">CREADO EN</th>
          <th class="px-4 py-2 border border-gray-300">ACCION</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in usuarios" :key="user.id" class="odd:bg-gray-100">
          <td class="px-4 py-2 border border-gray-300">{{ user.id }}</td>
          <td class="px-4 py-2 border border-gray-300">{{ user.name }}</td>
          <td class="px-4 py-2 border border-gray-300">{{ user.email }}</td>
          <td class="px-4 py-2 border border-gray-300">{{ user.created_at }}</td>
          <td class="px-4 py-2 border border-gray-300">
            <button class="bg-yellow-500 px-2 py-2 rounded-full text-white">Editar</button>
            <button class="bg-red-500 px-2 py-2 rounded-full text-white">
              <i class="pi pi-times"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="card mt-6">
    <h5>Prime Vue</h5>
    <DataTable :value="usuarios" tableStyle="min-width: 50rem">
      <Column field="id" header="id" />
      <Column field="name" header="Nombre" />
      <Column field="email" header="Correo" />
      <Column field="created_at" header="Creado en" />
    </DataTable>
  </div>
</template>

<script setup>

// import ProgressSpinner from 'primevue/progressspinner';
import { onMounted, ref } from 'vue'; 
import userService from '../../../services/user.service';

    const cargando = ref(true)
    const usuarios = ref([])

    onMounted(()=>{
        funListarUsuarios()
    })
    async function funListarUsuarios(){
        cargando.value = true
        const { data } = await userService.getUsuarios()
        usuarios.value = data
        cargando.value = false
    }
</script>