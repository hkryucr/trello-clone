<template>
  <div class="home-container">
    <NavBar />
    <div class='boards-page-container'>
      <nav class="home-left-sidebar-container">
        <div class='boards-side-menu-option-selected'>
          <span class="icon-container">
            <span style='color: #0079bf;' class="icon-board icon-sm _2aV_KY1gTq1qWc"></span>
          </span>
          <div class='boards-side-menu-text'>Boards</div>
        </div>
        <div class='boards-side-menu-option'>
          <span class="icon-container">
            <span class="icon-template-board icon-sm _2aV_KY1gTq1qWc"></span>
          </span>
          <div class='boards-side-menu-text'>Templates</div>
        </div>
        <div class='boards-side-menu-option'>
          <span class="icon-container">
            <span class="icon-home icon-sm _2aV_KY1gTq1qWc"></span>
          </span>
          <div class='boards-side-menu-text'>Home</div>
        </div>
        <div class='boards-side-menu-teams'>Teams</div>
      <div class='boards-side-menu-create-team'>
        <div class='icon-wrapper'>
          <span class="icon-add icon-sm _2aV_KY1gTq1qWc"></span>
        </div>
        <div class='boards-side-menu-create-text'>Create a team</div>
      </div>
      </nav>
      <div class='boards-section-container'>
        <div class="my-boards">
          <div class="my-boards-section-header">
            <div class="boards-page-icon">
              <span class="icon-lg icon-star"></span>
            </div>
            <h3 class="boards-page-header-name">Starred Boards</h3>
          </div>
          <div class="boards-container">
              <div class="boards-listing-container" v-for="(board, $boardIndex) of boards" :key="$boardIndex">
                <router-link to='board/:board.id'>
                  <div class='board-tile-container'>
                    <div class='board-tile-name'>{{board.name}}</div>
                    <span style="color: #fff; padding-bottom: 10px;" class="icon-sm icon-star board-tile-options-star-icon"></span>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        <div class="my-boards">
          <div class="my-boards-section-header">
            <div class="boards-page-icon">
              <span class="icon-lg icon-clock"></span>
            </div>
            <h3 class="boards-page-header-name">Recently Viewed</h3>
          </div>
          <div class="boards-container">
              <div class="boards-listing-container" v-for="(board, $boardIndex) of boards" :key="$boardIndex">
                <router-link to='board/:board.id'>
                  <div class='board-tile-container'>
                    <div class='board-tile-name'>{{board.name}}</div>
                    <span style="color: #fff; padding-bottom: 10px;" class="icon-sm icon-star board-tile-options-star-icon"></span>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        <div class="my-boards">
          <div class="my-boards-section-header">
            <div class="boards-page-icon">
              <span class="icon-lg icon-member"></span>
            </div>
            <h3 class="boards-page-header-name">Personal Boards</h3>
          </div>
          <div class="boards-container">
              <div class="boards-listing-container" v-for="(board, $boardIndex) of boards" :key="$boardIndex">
                <router-link to='board/:board.id'>
                  <div class='board-tile-container'>
                    <div class='board-tile-name'>{{board.name}}</div>
                    <span style="color: #fff; padding-bottom: 10px;" class="icon-sm icon-star board-tile-options-star-icon"></span>
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
import NavBar from '../views/NavBar'

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
}
.boards-page-container {
  display: flex;
  flex-direction: row;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  padding-left: 200px;
}
.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 4px;
}
.home-left-sidebar-container {
  margin: 40px 0 0;
  padding: 0 16px;
  width: 272px;
  top: 10;
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

.boards-side-menu-option-selected {
  display: flex;
  padding: 6px 8px;
  width: 100%;
  background-color: #e4f0f6;
  color: #0079bf;
  border-radius: 4px;
  margin-bottom: 5px;
}
.boards-side-menu-option-selected:hover {
  cursor: pointer;
}
.boards-side-menu-text {
  padding: 3px;
  font-weight: 700;
  font-size: 14px;
}
.boards-side-menu-option {
  display: flex;
  padding: 6px 8px;
  width: 100%;
  color: #172b4d;
  border-radius: 4px;
  margin-bottom: 5px;
}
.boards-side-menu-create-team {
  display: flex;
  margin: 15px;
  width: 100%;
  margin-left: 6px;
  padding: 6px 8px;
  color: #172b4d;
  border-radius: 4px;
}
.boards-side-menu-create-text {
  padding-left: 10px;
  color: rgba(9,30,66,.66);
  font-weight: 500;
  font-size: 14px;
}
.boards-side-menu-option:hover, .boards-side-menu-create-team:hover {
  background-color: #eeeded;
  cursor: pointer;
}
.boards-side-menu-teams {
  color: #5e6c84;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: .04em;
  line-height: 16px;
  margin-top: 16px;
  text-transform: uppercase;
  flex: 1 1 auto;
  margin: 0;
  padding: 6px 12px;
  text-align: left;
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
/* ._33CvMKqfH4Yf0j {
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
} */
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
.my-boards {
  margin: 40px 16px;
  width: 100%;
  max-width: 825px;
  min-width: 288px;
  margin-bottom: 0;
}
.boards-container {
  display: flex;
}
.board-tile-container {
  display: flex;
  height: 96px;
  width: 193.875px;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  background-color: darkgreen;
  border-radius: 3px;
  margin: 8px;
}
.boards-listing-container {
  display: flex;
}
.board-tile-name {
  color: #fff;
  padding: 10px;
  font-weight: 700;
  font-size: 16px;
}
a {
  text-decoration: none;

}
/* .board-tile-fade {
  background-color: rgba(0,0,0,.15);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
} */
.boards-section-container {
  display: flex;
  flex-direction: column;
}

</style>
