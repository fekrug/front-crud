<template>
<div>
  <div class="jumbotron jumbotron-fluid">
    <div class="container text-center">
      <h1 class="display-4">USUÁRIOS</h1>
      <p class="lead">Cadastro de Usuários</p>
    </div>
  </div>  

  <div class="container">
    <UsersList/>
  </div>
</div>
</template>

<script>
import UsersList from './components/UsersList.vue'

export default {
  components: {
    UsersList
  }
}
</script>

