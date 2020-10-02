<template>
<div v-if="getUser && getUser.boards">
  <h1 v-on:click="handleClick">this is boards</h1>
  <div v-for="(board, $boardIndex) of getUser.boards" :key="$boardIndex">
    {{$boardIndex}}-{{board.name}}
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    handleClick: function () {
      console.log(this)
    }
  }
}
</script>
