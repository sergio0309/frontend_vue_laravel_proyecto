<template>
    <!-- HERO -->
    <section class="bg-blue-200 py-12 text-center">
      <div class="container mx-auto">
        <h1 class="text-4xl font-bold">
          Bienvenido a nuestra Tienda Online
        </h1>
        <p class="mt-4 text-lg">
          Encuentra los mejores productos a buenos precios
        </p>
      </div>
    </section>

    <!-- PRODUCTOS -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-8">
          Productos destacados
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white shadow-lg rounded-md overflow-hidden" v-for="i in 6" :key="i">
            <Image src="https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/13-laptop-platinum-right-render-fy25:VP4-1260x795?fmt=png-alpha"
            alt="Image"
            />
            <div class="p-4">
              <h3 class="text-xl font-semibold">Producto 1</h3>
              <p class="text-gray-600 mt-2">2550 USD</p>
              <button
                class="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
</template>

<script setup>
import Image from 'primevue/image';
</script>