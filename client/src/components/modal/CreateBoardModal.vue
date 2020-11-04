<template>
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

</template>

<script>
import BackgroundTile from '../boards/BackgroundTile'
import { mapGetters } from 'vuex'
import EventBus from '../../utils/eventBus'

export default {
  mounted () {
    const vm = this
    EventBus.$on('setBackgroundCreateBoard', function () {
      vm.setBackground()
    })
    EventBus.$on('resetCreateBoard', function () {
      vm.boardName = ''
      vm.idx = 0
    })
  },
  components: {
    BackgroundTile
  },
  props: {
    closeModal: {
      type: Function
    }
  },
  computed: {
    ...mapGetters(['getCurrentUser', 'getBoards', 'getStarredBoards', 'getBackgrounds', 'getRecentlyViewed', 'getStarredBoardsObj'])
  },
  methods: {
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
      this.closeModal()
      this.$store.dispatch('createBoard', boardObj)
    },
    setBackgroundIdx (idx) {
      this.idx = idx
      this.setBackground()
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
    }
  },
  data () {
    return {
      boardName: '',
      idx: 0
    }
  }
}
</script>

<style lang="css">
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

.create-board-modal-input:hover {
  background: rgba(0,0,0,.25)
}
.create-board-modal-input:focus {
  background: hsla(0,0%,100%,.3)
}
.create-board-modal-top {
  display: flex;
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
</style>
