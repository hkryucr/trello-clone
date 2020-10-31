<template>
  <div :class="[(board.background && board.background.backgroundType === 'image') ? 'board-header-gradient' : '']"
    class="flex flex-row board-header-container justify-between"
  >
    <div class="board-header-left flex flex-row">
      <div class="input-main-header board-main-header">
        <h3
          ref="boardHeader"
          class="input-name board-name"
          @click.prevent="clickBoardName($event)"
          v-show="!nameInputClicked"
        >
          {{ board.name }}
        </h3>
        <input
          ref="boardName"
          class="text-lg input-hide"
          v-bind:class="{ 'input-show': nameInputClicked }"
          type="text"
          v-on:input="updateWidth($event)"
          @blur="updateBoard($event)"
          @keyup.enter="updateBoard($event)"
          @keyup.esc="updateBoard($event)"
          v-bind:value="board.name"
        />
      </div>
      <span class="board-header-btn-divider"></span>
      <div class="flex my-auto header-board-link">
        <span class="icon-sm icon-star board-header-btn-icon text-white"></span>
      </div>
      <span class="board-header-btn-divider"></span>
      <div class="flex my-auto header-board-link">
        <span class="board-header-btn-icon icon-private icon-sm text-white"></span>
        <span>Private</span>
      </div>
      <span class="board-header-btn-divider"></span>
      <span class="board-header-user-icon"></span>
    </div>
    <div @click.prevent="deleteBoard" class="board-header-right">
      <div class="flex my-auto header-board-link justify-self-end">
        <span class="icon-sm icon-overflow-menu-horizontal board-header-btn-icon text-white"></span>
        <span>Show Menu</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['board'],
  data () {
    return {
      boardName: '',
      nameInputClicked: false
    }
  },
  methods: {
    updateWidth () {
      // this.$refs.boardName.style.width = 'auto'
      // const inputLength = this.$refs.boardName.scrollWidth + 8
      // const inputLength = this.$refs.boardName.value.length * 10 + 30
      // this.$refs.boardName.style.width = inputLength.toString() + 'px'

      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      context.font = window.getComputedStyle(this.$refs.boardName, null).getPropertyValue('font')
      const m = context.measureText(this.$refs.boardName.value)
      const width = m.width + 25
      this.$refs.boardName.style.width = width.toString() + 'px'
    },
    clickBoardName () {
      this.nameInputClicked = true
      this.updateWidth()
      this.$refs.boardName.classList.add('input-show')
      this.$refs.boardName.focus()
      this.$refs.boardName.select()
    },
    updateBoard (e) {
      if (!this.nameInputClicked || e.target.value.replace(/ /g, '').length === 0) {
        this.nameInputClicked = false
      } else {
        this.nameInputClicked = false
        this.$refs.boardName.classList.remove('input-show')
        this.$store.dispatch('updateBoard', { name: e.target.value })
      }
    },
    deleteBoard () {
      this.$store.dispatch('deleteBoard', this.board._id)
    }
  }
}
</script>

<style lang="css">
.board-header-container {
  height: 48px;
  padding: 8px 4px 4px 8px;
}
.board-header-gradient {
  background: rgba(0,0,0,.24);
}
.input-name {
  cursor: pointer;
  padding: 5px;
  border-radius: 2px;
  font-weight: 600;
  vertical-align: center;
}
.board-main-header .input-name {
  font-size: 14px;
}
.board-name {
  font-size: 18px;
  padding: 5px 12px;
}
.input-name:hover {
  background: rgba(255, 255, 255, 0.171);
  cursor: pointer;
  border-radius: 2px;
}
/* consider renaming the class */
.input-main-header {
  white-space:nowrap;
  display:inline-block;
}
.board-main-header {
  font-size: 18px;
}
.input-main-header > input {
  height: 100%;
  width: fit-content;
  max-width: 80vw;
  box-sizing:border-box;
  outline: transparent;
  padding: 4px;
  font-weight: bolder;
  white-space: nowrap;
  border-radius: 3px;
}
.input-main-header > input:focus {
  box-shadow: inset 0 0 0 2px #0079bf;
}
.board-main-header > input {
  padding: 5px 12px;
}
.input-hide {
  display: none;
}
.input-show {
  display: block;
}
.board-header-btn-divider {
  float: left;
  border-left: 1px solid hsla(0,0%,100%,.24);
  height: 16px;
  margin: 8px 8px 12px 4px;
}
.board-header-user-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hsla(0,0%,100%,.3);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  text-align: center;
  vertical-align: middle;
  color: #fff;
  font-weight: 700;
}
.header-board-link {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hsla(0,0%,100%,.3);
  width: auto;
  height: 32px;
  margin: 0 5px;
  padding: 5px;
  color: #fff;
  border-radius: 2px;
}
.header-board-link:hover {
  background-color: rgba(255, 255, 255, 0.15);
  cursor: pointer;
}

.icon-overflow-menu-horizontal {
  justify-self: flex-end;
}
</style>
