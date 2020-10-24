<script>
import { mapGetters } from 'vuex'
export default {
  props: ['board'],
  computed: {
    ...mapGetters(['getUser', 'getCurrentUser', 'getBoards'])
  },
  methods: {
    toggleStar (userId, boardId, bool) {
      this.$store.dispatch('starBoard', { userId, boardId, bool })
    }
  }
  // mounted: {
  // }
}
</script>
<template>
  <li class="boards-page-board-section-list-item" >
    <router-link :to="`board/${board._id}`" class="board-tile mod-light-background"
    :style="`${(board.background.backgroundType === 'color') ? ('background-color:' + board.background.template): ('background-image: url(' + board.background.template + ');')}`"
    >
      <div class="board-tile-container board-tile-details">
        <!-- <div class='board-tile-name'>{{board.name}}</div>
        <span style="color: #fff; padding-bottom: 10px;" class="icon-sm icon-star board-tile-options-star-icon"></span> -->
        <div class="board-tile-details is-badged">
          <div title="Trello" dir="auto" class="board-tile-details-name">
            <div style="overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 2; font-weight: 800;">
              {{board.name}}
            </div>
          </div>
          <div class="board-tile-details-sub-container">
            <span class="board-tile-options">
              <span @click.prevent="toggleStar(getUser.id, board._id, getUser.starredBoards[board._id])" title="Click to star this board. It will show up at the top of your boards list." class="icon-sm icon-star is-starred board-tile-options-star-icon"></span>
            </span>
          </div>
        </div>
      </div>
    </router-link>
    <!-- <div @click.prevent="toggleStar(getUser.id, board._id, getUser.starredBoards[board._id])">
      {{getUser.starredBoards[board._id]}}
    </div> -->
  </li>
</template>
<style>
.boards-page-board-section-list-item {
  width: 23.5%;
  padding: 0;
  margin: 0 2% 2% 0;
  transform: translate(0);
  list-style: none;
}
@media (min-width: 576px){
  .boards-page-board-section-list-item {
    width: 33%;
  }
}
@media (min-width: 768px){
  .boards-page-board-section-list-item {
    width: 25%;
  }
}
@media (min-width: 992px){
  .boards-page-board-section-list-item {
    width: 23.5%;
  }
}
@media (min-width: 1200px){
  .boards-page-board-section-list-item {
    width: 23.5%;
  }
}
.board-tile {
  /* background-color: rgb(0, 121, 191); */
  background-size: cover;
  background-position: 50%;
  color: #fff;
  line-height: 20px;
  padding: 8px;
  position: relative;
  text-decoration: none;
  border-radius: 3px;
  display: block;
}
.board-tile-details {
  display: flex;
  height: 80px;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
}
.board-tile-details-name {
  flex: 0 0 auto;
  font-size: 16px;
  font-weight: 700;
  display: inline-block;
  overflow: hidden;
  max-height: 40px;
  width: 100%;
  word-wrap: break-word;
}
.board-tile-details-sub-container {
  flex: 0 0 auto;
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
}
.board-tile-container {
  width: 100%;
}
.board-tile-options {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  margin-left: 4px;
  overflow: hidden;
  position: relative;
  right: -4px;
}
.board-tile-options-star-icon.is-starred {
  color: #e6c60d;
  opacity: 1;
  width: 18px;
  margin-right: 6px;
}
.board-tile-options-start-icon {
  display: block;
  line-height: 18px;
  top: 0;
  bottom: 0;
  right: 0;
  color: #fff;
  font-size: 14px;
  width: 0;
  height: 18px;
  opacity: 0;
  transition-duration: .15s;
  transition-property: color,background,opacity,transform,width,margin;
}
.board-tile-options-start-icon:hover {
  height: 32px;
  font-size: 30px;
}
.icon-star:hover {
  font-size: 17px;
}
</style>
