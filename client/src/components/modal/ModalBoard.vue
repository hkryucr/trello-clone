<template>
  <div class='modal-board'>
    <form class='modal-board-input-container'>
        <input class='modal-board-input' @input="updateSearchInput($event)" :value="search" type="text" placeholder="Find boards by name…">
        <div class='modal-board-close' v-on:click.prevent="closeModal"><img src="../../assets/exit.svg" alt=""></div>
    </form>
    <div v-if="!search.length">
      <div class='modal-boards-star-container'>
        <div class='modal-boards-star-header'>
          <div style="display: flex; padding:0 5px;">
            <div class='modal-star-container'>
              <img src="../../assets/star.svg" alt="star">
            </div>
            <div class='modal-star-text'>Starred Boards</div>
          </div>
          <div @click.stop.prevent="toggleList('star')" class='modal-board-icon-container' v-if='star'><img src="../../assets/minus.svg" alt=""></div>
          <div @click.stop.prevent="toggleList('star')" class='modal-board-icon-container' v-else><img src="../../assets/plus.svg" alt=""></div>
        </div>
        <div v-show="star">
          <div v-if="!getStarredBoards && !getStarredBoards.length" class='modal-boards-star-body'>
            Star your most important boards to keep them right at your fingertips.
          </div>
          <ul class='modal-board-list-container' v-else>
            <ModalBoardTile v-for="(starBoard, $starBoardIndex) of getStarredBoards" :key="$starBoardIndex" :board="starBoard" :user="getCurrentUser._id" :star="true" :closeModal="closeModal" />
          </ul>
        </div>
      </div>
      <div class='modal-boards-recent-container'>
        <div class='modal-boards-recent-header'>
          <div style="display: flex; padding:0 5px;">
            <div class='modal-recent-container'>
              <img src="../../assets/clock.svg" alt="star">
            </div>
            <div class='modal-recent-text'>Recent Boards</div>
          </div>
          <div @click.stop.prevent="toggleList('recent')" class='modal-board-icon-container' v-if='recent'><img src="../../assets/minus.svg" alt=""></div>
          <div @click.stop.prevent="toggleList('recent')" class='modal-board-icon-container' v-else><img src="../../assets/plus.svg" alt=""></div>
        </div>
        <div v-show="recent">
          <ul class='modal-board-list-container'>
            <ModalBoardTile @click.stop="closeModal" v-for="(recentBoard, $recentBoardIndex) of getRecentlyViewed" :user="getCurrentUser._id" :key="$recentBoardIndex" :board="recentBoard" :star="false" :closeModal="closeModal" />
          </ul>
        </div>
      </div>
      <div class='modal-boards-personal-container'>
        <div class='modal-boards-personal-header'>
          <div style="display: flex; padding:0 5px;">
            <div class='modal-personal-container'>
              <img class='modal-boards-trello-icon' src="../../assets/modal-create/create-board.svg" alt="star">
            </div>
            <div class='modal-personal-text'>Personal Boards</div>
          </div>
          <div @click.stop.prevent="toggleList('personal')" class='modal-board-icon-container' v-if='personal'><img src="../../assets/minus.svg" alt=""></div>
          <div @click.stop.prevent="toggleList('personal')" class='modal-board-icon-container' v-else><img src="../../assets/plus.svg" alt=""></div>
        </div>
        <div v-show="personal">
          <ul class='modal-board-list-container'>
            <ModalBoardTile @click.stop="closeModal" v-for="(board, $boardIndex) of getBoards" :key="$boardIndex" :board="board" :star="getStarredBoardsObj[board._id]" :user="getCurrentUser._id" :closeModal="closeModal" />
          </ul>
        </div>
      </div>
    </div>
    <div v-if="search.length">
      <div style="padding: 8px 0;">
        <ul class='modal-board-list-container'>
          <ModalBoardTile @click.stop="closeModal" v-for="(searchBoard, $searchBoardIndex) of getSearchResultBoards" :key="$searchBoardIndex" :board="convertSearchResult(searchBoard)" :user="getCurrentUser._id" :star="getStarredBoardsObj[searchBoard.boardId]" :closeModal="closeModal" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '../../utils/eventBus'
import { mapGetters } from 'vuex'
import ModalBoardTile from './ModalBoardTile'

export default {
  components: {
    ModalBoardTile
  },
  data () {
    return {
      star: true,
      personal: true,
      recent: true,
      search: ''
    }
  },
  props: {
    closeModal: {
      type: Function
    }
  },
  computed: {
    ...mapGetters(['getCurrentUser', 'getBoards', 'getStarredBoards', 'getBackgrounds', 'getRecentlyViewed', 'getSearchResultBoards', 'getStarredBoardsObj'])
  },
  mounted () {
    this.$store.dispatch('fetchUser', this.getCurrentUser._id)
      .then(async res => {
        await this.$store.commit('UPDATE_USER', res.data)
      })
    this.$store.dispatch('fetchBackgrounds')
      .then(async res => {
        await this.$store.commit('SET_BACKGROUNDS', res.data)
      })
  },
  methods: {
    openCreateBoard () {
      if (this.$router.currentRoute.name === 'board') {
        EventBus.$emit('openCreateBoardFromBoard')
      } else {
        EventBus.$emit('openCreateBoard')
      }
      this.closeModal()
    },
    toggleList (list) {
      if (list === 'star') {
        this.star = !this.star
      } else if (list === 'recent') {
        this.recent = !this.recent
      } else {
        this.personal = !this.personal
      }
    },
    updateSearchInput (e) {
      this.search = e.target.value
      console.log(this.getCurrentUser._id)
      if (this.search === '') {
        this.$store.commit('RESET_SEARCH_RESULT')
        return
      }
      this.fetchSearchResult()
    },
    fetchSearchResult () {
      const searchObj = {
        text: this.search,
        userId: this.getCurrentUser._id
      }
      this.$store.dispatch('searchBoardsAndTasks', searchObj)
        .then(async (res) => {
          await this.$store.commit('UPDATE_SEARCH_RESULT', res.data)
        })
        .catch(err => {
          this.errors = []
          for (let key in err.response.data) {
            this.errors.push(err.response.data[key])
          }
        })
    },
    convertSearchResult (searchResult) {
      return {
        _id: searchResult.boardId,
        name: searchResult.name,
        background: searchResult.background
      }
    }
  }
}
</script>

<style lang="css" >
.modal-board {
  padding: 8px;
  width: 280px;
  display: flex;
  flex-direction: column;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  font-size: 14px;
  font-weight: 400;
  box-shadow: 0 8px 16px -4px rgba(9,30,66,.25);
  height: calc(100vh - 45px);
  overflow: auto;
}
.modal-board-input {
  border: 1px solid lightgray;
  padding: 8px 12px;
  width: 83%;
  border-radius: 5px;
}
.modal-board-input:focus{
  box-shadow: inset 0 0 0 2px #0079bf;
}
.modal-board-input-container {
  display: flex;
  align-items: center;
  font-weight: 500;
  justify-content: space-evenly;
}
.modal-board-close {
  cursor: pointer;
  width: 10px;
  height: auto;
}
.modal-boards-star-container, .modal-boards-recent-container, .modal-boards-personal-container {
  display: flex;
  color: rgb(107, 119, 140);
  padding: 10px 5px;
  font-weight: 600;
  font-size: 12px;
  flex-direction: column
}
.modal-star-container, .modal-recent-container, .modal-personal-container {
  width: 24px;
  height: 24px;
  padding: 4px;
}
.modal-star-text, .modal-recent-text, .modal-personal-text {
  padding: 4px;
  line-height: 15px;
  letter-spacing: .04em;
  text-transform: uppercase;

}
.modal-boards-star-header, .modal-boards-recent-header, .modal-boards-personal-header {
  display: flex;
  justify-content: space-between;
}
.modal-boards-star-body {
  color: #7a869a;
  margin: 16px 30px 10px 31px;
  position: relative;
  text-align: left;
  font-size: 14px;
  font-weight: 450;
  line-height: 20px;
}
.modal-boards-trello-icon {
  fill: #7a869a
}
.modal-board-icon-container {
  width: 24px;
  height: 24px;
  padding: 4px;
  border-radius: 3px;
}
.modal-board-icon-container:hover {
  background-color: #cccccc9d;
  cursor: pointer;
}
.modal-board-list-container {
  padding: 5px 0;
}
</style>
