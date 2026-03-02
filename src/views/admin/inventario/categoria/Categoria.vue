<template>
    <div class="card">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent"
            animationDuration=".5s" aria-label="Custom ProgressSpinner" v-if="cargando"/>

        <Button label="Nueva Categoria" @click="funNuevoCategoria()"></Button>

        <DataTable :value="categorias" tableStyle="min-width: 50rem">
            <Column field="id" header="ID"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="detalle" header="Detalle"></Column>
            <Column header="Estado">
                <template #body="slotProps">
                    <Tag severity="success" value="ACTIVO" v-if="slotProps.data.estado"></Tag>
                    <Tag severity="danger" value="INACTIVO" v-else></Tag>
                </template>
            </Column>
            <Column :exportable="false" style="min-width: 12rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" rounded class="mr-2" @click="editarCategoria(slotProps.data)" v-if="slotProps.data.estado"/>
                    <Button icon="pi pi-lock  " rounded severity="danger" @click="confirmarEliminacionCategoria(slotProps.data)" />
                </template>
            </Column>
        </DataTable>

        <!-- <Button label="Show" @click="visible = true" /> -->
        <Dialog v-model:visible="visibleCatgoria" modal header="Eliminar Categoria" :style="{ width: '25rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Informacion de categoria</span>
            <div class="flex items-center gap-4 mb-4">
                <label for="username" class="font-semibold w-24">Nombre</label>
                <InputText id="username" class="flex-auto" autocomplete="off" v-model="categoria.nombre"/>
            </div>
            <div class="flex items-center gap-4 mb-8">
                <label for="email" class="font-semibold w-24">Detalle</label>
                <InputText id="email" class="flex-auto" autocomplete="off" v-model="categoria.detalle"/>
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancelar" severity="secondary" @click="visibleCatgoria = false"></Button>
                <Button type="button" label="Guardar" @click="funGuardar()"></Button>
            </div>
        </Dialog>

        <!-- <Button label="Show" @click="visible = true" /> -->
        <Dialog v-model:visible="visibleDelete" modal header="Eliminar Categoria" :style="{ width: '25rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">¿Esta Seguro de Elimnar la Categoria?</span>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancelar" severity="secondary" @click="visibleCatgoria = false"></Button>
                <Button type="button" label="Eliminar" severity="danger" @click="eliminarCategoria()"></Button>
            </div>
        </Dialog>


    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import categoriaService from '@/services/categoria.service';
import Swal from 'sweetalert2';

const categorias = ref([]);
const cargando = ref(false);
const categoria = ref({});
const visibleCatgoria = ref(false)
const visibleDelete = ref(false)

onMounted(() => {
    obtenerCategorias()
})

const obtenerCategorias = async() =>{
    cargando.value = true
    const { data }= await categoriaService.funListar()
    categorias.value = data
    cargando.value = false
}
const editarCategoria = (cat) =>{
    categoria.value = cat
    visibleCatgoria.value = true
}
const confirmarEliminacionCategoria = (cat) =>{
    categoria.value = cat
    visibleDelete.value = true

}

const funNuevoCategoria = () =>{
    categoria.value = { }
    visibleCatgoria.value = true
}

const funGuardar = async () =>{
    try {
        if(categoria.value.id){
            
            const { data } = await categoriaService.funModificar(categoria.value.id, categoria.value);
            visibleCatgoria.value = false
            obtenerCategorias();
            Swal.fire({
                title: "Categoria Actualizada!",
                text: "Confirme para continuar!",
                icon: "success"
            });

        } else{
            const { data } = await categoriaService.funGuardar(categoria.value);
            visibleCatgoria.value = false
            obtenerCategorias();
            Swal.fire({
                title: "Categoria Registrada!",
                text: "Confirme para continuar!",
                icon: "success"
            });
        }
    } catch (error) {
        Swal.fire({
            title: "Problemas al registrar!",
            text: "Confirme para continuar!",
            icon: "success"
        });
    }
}

const eliminarCategoria = async () => {
    const { data } = await categoriaService.funEliminar(categoria.value.id);
    visibleDelete.value = false
    obtenerCategorias();
}

</script>