<template>
  <div class="board flex flex-col">
    <NavBar />
    <BoardHeader
      :board="board"
    />
    <div class="relative">
      <div class="board-main flex flex-col items-start absolute w-screen overflow-x-auto overflow-y-hidden">
        <div class="flex flex-row items-start h-full">
          <BoardColumn
            v-for="(column, $columnIndex) of board.columns"
            :key="$columnIndex"
            :column="column"
            :columnIndex="$columnIndex"
            :board="board"
          />
          <div class="column">
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
  </div>

</template>

<script>
import { mapState } from 'vuex'
import { fetchBoard } from '../utils/BoardApiUtil'
import BoardColumn from '@/components/BoardColumn'
import NavBar from './NavBar'
import BoardHeader from '@/components/BoardHeader'

export default {
  components: {
    BoardColumn,
    NavBar,
    BoardHeader
  },
  data () {
    return {
      newColumnName: '',
      boardName: ''
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
    }
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
.board {
  @apply bg-teal-dark h-full overflow-auto;
  background-color: #40d9ac;
}
.board-main {
  padding-bottom: 20px;
  height: calc(100vh - 80px);
}
.task-bg {
  @apply pin absolute;
  background: rgba(0,0,0,0.5);
}
</style>
