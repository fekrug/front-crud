<template>
    <div>
        <div class="card bg-light mb-3 mt-5">
            <div class="card-header text-secondary"><strong>Editar Usuário</strong></div>
            <div class="card-body">
                <div class="form-group"> 
                    <label>Usuario<span  class="text-danger">*</span></label>
                    <input type="text"
                        class="form-control"
                        placeholder="Insira o usuario"
                        :value="userSelected.userNome"
                        @input="userSelected = { propriedade: 'userNome', valor: $event.target.value}">
                </div>
                <div class="form-group">
                    <label>Email<span  class="text-danger">*</span></label>
                    <input type="email"
                        class="form-control"
                        placeholder="Insira o Email"
                        :value="userSelected.userEmail"
                        @input="userSelected = { propriedade: 'userEmail', valor: $event.target.value}">
                </div>
                <button @click="saveUser" class="btn btn-primary float-right">Salvar</button>
                <button @click="cancel" class="btn btn-link float-right mr-3">Cancelar</button>
            </div>
        </div>
    </div>
</template>
<script>
import { eventBus } from './../main'
export default {
    props: {
        user: {
            type:Object
        }
    },
    data() {
        return {
            userLocal: this.user
        }
    },
    computed: {
        userSelected: {
            set(dados) {
                this.userLocal = Object.assign(
                    {'index': this.userLocal.length},
                    this.userLocal,
                    { [dados.propriedade]: dados.valor}
                )
            },
            get() {
                return this.userLocal = this.user
            }
        }
    },
    methods: {
        saveUser(event) {
            eventBus.updateUser(this.userLocal)
        },
        cancel(event) {
            this.$emit('cancel', this.userLocal)
        }
    },
   created() {
       eventBus.$on('selectUser', (selectedUser) => {
           console.log('sel',selectedUser)
           this.userSelected = selectedUser
           
       })
   }
}
</script>
