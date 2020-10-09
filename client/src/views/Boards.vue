<template>
  <div class="home-container">
    <NavBar />
    <div class="home-content-container">
      <div class="home-content-wrapper">
        <nav class="home-left-sidebar-container">
          <div class="nav-user-info-container">
            <ul class="nav-user-info">
              <li class="user-boards">
                <a class="boards-link" href="">
                  <span class="icon-container">
                    <span class="icon-board icon-sm _2aV_KY1gTq1qWc"></span>
                  </span>
                  <span class="boards-link-text">Boards</span>
                </a>
              </li>
              <div class="template-link-container">
                <li class="templates">
                  <a class="templates-link" href="">
                    <span class="icon-container">
                      <span class="icon-template-board icon-sm _2aV_KY1gTq1qWc"></span>
                    </span>
                    <span class="templates-link-text">Templates</span>
                  </a>
                </li>
              </div>
              <li class="to-homepage">
                <a class="homepage-link" href="">
                  <span class="icon-container">
                    <span class="icon-wrapper">
                      <span class="icon-home icon-sm _2aV_KY1gTq1qWc"></span>
                    </span>
                  </span>
                  <span class="homepage-link-text">Home</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="create-team-nav">
            <div class="create-team-nav-header">
              <div class="NC6qaILF7dGKjb">
                <div class="_2zEdWKjwDvxZHR dG8NJxS20S4HJ2">
                  <div class="_mtkwfAlvk6O3f">TEAMS</div>
                </div>
              </div>
            </div>
            <div class="create-team">
              <button class="_33CvMKqfH4Yf0j _3SBHBJq0AAxzqg" data-test-id="home-navigation-create-team-button" aria-label="Create a team">
                <span class="_12-5x14JSgUact">
                  <span class="_2aV_KY1gTq1qWc">
                    <span class="icon-add icon-sm _2aV_KY1gTq1qWc"></span>
                  </span>
                </span>
                <span class="_3qwe2tMMFonNvf">Create a team</span>
              </button>
            </div>
          </div>
        </nav>
        <div class="my-boards">
          <div class="my-boards-section-header">
            <div class="boards-page-icon">
              <span class="icon-lg icon-member"></span>
            </div>
            <h3 class="boards-page-header-name">Personal Boards</h3>
          </div>
          <div class="boards-container">
            <div class="boards-index" v-for="(board, $boardIndex) of boards" :key="$boardIndex">
              <router-link class="board-tile" :to="{ name: 'board', params: { id: board._id} }">
                <div class="board-tile-details">
                  <div class="board-tile-details-name" >
                    {{board.name}}
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavBar from './NavBar'

export default {
  components: {
    NavBar
  },
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
  display: flex;
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
.create-team-nav {
  display: block;
}
.NC6qaILF7dGKjb {
  display: flex;
}
.dG8NJxS20S4HJ2 {
  margin: 0;
  align-items: baseline;
  display: flex;
  height: 32px;
  justify-content: flex-start;
  margin-bottom: 8px;
  padding: 0 0 0 8px;
}
._mtkwfAlvk6O3f {
  color: #5e6c84;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: .04em;
  line-height: 16px;
  margin-top: 16px;
  text-transform: uppercase;
  flex: 1 1 auto;
  margin: 0;
  padding: 8px 0;
}
._3qwe2tMMFonNvf {
  flex: 1 1 auto;
  font-size: 14px;
}
._3SBHBJq0AAxzqg {
  height: auto;
  width: 100%;
  padding: 6px 8px 6px 0;
  box-shadow: none;
  font-weight: 400;
  color: rgba(9,30,66,.66);
}
._33CvMKqfH4Yf0j {
  margin: 0;
  margin-top: 6px;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  background-color: transparent;
  border-radius: 4px;
  display: flex;
  overflow: hidden;
  text-decoration: none;
  text-decoration: none;
  transition-property: background-color,border-color,box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  cursor: pointer;
  text-align: left;
}
.my-boards-section-header {
  display: flex;
}
.icon-lg {
  color: #42526e;
  height: 32px;
  line-height: 32px;
  width: 32px;
}
.boards-page-header-name {
  display: inline-block;
  line-height: 24px;
  margin: 4px 0 0;
  font-size: 16px;
  font-weight: 700;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.boards-index {
  display: flex;
}
.board-title {
  background-color: red;
}
</style>
