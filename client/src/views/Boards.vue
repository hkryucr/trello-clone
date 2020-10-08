<template>
  <div class="home-container">
    <div class="home-content-container">
      <div class="home-content-wrapper">
        <nav class="home-left-sidebar-container">
          <div class="nav-user-info-container">
            <ul class="nav-user-info">
              <li class="user-boards">
                <a class="boards-link" href="">
                  <span class="icon-container">
                    <span class="icon-link"></span>
                  </span>
                  <span class="boards-link-text">Boards</span>
                </a>
              </li>
              <div class="template-link-container">
                <li class="templates">
                  <a class="templates-link" href="">
                    <span class="icon-container">
                      <span class="icon-link"></span>
                    </span>
                    <span class="templates-link-text">Templates</span>
                  </a>
                </li>
              </div>
              <li class="to-homepage">
                <a class="homepage-link" href="">
                  <span class="icon-container">
                    <span class="icon-wrapper">
                      <span class="icon-link"></span>
                    </span>
                  </span>
                  <span class="homepage-link-text">Home</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div class="my-boards">
          <div class="my-boards-section-header">
            <div class="boards-page-icon">
              <span></span>
            </div>
            <h3 class="boards-page-header-name">Personal Boards</h3>
          </div>
          <div class="boards-container">
            <div class="boards-index">
              <div class="boards-index-item">
                <a class="board-tile" href="">
                  <span class="board-tile-fade"></span>
                  <div class="board-tile-details">
                    <div class="board-tile-details-name" v-for="(board, $boardIndex) of boards" :key="$boardIndex">
                      {{board.name}}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="boards-signout" @click.prevent="signout">SIGN OUT</button>
      <!-- <h1>this is boards</h1>
      <div v-for="(board, $boardIndex) of boards" :key="$boardIndex">
        {{$boardIndex}}-{{board.name}}
      </div> -->
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
.home-container {
  min-height: calc(100vh - 40px);
  background-color: #fafbfc;
  margin: auto;
  flex-grow: 1;
  width: 100%;
}
.home-content-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
}
.home-content-wrapper {
  position: sticky;
  top: 0px;
}
.home-left-sidebar-container {
  margin: 40px 0 0;
  padding: 0 16px;
  width: 240px;
}
.nav-user-info-container {
  display: block;
}
.nav-user-info {
  margin-bottom: 12px;
  list-style: none;
  padding: 0;
}
.user-boards {
  margin-bottom: 4px;
  display: block;
  align-items: center;
  background-color: transparent;
  border-radius: 4px;
  box-shadow: none;
  display: flex;
  font-weight: 700;
  margin: 0;
  min-height: 20px;
  overflow: hidden;
  padding: 6px 8px 6px 0;
  text-decoration: none;
  transition-property: background-color,border-color,box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
}
.boards-link {
  background-color: #e4f0f6;
  color: #0079bf;
  text-decoration: none;
}
.boards-link-text {
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  background-color: transparent;
}
.icon-link::before {
  content: "\E90A";
}
.template-link-container {
  display: block;
  align-items: center;
  background-color: transparent;
  border-radius: 4px;
  box-shadow: none;
  display: flex;
  font-weight: 700;
  margin: 0;
  min-height: 20px;
  overflow: hidden;
  padding: 6px 8px 6px 0;
  text-decoration: none;
  transition-property: background-color,border-color,box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
}
.templates-link {
  text-decoration: none;
}
.templates {
  margin-bottom: 4px;
}
.templates-link-text {
  font-size: 14px;
  color: #172b4d;
}
.to-homepage {
  margin-bottom: 4px;
}
.homepage-link {
  align-items: center;
  background-color: transparent;
  border-radius: 4px;
  box-shadow: none;
  display: flex;
  font-weight: 700;
  margin: 0;
  min-height: 20px;
  overflow: hidden;
  padding: 6px 8px 6px 0;
  text-decoration: none;
  transition-property: background-color,border-color,box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  color: #172b4d;
}
.homepage-link-text {
  font-size: 14px;
  color: #172b4d;
}
</style>
