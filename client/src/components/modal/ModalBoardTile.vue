<template>
  <div class="modal-board-tile-container">
      <router-link :to="`board/${board._id}`" class="_1-xqt-RbCBt-Sv">
        <div class="_26ZVKC32nK5LUz" :style="insertBackground(board)"></div>
        <div class="_3ip-7S5md5RzJ-" :style="insertBackground(board)"></div>
        <div class="modal-board-tile-text-container">
          <div class="modal-board-tile-text">{{board.name}}</div>
        </div>
        <div class="modal-board-tile-star-container">
          <span class="modal-board-star-option" v-if="star">
            <span @click.prevent="toggleStar(user, board._id, star)" title="Click to star this board. It will show up at the top of your boards list." class="icon-sm icon-star is-starred board-tile-options-star-icon"></span>
          </span>
          <span class="modal-board-star-option-2" v-else>
            <span @click.prevent="toggleStar(user, board._id, star)" title="Click to star this board. It will show up at the top of your boards list." class="icon-sm icon-star board-tile-options-star-icon"></span>
          </span>
        </div>
      </router-link>
  </div>
</template>

<script>
export default {
  props: ['board', 'star', 'user'],
  methods: {
    insertBackground (curBoard) {
      return `${(curBoard.background.backgroundType === 'color') ? ('background-color:' + curBoard.background.template) : ('background-image: url(' + curBoard.background.template + ');')}`
    },
    toggleStar (userId, boardId, bool) {
      this.$store.dispatch('starBoard', { userId, boardId, bool })
    }
  }
}
</script>

<style>
.modal-board-tile-container {
  margin: 0 4px 4px 0;
}
.modal-board-tile-text-container {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 8px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.modal-board-tile-text{
  font-weight: 700;
  font-size: 14px;
  color: #172b4d;
}
.modal-board-tile-star-container{
  display: flex;
  align-items: center;
}
.modal-board-star-option{
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  margin-left: 4px;
  overflow: hidden;
  position: relative;
  right: -4px;
}
.modal-board-star-option-2 {
  display: block;
  line-height: 18px;
  top: 0;
  bottom: 0;
  right: 0;
  color: #fff;
  font-size: 14px;
  height: 18px;
  opacity: 0;
  transition-duration: .15s;
  transition-property: color, background, opacity, transform, width,margin;
  -webkit-transform: translateZ(0);
}
.modal-board-star-option-2:hover{
    transform: scale(1.2) !important;
    opacity: 100;
    width: 24px;
}
</style>
