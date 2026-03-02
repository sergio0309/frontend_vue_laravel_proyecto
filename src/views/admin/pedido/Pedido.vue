<template>
    <div class="card">
        <DataTable :value="pedidos" tableStyle="min-width: 50rem">
            <Column field="fecha" header="FECHA"></Column>
            <Column field="cliente" header="CLIENTE">
            
                <template #body="slotProps">
                    <span class="text-surface-500 dark:text-surface-400 block mb-8">CLIENTE: {{ slotProps.data.cliente.nombre_completo }}</span>
                    <span class="text-surface-500 dark:text-surface-400 block mb-8">CI/NIT: {{ slotProps.data.cliente.ci_nit }}</span>
                </template>
                    
            </Column>
            <Column field="observaciones" header="OBSERVACION"></Column>
            <Column field="estado" header="ESTADO"></Column>
            <Column field="productos" header="PRODUCTOS" sortable style="min-width: 6rem">
                <template #body="slotProps">
                    
                    <Button label="Mostrar detalle Pedido" @click="abrirDetallePedido(slotProps.data)" />

                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="visiblePedido" modal header="Detalle Pedido" :style="{ width: '50rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">CLIENTE: {{ pedido.cliente.nombre_completo }}</span>
            <span class="text-surface-500 dark:text-surface-400 block mb-8">CI/NIT: {{ pedido.cliente.ci_nit }}</span>
            <span class="text-surface-500 dark:text-surface-400 block mb-8">CORREO: {{ pedido.cliente.correo }}</span>
            <span class="text-surface-500 dark:text-surface-400 block mb-8">TELEFONO: {{ pedido.cliente.telefono }}</span>
            <div class="flex items-center gap-4 mb-4">
                <DataTable :value="pedido.productos">
                    <Column field="id" header="ID"></Column>
                    <Column field="nombre" header="NOMBRE"></Column>
                    <Column field="pivot.cantidad" header="CANTIDAD"></Column>
                    <Column field="precio" header="Precio"></Column>
                </DataTable>
            </div>
            <template #footer>
                <Button label="Cerrar" text severity="secondary" @click="visiblePedido = false" autofocus />
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import pedidoService from '../../../services/pedido.service';

const pedidos = ref([]);
const pedido = ref({});
const visiblePedido = ref(false)

onMounted(() => {
    getPedidos()
})

const getPedidos = async () => {
    const { data } = await pedidoService.funListar()
    pedidos.value = data.data
}

const abrirDetallePedido = (det_pedido) => {
    pedido.value = det_pedido
    visiblePedido.value = true
}

</script>