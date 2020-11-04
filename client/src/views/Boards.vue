<template>
<div>
  <NavBar />
  <div class="home-container">
    <div class='boards-page-container'>
      <div class="home-left-sidebar">
        <nav class="home-left-sidebar-container">
          <div :class="[activeTab === 'boards' ? 'boards-side-menu-option-selected' : 'boards-side-menu-option']" @click.prevent="changeTab($event, 'boards')" >
            <span class="icon-container">
              <span style='color: #0079bf;' class="icon-board icon-sm _2aV_KY1gTq1qWc"></span>
            </span>
            <div class='boards-side-menu-text'>Boards</div>
          </div>
          <div :class="[activeTab === 'templates' ? 'boards-side-menu-option-selected' : 'boards-side-menu-option']" @click.prevent="changeTab($event, 'templates')">
            <span class="icon-container">
              <span class="icon-template-board icon-sm _2aV_KY1gTq1qWc"></span>
            </span>
            <div class='boards-side-menu-text'>Templates</div>
          </div>
          <div :class="[activeTab === 'home' ? 'boards-side-menu-option-selected' : 'boards-side-menu-option']" @click.prevent="changeTab($event, 'home')">
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
      </div>
      <div class='boards-section-container'>
        <div style="position: sticky; top: 0px;">
          <div class="content-all-boards">
            <div class="my-boards" v-if="getStarredBoards && getStarredBoards.length">
              <div class="my-boards-section-header">
                <div class="boards-page-icon">
                  <span class="icon-lg icon-star"></span>
                </div>
                <h3 class="boards-page-header-name">Starred Boards</h3>
              </div>
              <div class="boards-container">
                <ul class="board-tile-list">
                  <BoardTile v-for="(board, $boardIndex) of getStarredBoards" :key="$boardIndex" :board="board" :isStarred="true"/>
                </ul>
              </div>
            </div>
            <div class="my-boards" v-if="getRecentlyViewed && getRecentlyViewed.length">
              <div class="my-boards-section-header">
                <div class="boards-page-icon">
                  <span class="icon-lg icon-clock"></span>
                </div>
                <h3 class="boards-page-header-name">Recently Viewed</h3>
              </div>
              <div class="boards-container">
                <ul class="board-tile-list">
                  <BoardTile v-for="(board, $boardIndex) of getRecentlyViewed" :key="$boardIndex" :board="board" :isStarred="false"/>
                </ul>
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
                <ul class="board-tile-list">
                  <BoardTile v-for="(board, $boardIndex) of getBoards" :key="$boardIndex" :board="board" :isStarred="getStarredBoardsObj[board._id]"/>
                  <li class="boards-page-board-section-list-item">
                    <div @click.prevent='openModal' class="board-tile mod-add">
                      <p><span>Create new board</span></p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div v-show='createBoard' @click.prevent='closeModal' class='create-board-modal-bkgrd'>
        <div class='create-board-modal'>
          <div class='create-board-modal-top' @click.stop>
            <form @submit="submitBoard" class='create-board-modal-info' ref="createBackground">
              <div style="position: absolute; background-color: rgba(0, 0, 0, .2); left: 0; top: 0; right: 0; bottom: 0;"></div>
              <button @click.prevent.stop='closeModal' style="color: #fff; float: right; position: relative; right: -250px; top: -2px" class="text-white-link icon-sm icon-close dark-hover cancel js-cancel-edit"></button>
              <input @keydown.enter="submitBoard" v-model="boardName" class='create-board-modal-input' placeholder="Add board title" type="text">
            </form>
            <ul class='create-board-modal-bkgrd-opt-container'>
              <BackgroundTile @click.native="setBackgroundIdx($backgroundIndex)" class="create-board-modal-bkgrd-opt" v-for="(bkgrd, $backgroundIndex) of getBackgrounds" :key="$backgroundIndex" :bkgrd=bkgrd />
            </ul>
          </div>
          <div class='create-board-modal-bottom' @click.stop>
            <div @click.prevent.stop='submitBoard' v-bind:class="{'create-board-modal-submit-button-disabled': this.boardName.length === 0, 'create-board-modal-submit-button-active': this.boardName.length > 0 }">Create Board</div>
          </div>
        </div>
      </div>
</div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavBar from '../views/NavBar'
import BoardTile from '../components/boards/BoardTile'
import BackgroundTile from '../components/boards/BackgroundTile'
import EventBus from '../utils/eventBus'

export default {
  components: {
    NavBar,
    BoardTile,
    BackgroundTile
  },
  computed: {
    ...mapGetters(['getCurrentUser', 'getBoards', 'getStarredBoards', 'getBackgrounds', 'getRecentlyViewed', 'getStarredBoardsObj'])
  },
  mounted () {
    const vm = this
    this.$store.dispatch('fetchUser', this.getCurrentUser._id)
      .then(async res => {
        await this.$store.commit('UPDATE_USER', res.data)
      })
      .catch(err => {
        console.log(err.response, 'err from boards mounted')
      })
    this.$store.dispatch('fetchBackgrounds')
      .then(async res => {
        await this.$store.commit('SET_BACKGROUNDS', res.data)
      })
      .catch(err => console.log(err))
    EventBus.$on('openCreateBoard', function () {
      vm.createBoard = true
      vm.openModal()
    })
    this.createBoard = false
  },
  methods: {
    async signout () {
      await this.$store.commit('RESET')
      this.$router.push({ name: 'login' })
    },
    changeTab ($event, target) {
      if (this.activeTab !== target) this.activeTab = target
    },
    toggleStar (userId, boardId, bool) {
      this.$store.dispatch('starBoard', { userId, boardId, bool })
    },
    openModal () {
      this.createBoard = true
      this.setBackground()
    },
    closeModal () {
      this.createBoard = false
      this.boardName = ''
      this.idx = 0
    },
    setBackground () {
      const selectedBackground = this.$store.state.backgrounds[this.idx]
      if (selectedBackground.backgroundType === 'image') {
        this.$refs.createBackground.style.backgroundColor = ''
        this.$refs.createBackground.style.backgroundImage = `url(${selectedBackground.template})`
      } else if (selectedBackground.backgroundType === 'color') {
        this.$refs.createBackground.style.backgroundImage = ''
        this.$refs.createBackground.style.backgroundColor = selectedBackground.template
      }
    },
    setBackgroundIdx (idx) {
      this.idx = idx
      this.setBackground()
    },
    async submitBoard () {
      if (this.boardName.length === 0) {
        return
      }
      const boardObj = {
        name: this.boardName,
        columns: [],
        user: this.getCurrentUser._id,
        background: this.$store.state.backgrounds[this.idx]._id
      }
      this.createBoard = false
      this.boardName = ''
      this.idx = 0
      this.$store.dispatch('createBoard', boardObj)
    }
  },
  data () {
    return {
      activeTab: 'boards',
      createBoard: false,
      boardName: '',
      idx: 0
    }
  }
}
</script>

<style lang="css">
.boards-signout{
  padding: 3px;
}
.home-container {
  height: calc(100vh - 40px);
  overflow-y: auto;
}
.boards-page-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
}
.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 4px;
}
.home-left-sidebar {
  position: sticky;
  top: 0px;
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
.boards-side-menu-text {
  padding: 3px;
  font-weight: 700 !important;
  font-size: 14px;
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
  margin: 4px 0 11px 8px;
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
  display: flex;
  flex-direction: column;
  /* margin: 40px 16px;
  width: 100%;
  max-width: 825px;
  min-width: 288px;
  margin-bottom: 0; */
}
.boards-container {
  /* display: flex; */
}
.board-tile-list {
  display: flex;
  flex-wrap: wrap;
}
.board-create-tile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 96px;
  width: 193.875px;
  position: relative;
  background-color: rgba(9,30,66,.04);
  border-radius: 3px;
  margin: 8px;
  cursor: pointer;
}
.board-create-tile-container:hover {
  background-color: #afafaf48;
}
.board-tile {
  display: flex;
}
.board-tile-name {
  color: #fff;
  padding: 10px;
  font-weight: 700;
  font-size: 16px;
  word-wrap: break-word;
}
a {
  text-decoration: none;
}
.boards-section-container {
  display: flex;
  flex-direction: column;
  margin: 40px 16px 0;
  width: 100%;
  max-width: 825px;
  min-width: 288px;
}
/* .content-all-boards{

} */
.board-tile.mod-add{
  background-color: rgba(9,30,66,.04);
  box-shadow: none;
  border: none;
  color: #172b4d;
  display: table-cell;
  height: 96px;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  width: inherit;
  transition-property: background-color,border-color,box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  font-size: 14px;
  cursor: pointer;
}
.board-tile.mod-add:hover {
  background-color: rgba(9, 30, 66, 0.08);
}
.create-board-modal-bkgrd{
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,.75);
  z-index: 100;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
}
.create-board-modal{
  background: none;
  position: absolute;
  top: 44px;
  justify-content: center;
}
.create-board-modal-info{
  border-radius: 3px;
  box-sizing: border-box;
  color: #fff;
  height: 96px;
  padding: 10px 10px 10px 16px;
  position: relative;
  width: 296px;
  display: flex;
  flex-direction: column;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.create-board-modal-input{
  border: none;
  border-radius: 3px;
  background: transparent;
  box-shadow: none;
  box-sizing: border-box;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  left: -3px;
  line-height: 24px;
  margin-bottom: 4px;
  padding: 2px 8px;
  position: relative;
  width: calc(100% - 18px - 16px);
  top: -20px;
}
.create-board-modal-input:hover {
  background: rgba(0,0,0,.25)
}
.create-board-modal-input:focus {
  background: hsla(0,0%,100%,.3)
}
.create-board-modal-top {
  display: flex;
}
.create-board-modal-bkgrd-opt-container{
  width: 110px;
  height: 96px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  list-style: none;
  margin: 0 0 0 8px;
  overflow: auto;
}
.closed{
  display: none;
}
.create-board-modal-bottom{
  padding: 10px 0;
  width: 109px;

}
.create-board-modal-submit-button-disabled{
  border: none;
  color: #a5adba;
  cursor: not-allowed;
  padding: 8px 5px;
  border-radius: 3px;
  font-size: 14px;
  text-align: center;
  background: #F4F5F7;
}
.create-board-modal-submit-button-active{
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 8px 5px;
  border-radius: 3px;
  font-size: 14px;
  text-align: center;
  background-color: #5aac44;
}
.create-board-modal-no-team, .create-board-modal-private{
  margin-top: -25px;
  width: fit-content;
  padding: 5px;
  font-size: 14px;
  font-weight: 400;
  border-radius: 3px;
}
.create-board-modal-private{
  margin-top: 0;
}
.create-board-modal-no-team:hover, .create-board-modal-private:hover {
  background-color: hsla(0,0%,100%,.3);
  cursor: pointer;
}
</style>
