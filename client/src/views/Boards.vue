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
    console.log(this.getUser, this.getUser._id)
    this.$store.dispatch('fetchUser', this.getUser._id)
      .then(async res => {
        // console.log(res.data, 'res.data')
        await this.$store.commit('UPDATE_USER', res.data)
        // console.log(this.$store.state)
        this.boards = res.data.boards
        // console.log(this.boards)
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
