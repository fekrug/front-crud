<template>
  <div>
    <div class="card bg-light mb-3 mt-5">
      <div class="card-header text-secondary">
        <strong>Inserir Usuário</strong>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label>Usuario
            <span class="text-danger">*</span>
          </label>
          <input
            type="text"
            v-model="name"
            class="form-control"
            :class="{'is-invalid': attemptSubmit && missingName}"
            placeholder="Insira o usuario"
            @input="userInserted = { propriedade: 'userNome', valor: $event.target.value}"
          >
          <small v-if="attemptSubmit && missingName" class="text-danger">Nome inválido</small>
        </div>
        <div class="form-group">
          <label>Email
            <span class="text-danger">*</span>
          </label>
          <input
            type="text"
            v-model="email"
            class="form-control"
            :class="{'is-invalid': isInvalid}"
            placeholder="Insira o Email"
            @input="userInserted = { propriedade: 'userEmail', valor: $event.target.value}"
          >
          <small
            v-if="attemptSubmit && (missingEmail || !validEmail)"
            class="text-danger"
          >Email inválido</small>
          <small v-else-if="attemptSubmit && emailExist" class="text-danger">Email já cadastrado</small>
        </div>
        <button @click="saveUser" class="btn btn-primary float-right">Salvar</button>
        <button @click="cancel" class="btn btn-link float-right mr-3">Cancelar</button>
      </div>
    </div>
  </div>
</template>
<script>
import { eventBus } from "./../main";
export default {
  props: {
    users: { type: Array }
  },
  data() {
    return {
      attemptSubmit: false,
      emailValid: false,
      emailExist: false,
      name: "",
      email: "",
      userLocal: null,
      invalid: false
    };
  },
  computed: {
    isInvalid() {
      if (this.attemptSubmit && this.missingEmail) {
        return true;
      } else if (this.attemptSubmit && (this.emailExists || !this.validEmail)) {
        return true;
      }
      return false;
    },
    missingName() {
      return this.name === "";
    },
    missingEmail() {
      return this.email === "";
    },
    emailExists() {
      return (this.emailExist =
        this.users.findIndex(user => user.userEmail === this.email) === -1
          ? false
          : true);
    },
    validEmail() {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return (this.emailValid = re.test(this.email));
    },
    userInserted: {
      set(dados) {
        console.log("daff", dados);
        this.userLocal = Object.assign(
          { index: this.users.length + 1 },
          this.userLocal,
          { [dados.propriedade]: dados.valor }
        );
      },
      get() {
        return this.userLocal;
      }
    }
  },
  methods: {
    checkForm(e) {
      this.attemptSubmit = true;
      return (
        !this.missingName &&
        !this.missingEmail &&
        this.validEmail &&
        !this.emailExists
      );
    },
    saveUser(event) {
      if (this.checkForm()) eventBus.addUser(this.userLocal);
    },
    cancel() {
      eventBus.cancel();
    }
  }
};
</script>