<template>
  <div class="board">``
    <div class="board-header">
      {{board.name}}
    </div>
    <div class="board-main flex flex-col items-start">
      <div class="board-main-header">
        <input class="text-lg" type="text" v-model="board.name">
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
      <div class="task-bg"
        v-if="isTaskOpen"
        @click.self="close"
      >
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '@/components/BoardColumn'

export default {
  components: {
    BoardColumn
  },
  data () {
    return {
      newColumnName: ''
    }
  },
  computed: {
    isTaskOpen () {
      return this.$route.name === 'task'
    },
    ...mapState(['board'])
  },
  sockets: {
    connect () {
      this.isConnected = true
      console.log('socket is connected to the board')
    }
  },
  mounted () {
    this.sockets.subscribe('newColumn', (data) => {
      console.log('receiving column')
      const { name } = data
      this.$store.commit('CREATE_COLUMN', {
        name
      })
    })
  },
  methods: {
    close () {
      this.$router.push({ name: 'board' })
    },
    createColumn () {
      // this.$store.commit('CREATE_COLUMN', {
      //   name: this.newColumnName
      // })
      this.$socket.emit('createColumn', { name: this.newColumnName, board: '5f66c2e45e333316b0443e80' })
      this.newColumnName = ''
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
.board-main {
  @apply p-2
}
.board-main-header {
  @apply h-10;
  padding: 4px;
  margin-bottom: 4px;
  min-width: 50px;
  white-space:nowrap;
  display:inline-block;
  float: left;
}
.board-main-header > input {
  @apply rounded;
  height: 100%;
  min-width: 50px;
  background: transparent;
  outline: transparent;
  padding: 4px;
  margin: 4px;
  font-weight: bolder;
  color: white;
  white-space:nowrap;
  display:block;
}
.board-main-header > input:hover {
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
}
.task-bg {
  @apply pin absolute;
  background: rgba(0,0,0,0.5);
}
</style>
