<template>
  <div class='modal-board'>
    <form class='modal-board-input-container'>
        <input class='modal-board-input' type="text" placeholder="Find boards by name…">
        <div class='modal-board-close' v-on:click.prevent="closeModal"><img src="../../assets/exit.svg" alt=""></div>
    </form>
    <div class='modal-boards-star-container'>
      <div class='modal-boards-star-header'>
        <div style="display: flex;">
          <div class='modal-star-container'>
            <img src="../../assets/star.svg" alt="star">
          </div>
          <div class='modal-star-text'>Starred Boards</div>
        </div>
        <div v-if='star' @click.stop.prevent="toggleList('star')" class='modal-board-svg-container'><img src="../../assets/minus.svg" alt=""></div>
        <div v-else @click.stop.prevent="toggleList('star')" class='modal-board-svg-container'><img src="../../assets/plus.svg" alt=""></div>
      </div>
      <ul v-if="getStarredBoards && getStarredBoards.length">
        <li v-for="(starBoard, $boardIndex) of getStarredBoards" :key="$boardIndex">
          <router-link :to="`/board/${starBoard.boardId}`"></router-link>
        </li>
      </ul>
      <div v-else class='modal-boards-star-body'>
        Star your most important boards to keep them right at your fingertips.
      </div>
    </div>
    <div class='modal-boards-recent-container'>
      <div class='modal-boards-recent-header'>
        <div style="display: flex;">
          <div class='modal-recent-container'>
            <img src="../../assets/clock.svg" alt="star">
          </div>
          <div class='modal-recent-text'>Recent Boards</div>
        </div>
        <div v-if='recent' @click.stop.prevent="toggleList('recent')" class='modal-board-svg-container'><img src="../../assets/minus.svg" alt=""></div>
        <div v-else @click.stop.prevent="toggleList('recent')" class='modal-board-svg-container'><img src="../../assets/plus.svg" alt=""></div>
      </div>
      <div class='modal-boards-star-body'>
        LI of recent boards
      </div>
    </div>
    <div class='modal-boards-personal-container'>
      <div class='modal-boards-personal-header'>
        <div style="display: flex;">
          <div class='modal-personal-container'>
            <img class='modal-boards-trello-icon' src="../../assets/modal-create/create-board.svg" alt="star">
          </div>
          <div class='modal-personal-text'>Personal Boards</div>
        </div>
        <div v-if='personal' @click.stop.prevent="toggleList('personal')" class='modal-board-svg-container'><img src="../../assets/minus.svg" alt=""></div>
        <div v-else @click.stop.prevent="toggleList('personal')" class='modal-board-svg-container'><img src="../../assets/plus.svg" alt=""></div>
      </div>
      <div class='modal-boards-star-body'>
        LI of personal boards
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '../../utils/eventBus'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      star: 'open',
      personal: 'open',
      recent: 'open'
    }
  },
  props: {
    closeModal: {
      type: Function
    }
  },
  computed: {
    ...mapGetters(['getCurrentUser', 'getBoards', 'getStarredBoards', 'getBackgrounds', 'getRecentlyViewed', 'getStarredBoardsObj'])
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
        this.star = (this.star === 'open') ? '' : 'open'
      } else if (list === 'recent') {
        this.recent = (this.recent === 'open') ? '' : 'open'
      } else {
        this.personal = (this.personal === 'open') ? '' : 'open'
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

}
.modal-board-input {
  border: 1px solid lightgray;
  padding: 8px 12px;
  width: 83%;
  border-radius: 5px;
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
  padding: 10px;
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
  align-items: center;
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
.modal-board-svg-container {
  width: 20px;
  height: 20px;
  color: rgb(107, 119, 140);
  border-radius: 3px;
  padding: 4px;
}
.modal-board-svg-container:hover {
  background-color: #d9dadb;
  cursor: pointer;
}

</style>
