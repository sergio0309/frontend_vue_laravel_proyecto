<template>

    <div class="card">
        <Toolbar class="mb-6">
            <template #start>
                <Button label="New" icon="pi pi-plus" class="mr-2" @click="abrirNuevoProducto" />
                <!-- <Button label="Delete" icon="pi pi-trash" severity="danger" variant="outlined" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" /> -->
            </template>
    
            <template #end>
                <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Importar" customUpload chooseLabel="Importar" class="mr-2" auto :chooseButtonProps="{ severity: 'secondary' }" />
                <Button label="Exportar" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
            </template>
        </Toolbar>
    
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
    
            <Column field="id" header="Id" sortable style="min-width: 12rem"></Column>
            <Column field="nombre" header="Nombre" sortable style="min-width: 16rem"></Column>
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
            <Column field="categoria.nombre" header="CATEGORIA" sortable style="min-width: 6rem"></Column>
            <Column field="estado" header="ESTADO" sortable style="min-width: 6rem">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.estado" :severity="getStatusLabel(slotProps.data.estado)" />
                </template>
            </Column>
            <Column :exportable="false" style="min-width: 12rem">
                <template #body="slotProps">
                    <Button icon="pi pi-image" rounded class="mr-2" severity="warn" @click="funOpenSubirImagen(slotProps.data)" />
                    <Button icon="pi pi-pencil" rounded class="mr-2" @click="editProduct(slotProps.data)" />
                    <Button icon="pi pi-trash" rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
    </div>


    <Dialog v-model:visible="visibleDialogImagen" modal header="Actualizar Imagen" :style="{ width: '50rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Sube y actualiza la imagen.</span>
        <FileUpload customUpload @uploader="SubirImagenProducto($event)" :multiple="false" accept="image/*" :maxFileSize="1000000">
            <template #empty>
                <span>Arrastrar y soltar Imagen para subir.</span>
            </template>
        </FileUpload>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
        </div>
    </Dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import productoService from '@/services/producto.service'

const products = ref([])
const producto = ref({})
const buscar = ref("")
const loading = ref(false)
const totalRecords = ref(0)
const lazyParams = ref({})
const visibleDialogImagen = ref(false)
const dt = ref()

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

const funOpenSubirImagen = (prod) => {
    visibleDialogImagen.value = true
    producto.value = prod
    
}

const SubirImagenProducto = async (event) => {

    let formData = new FormData()
    formData.append("imagen", event.files[0])
    await productoService.funSubirImagen(producto.value.id, formData);

    getProductos()
    visibleDialogImagen.value = false
}

const abrirNuevoProducto = () =>{

}
const exportCSV = (evento) => {
    dt.value.exportCSV()
}

const formatCurrency = (value) => {
    if(value)
        return value.toLocaleString('es-ES', {style: 'currency', currency: 'USD'});
    return;
};

const editProduct = (prod) => {
    product.value = {...prod};
    productDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteProductDialog.value = true;
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
</script>