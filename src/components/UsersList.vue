<template>
  <div class="row">
    <div class="col-8">
      <h3>Lista de Usuários</h3>
      <div class="list-group">
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th class="text-secondary">#</th>
              <th class="text-secondary">Nome</th>
              <th class="text-secondary">Email</th>
              <th class="text-secondary"></th>
            </tr>
          </thead>
          <tbody>
            <UsersListItem
              v-for="(user, index) in users"
              :key="index+1"
              :class="applyActiveClass(user)"
              :user="user"
              :index="index+1"
              @selectUser="selectedUser = $event"
            />
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-4">
      <transition name="component-fade" mode="out-in">
        <users-list-item-add v-if="insert" @getAll="allUsers = users" :users="users"/>
        <UsersListItemEdit v-else-if="edit" :user="selectedUser" @cancel="cancel"/>
        <users-list-item-info v-else :user="selectedUser" @editUser="editUser" @excluir="excluir"/>
      </transition>
    </div>
  </div>
</template>
<script>
import { eventBus } from "./../main";
import UsersListItem from "./UsersListItem.vue";
import UsersListItemEdit from "./UsersListItemEdit.vue";
import UsersListItemAdd from "./UsersListItemAdd.vue";
import UsersListItemInfo from "./UsersListItemInfo.vue";

export default {
  components: {
    UsersListItem,
    UsersListItemInfo,
    UsersListItemEdit,
    UsersListItemAdd
  },
  data() {
    return {
      users: this.getAll(),
      selectedUser: undefined,
      edit: false,
      insert: false
    };
  },
  methods: {
    applyActiveClass(userIterado) {
      return {
        "table-active":
          this.selectedUser &&
          this.selectedUser.userEmail === userIterado.userEmail
      };
    },
    getAll() {
      return [
        { userNome: "Usuário teste 1", userEmail: "usuario1@teste.com" },
        { userNome: "Usuário teste 2", userEmail: "usuario2@teste.com" },
        { userNome: "Usuário teste 3", userEmail: "usuario3@teste.com" },
        { userNome: "Usuário teste 4", userEmail: "usuario4@teste.com" },
        { userNome: "Usuário teste 5", userEmail: "usuario5@teste.com" }
      ];
    },
    selectNew() {
      this.edit = false;
      this.insert = true;
      this.selectedUser = undefined;
    },
    addUser(user) {
      this.users.push(user);
      this.cancel();
    },
    editUser(user) {
      this.edit = true;
      this.insert = false;
      this.selectedUser = user;
    },
    excluir(us) {
      const indice = this.users.findIndex(
        user => user.userEmail === us.userEmail
      );
      this.users.splice(indice, 1);
      this.selectedUser = undefined;
      this.edit = false;
    },
    updateUser(updatedUser) {
      const indice = this.users.findIndex(
        user => user.userEmail === updatedUser.userEmail
      );
      this.users.splice(indice, 1, updatedUser);
      this.selectedUser = undefined;
      this.edit = false;
    },
    cancel(editUser) {
      this.insert = false;
      this.edit = false;
      this.selectedUser = undefined;
    }
  },
  created() {
    eventBus.$on("updateUser", this.updateUser);
    eventBus.$on("selectNew", selectNew => {
      this.insert = selectNew.insert;
    });
    eventBus.$on("cancel", cancel => {
      this.edit = false;
      this.insert = false;
      this.selectedUser = undefined;
    });
    eventBus.$on("addUser", this.addUser);
    eventBus.$on("selectUser", user => {
      this.selectedUser = user;
    });
  }
};
</script>
<style>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.2s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>