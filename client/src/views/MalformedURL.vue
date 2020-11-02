<template>
<div>
  <NavBar />
  <main id="popover-boundary" class="_2-ZL0JUhEcuafN">
    <div id="content">
      <div class="js-react-root">
        <div class="quJQh3DmirLZ_k _3aT9LJlqB4u3pW">
          <h1>Malformed URL</h1>
          <p>The link you entered does not look like a valid Trello link. If someone gave you this link, you may need to ask them to check that it's correct.</p>
          <div class="_2IU8C6THJ9BrN6">
            <span>Not <strong>{{getCurrentUser.fullName}}</strong>? </span>
            <span class="logout-aa" to="/" @click="logout">Switch Accounts</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavBar from '../views/NavBar'

export default {
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['getCurrentUser'])
  },
  methods: {
    async logout () {
      await this.$store.commit('RESET')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="css">
._2-ZL0JUhEcuafN {
  position: relative;
  overflow-y: auto;
  outline: none;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
#content {
    position: relative;
    overflow-y: auto;
    outline: none;
}
.quJQh3DmirLZ_k {
  display: block;
  margin: 75px auto;
  text-align: center;
  max-width: 600px;
}
.quJQh3DmirLZ_k p {
  font-size: 18px;
  line-height: 22px;
}
._2IU8C6THJ9BrN6 {
  color: #172b4d;
  font-size: 14px;
  margin-top: 32px;
}
._2IU8C6THJ9BrN6 .logout-aa {
  color: #172b4d;
  text-decoration: underline;
  cursor: pointer;
}
.quJQh3DmirLZ_k h1 {
    font-size: 26px;
    margin-bottom: 24px;
    font-weight: 600;
    line-height: 28px;
    margin: 0 0 12px;
}
</style>
