<template>
    <tr>
        <td># {{index}}</td>
        <td>{{user.userNome}}</td>
        <td>{{user.userEmail}}</td>
        <td><button @click="selecionar" class="btn btn-sm btn-secundary float-right">Selecionar</button></td>
    </tr>
</template>
<script>
import {eventBus} from './../main'

export default {
    props: {
        user: {
            type: Object
        },
        index: {type:Number}
    },
    methods: {
        selecionar(event) {
            eventBus.selectUser(this.user)
        }
    }
}
</script>