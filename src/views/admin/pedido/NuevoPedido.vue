<template>
    <div class="flex h-screen p-4 space-x-4 bg-gray-100">
        <div class="w-2/3 bg-white p-4 rounded shadow overflow-y-auto">
            <h2 class="text-xl font-semibold mb-4">Productos</h2>

            <DataTable
                ref="dt"
                :value="products"
                lazy
                :loading= "loading"
                :totalRecords="totalRecords"
                @page="onPage($event)"
                dataKey="id"
                :paginator="true"
                :rows="5"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords} productos"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Gestionar Productos</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="buscar" placeholder="Buscar..." @keyup.enter="getProductos()"/>
                        </IconField>
                    </div>
                </template>
        
                <Column field="id" header="Id" sortable style="min-width: 1rem"></Column>
                <Column field="nombre" header="Nombre" sortable style="min-width: 8rem"></Column>
                <Column header="IMAGEN">
                    <template #body="slotProps">
                        <Image
                            v-if="slotProps.data.imagen"
                            :src="`http://127.0.0.1:8000/${slotProps.data.imagen}`"
                            :alt="slotProps.data.nombre"
                            class="border-circle"
                            style="width: 64px; height: 64px; object-fit: cover"
                            preview
                        />
                        <p v-else class="text-gray-500 italic text-sm">
                            No hay imagen disponible
                        </p>
                    </template>
                </Column>
                <Column field="precio" header="Precio" sortable style="min-width: 4rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.precio) }}
                    </template>
                </Column>
                <Column field="stock" header="STOCK" sortable style="min-width: 4rem"></Column>
                <Column field="categoria.nombre" header="CATEGORIA" sortable style="min-width:4rem"></Column>
                <Column field="estado" header="ESTADO" sortable style="min-width: 2rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.estado" :severity="getStatusLabel(slotProps.data.estado)" />
                    </template>
                </Column>
                <Column :exportable="false" style="min-width: 8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-plus" rounded class="mr-2" severity="info" @click="funAddCarrito(slotProps.data)" />      
                    </template>
                </Column>
            </DataTable>
        </div>

        <div class="w-1/3 flex flex-col space-y-4">
            <div class="bg-white p-4 rounded shadow overflow-y-auto">
                <h3 class="text-xl font-semibold mb-4">carrito</h3>
                <DataTable :value="carrito">
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="cantidad" header="Cantidad"></Column>
                    <Column field="precio" header="Precio"></Column>
                </DataTable>
            </div>

            <div class="bg-white p-4 rounded shadow">
                <h3 class="text-xl font-semibold mb-4">cliente</h3>
                <Button label="Nuevo Cliente" @click="visibleCliente = true"/>
                <br><br>
                <IconField>
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText v-model="buscar" placeholder="Buscar..." @keyup.enter="getProductos()"/>
                </IconField>
                
            </div>

            <div class="bg-white p-4 rounded shadow">
                <h3 class="text-xl font-semibold mb-4">pedido</h3>
                
                <label for="">Observacion</label><br>
                <TexTarea>

                </TexTarea>
                <br><br>
                <Button label="Generar Pedido" @click="visibleCliente = true"/>
            </div>

        </div>
    </div>

    <Dialog v-model:visible="visibleCliente" modal header="Datos Cliente" :style="{ width: '25rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Cliente.</span>
        <div class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">Nombre</label>
            <InputText id="username" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="email" class="font-semibold w-24">Correo</label>
            <InputText id="email" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancelar" severity="secondary" @click="visibleCliente = false"></Button>
            <Button type="button" label="Guardar" @click="visibleCliente = false"></Button>
        </div>
    </Dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import productoService from '@/services/producto.service'

const products = ref([])
const buscar = ref("")
const loading = ref(false)
const totalRecords = ref(0)
const lazyParams = ref({})
const dt = ref()
const categorias = ref([])
const carrito = ref([])
const visibleCliente = ref(false)

onMounted(() => {
    getProductos()
})

const onPage = (event) => {
    lazyParams.value = event

    getProductos()
}

const getProductos = async () =>{
    loading.value = true
    const respuesta = await productoService.funListar(lazyParams.value.page + 1, lazyParams.value.rows, buscar.value)
    products.value = respuesta.data.data
    totalRecords.value = respuesta.data.total

    loading.value = false

}

const formatCurrency = (value) => {
    if(value)
        return value.toLocaleString('es-ES', {style: 'currency', currency: 'USD'});
    return;
};

const getStatusLabel = (status) => {
    switch (status) {
        case true:
            return 'success';

        case 'LOWSTOCK':
            return 'warn';

        case false:
            return 'danger';

        default:
            return null;
    }
};


const funAddCarrito = (prod) => {
    carrito.value.push({producto_id: prod.di, cantidad: 1, precio: prod.precio, nombre: prod.nombre})
}

</script>