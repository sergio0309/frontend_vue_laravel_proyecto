import Api from './api.service'

export default {

    funListar: function(){
        return Api().get(`/producto`)
    },
    funGuardar: (datos) =>{
        return Api().post(`/producto`, datos)
    },
    mostrar(id){
        return Api().get(`/producto/${id}`)
    },
    funModificar: (id, datos) => {
        return Api().put(`/producto/${id}`, datos)
    },
    funEliminar: (id) => {
        return Api().delete(`producto/${id}`)
    }
}