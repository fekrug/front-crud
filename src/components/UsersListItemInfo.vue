<template>
  <div>
    <div class="card bg-light mb-3 mt-5">
      <div class="card-header text-secondary">
        <strong>Usuário Selecionado</strong>
      </div>

      <div class="card-body" v-if="user">
        <h5 class="card-title">{{user.userNome}}</h5>
        <p class="font-weight-normal">
          <strong>Email:</strong>
          {{user.userEmail}}
        </p>
        <br>
        <button @click="editar" class="btn btn-primary">Editar</button>
        <button @click="excluir" class="btn btn-danger ml-2 float-right">Excluir</button>
        <button @click="cancel" class="btn btn-light">Cancelar</button>
      </div>

      <div v-else class="m-4">Nenhum usuário selectionado</div>
    </div>
    <button @click="inserir" class="btn btn-primary center-block">Adicionar Novo Usuário</button>
  </div>
</template>

<script>
import { eventBus } from "./../main";

export default {
  props: {
    users: {
      type: Object
    }
  },
  data() {
    return {
      user: undefined
    };
  },
  created() {
    eventBus.$on("selectUser", selectedUser => {
      console.log("sellluser");
      this.user = selectedUser;
    });
  },
  methods: {
    inserir(event) {
      eventBus.selectNew({ insert: true });
      this.user = undefined;
    },
    editar(event) {
      this.$emit("editUser", this.user);
      this.user = undefined;
    },
    excluir(event) {
      if (confirm("Deseja realmente excluir?")) {
        this.$emit("excluir", this.user);
        this.user = undefined;
      }
    },
    cancel(event) {
      this.user = undefined;
    }
  }
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
