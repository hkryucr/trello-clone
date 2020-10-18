<template>
  <div class="board flex flex-col">
    <NavBar />
    <BoardHeader :board="board" />
    <div class="relative">
      <div
        class="board-main flex flex-col items-start absolute w-screen overflow-x-auto overflow-y-hidden"
      >
        <div class="flex flex-row items-start h-full">
          <BoardColumn
            v-for="(column, $columnIndex) of board.columns"
            :key="$columnIndex"
            :column="column"
            :columnIndex="$columnIndex"
            :board="board"
          />
          <div class="column mod-add is-idle" ref="listWrapper">
            <form class="flex flex-row flex-wrap" @submit.prevent="createColumn">
              <a href="#" class="add-list" @click.prevent="openAddList">
                <span class="icon-sm icon-add"></span>
                Add another list
              </a>
              <input
                type="text"
                v-model="newColumnName"
                class="p-2 mr-2 flex-grow list-add-title"
                placeholder="Enter list title..."
              />
              <div class="list-add-controls">
                <input type="submit" class="primary" value="Add List" />
                <button @click="removeAddList" class="icon-lg icon-close dark-hover"></button>
              </div>
            </form>
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
    fetchBoard(boardId).then((res) => {
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
      this.$refs.listWrapper.classList.add('is-idle')
    },
    openAddList () {
      this.$refs.listWrapper.classList.remove('is-idle')
    },
    removeAddList () {
      this.$refs.listWrapper.classList.add('is-idle')
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
  background: rgba(0, 0, 0, 0.5);
}
.column {
  @apply bg-grey-light p-2 text-left shadow rounded;
  width: 272px;
  margin: 0 4px;
}
.column:first-child {
  margin-left: 8px;
}
.column:last-child {
  margin-right: 8px;
}
.column-name {
  width: 100%;
}
.column.mod-add {
  background-color: #ebecf0;
  border-radius: 3px;
  height: auto;
  min-height: 32px;
  padding: 4px;
  transition: background 85ms ease-in, opacity 40ms ease-in,
    border-color 85ms ease-in;
}

.column.mod-add.is-idle {
  background-color: hsla(0, 0%, 100%, 0.24);
  cursor: pointer;
}
.column.mod-add .add-list {
  color: #fff;
  display: none;
  padding: 6px 8px;
  transition: color 85ms ease-in;
}

.column.mod-add.is-idle .icon-add {
    color: #fff;
    margin-right: 2px;
}

.column.mod-add.is-idle .add-list {
  display: block;
}

.column.mod-add.is-idle .list-add-controls {
  overflow: hidden;
  margin: 4px 0 0;
  transition: margin 85ms ease-in, height 85ms ease-in;
  height: 32px;
}

.column.mod-add.is-idle .list-add-controls {
  height: 0;
  margin: 0;
}

.column.mod-add .list-add-title {
  background: #fff;
  border: none;
  box-shadow: inset 0 0 0 2px #0079bf;
  display: block;
  margin: 0;
  transition: margin 85ms ease-in, background 85ms ease-in;
  width: 100%;
}
.column.mod-add.is-idle .list-add-title {
  background: none;
  border-color: transparent;
  box-shadow: none;
  cursor: pointer;
  display: none;
  margin: 0;
}
</style>
