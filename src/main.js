import Vue from 'vue'
import App from './App.vue'
//Vue.config.productionTip = false

export const eventBus = new Vue({
 
  methods: {
    getAll(data) {
      this.$emit('getAll', data)
    },
    selectUser(selectedUser) {
      this.$emit('selectUser', selectedUser)
    },
    selectNew(selectNew) {
      this.$emit('selectNew', selectNew)
    },
    updateUser(userUpdated) {
      this.$emit('updateUser', userUpdated)
    },
    addUser(userAdd) {
      this.$emit('addUser', userAdd)
    },
    cancel() {
      this.$emit('cancel', true)
    }
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
