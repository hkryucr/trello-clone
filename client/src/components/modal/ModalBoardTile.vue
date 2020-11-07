<template>
  <div class="modal-board-tile-container">
      <router-link :to="`board/${board._id}`" class="_1-xqt-RbCBt-Sv">
        <div class="_26ZVKC32nK5LUz" :style="insertBackground(board)"></div>
        <div class="_3ip-7S5md5RzJ-" :style="insertBackground(board)"></div>
        <div class="modal-board-tile-text-container">
          <div class="modal-board-tile-text">{{board.name}}</div>
        </div>
      </router-link>
  </div>
</template>

<script>
export default {
  props: ['board', 'star'],
  methods: {
    insertBackground (curBoard) {
      return `${(curBoard.background.backgroundType === 'color') ? ('background-color:' + curBoard.background.template) : ('background-image: url(' + curBoard.background.template + ');')}`
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
</style>
