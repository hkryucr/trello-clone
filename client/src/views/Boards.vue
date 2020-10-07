<template>
<div>
  <button class="boards-signout" @click.prevent="signout">SIGN OUT</button>
  <h1>this is boards</h1>
  <div v-for="(board, $boardIndex) of boards" :key="$boardIndex">
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
  mounted () {
    this.$store.dispatch('fetchUser', this.getUser._id)
      .then(async res => {
        await this.$store.commit('UPDATE_USER', res.data)
        this.boards = res.data.boards
      })
      .catch(err => {
        console.log(err.response, 'err from boards mounted')
      })
  },
  methods: {
    async signout () {
      await this.$store.commit('RESET')
      this.$router.push({ name: 'login' })
    }
  },
  data () {
    return {
      boards: []
    }
  }
}
</script>

<style lang="css">
.boards-signout{
  padding: 3px;
}
</style>
