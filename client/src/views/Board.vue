<template>
  <div class="board">
    <div class="board-header">
    </div>
    <div class="board-main flex flex-col items-start">
      <div class="board-main-header">
        <h3 class="board-name" @click.prevent="clickBoardName($event)" v-show="!nameInputClicked">{{board.name}}</h3>
        <input
          ref="boardName"
          class="text-lg board-input-hide"
          v-bind:class="{'board-input-show': nameInputClicked}"
          type="text"
          v-on:input="updateWidth($event)"
          @blur="updateBoard($event)"
          @keyup.enter="updateBoard($event)"
          @keyup.esc="updateBoard($event)"
          v-bind:value="board.name"/>
      </div>
      <div class="flex flex-row items-start">
        <BoardColumn
          v-for="(column, $columnIndex) of board.columns"
          :key="$columnIndex"
          :column="column"
          :columnIndex="$columnIndex"
          :board="board"
        />
        <div class="column flex">
          <input
            type="text"
            v-model="newColumnName"
            class="p-2 mr-2 flex-grow"
            placeholder="New Column Name"
            @keyup.enter="createColumn"
          >
        </div>
      </div>
      <div class="task-bg" v-if="isTaskOpen" @click.self="close">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { fetchBoard } from '../utils/BoardApiUtil'
import BoardColumn from '@/components/BoardColumn'

export default {
  components: {
    BoardColumn
  },
  data () {
    return {
      newColumnName: '',
      boardName: '',
      nameInputClicked: false
    }
  },
  computed: {
    isTaskOpen () {
      return this.$route.name === 'task'
    },
    ...mapState(['board'])
  },
  mounted () {
    // Original Fetch from the Backend
    // boardId should react based on state that is made by a user
    let boardId = '5f66c2e45e333316b0443e80'
    if (this.$route.params.id !== '1') {
      boardId = this.$route.params.id
    }
    fetchBoard(boardId)
      .then(res => {
        this.$store.commit('UPDATE_BOARD_STATE', {
          board: res.data
        })
      })
  },
  methods: {
    updateWidth () {
      const inputLength = this.$refs.boardName.value.length * 8 + 30
      this.$refs.boardName.style.width = inputLength.toString() + 'px'
    },
    clickBoardName () {
      this.nameInputClicked = true
      this.updateWidth()
      this.$refs.boardName.classList.add('board-input-show')
      this.$refs.boardName.focus()
      this.$refs.boardName.select()
    },
    close () {
      this.$router.push({ name: 'board' })
    },
    createColumn () {
      const data = {
        name: this.newColumnName,
        boardId: this.board._id
      }
      this.$store.dispatch('createColumn', data)
      this.newColumnName = ''
    },
    updateBoard (e) {
      if (!this.nameInputClicked || e.target.value.replace(/ /g, '').length === 0) {
        this.nameInputClicked = false
      } else {
        this.nameInputClicked = false
        this.$refs.boardName.classList.remove('board-input-show')
        this.$store.dispatch('updateBoard', { name: e.target.value })
      }
    }
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
.board-header {
  @apply h-10 bg-teal-darker;
  opacity: 50%;
}
.board {
  @apply bg-teal-dark h-full overflow-auto;
}
.board-name {
  cursor: pointer;
  padding: 5px;
  border-radius: 2px;
  vertical-align: center;
}
.board-name:hover {
  background: rgba(255, 255, 255, 0.171);
  cursor: pointer;
  padding: 5px;
  border-radius: 2px;
}
.board-main {
  @apply p-2
}
.board-main-header {
  @apply h-10;
  padding: 4px;
  margin-bottom: 4px;
  /* min-width: 50px; */
  white-space:nowrap;
  display:inline-block;
  float: left;
}
.board-main-header > input {
  @apply rounded;
  height: 100%;
  /* min-width: 50px; */
  width: fit-content;
  max-width: 80vw;
  box-sizing:border-box;
  outline: transparent;
  padding: 4px;
  margin: 4px;
  font-weight: bolder;
  white-space:nowrap;
}
.board-input-hide {
  display: none;
}
.board-input-show {
  display: block;
}
.task-bg {
  @apply pin absolute;
  background: rgba(0,0,0,0.5);
}
</style>
