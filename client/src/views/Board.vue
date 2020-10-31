<template>
  <div class="board flex flex-col" ref="board" :style="insertBackground">
    <NavBar />
    <div class="flex flex-col">
      <BoardHeader :board="board" />
      <div class="relative">
        <div
          :class="[board && board.background && board.background.backgroundType === 'image' ? 'board-gradient' : '']"
          class="board-main flex flex-col items-start w-full overflow-x-auto overflow-y-hidden"
        >
          <div class="flex flex-row items-start h-full">
            <BoardColumn
              v-for="(column, $columnIndex) of board.columns"
              :key="$columnIndex"
              :column="column"
              :columnIndex="$columnIndex"
              :board="board"
            />
            <div class="column mod-add is-idle" ref="listWrapper" @click.stop.prevent="openAddList" @blur="removeAddList">
              <form
                class="flex flex-row flex-wrap add-list-form"
              >
                <a
                  href="#"
                  class="add-list-button"
                >
                  <span class="icon-sm icon-add"></span>
                  Add a list
                </a>
                <input
                  ref="newColumnInput"
                  type="text"
                  v-model="newColumnName"
                  class="p-2 mr-2 flex-grow add-list-title"
                  placeholder="Enter list title..."
                />
                <div class="add-list-controls">
                  <button @click.stop.prevent="createColumn" class="primary" value="">
                    Add List
                  </button>
                  <button
                    @click.stop.prevent="removeAddList"
                    class="icon-lg icon-close dark-hover"
                  ></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="task-bg" v-if="isTaskOpen" @click.self="close">
      <router-view></router-view>
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
    ...mapState(['board']),
    insertBackground () {
      if (this.board && this.board.background) {
        return `${(this.board.background.backgroundType === 'color') ? ('background-color:' + this.board.background.template) : ('background-image: url(' + this.board.background.template + ');')}`
      } else {
        return ''
      }
    }
  },
  mounted () {
    let boardId = this.$route.params.id
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
      if (this.newColumnName.length > 0) {
        this.$store.dispatch('createColumn', data)
        this.newColumnName = ''
        this.$refs.listWrapper.classList.add('is-idle')
      }
    },
    openAddList () {
      this.$refs.listWrapper.classList.remove('is-idle')
      this.$refs.newColumnInput.focus()
      this.$refs.newColumnInput.select()
      document.addEventListener('click', this.outsideClickListener)
    },
    removeAddList () {
      this.newColumnName = ''
      this.$refs.listWrapper.classList.add('is-idle')
      this.removeClickListener()
    },
    outsideClickListener (event) {
      if (event.target.closest('form.add-list-form') === null) {
        this.removeAddList()
      }
    },
    removeClickListener () {
      document.removeEventListener('click', this.outsideClickListener)
    }
  }
}
</script>

<style lang="css">
.board {
  @apply h-full overflow-auto;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.board-main {
  /* padding-bottom: 20px; */
  height: calc(100vh - 88px);
}
.board-gradient {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.24) 0,
    rgba(0, 0, 0, 0.24) 48px,
    transparent 80px,
    transparent
  );
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
.column.mod-add .add-list-button {
  color: #fff;
  display: none;
  padding: 6px 8px;
  transition: color 85ms ease-in;
}

.column.mod-add.is-idle .add-list-button {
  display: block;
}

.column.mod-add.is-idle .icon-add {
  color: #fff;
  margin-right: 2px;
}

.column.mod-add .add-list-controls {
  overflow: hidden;
  margin: 4px 0 0;
  transition: margin 85ms ease-in, height 85ms ease-in;
}

.column.mod-add.is-idle .add-list-controls {
  height: 0;
  margin: 0;
}

.column.mod-add .add-list-title {
  background-color: #fff;
  border: none;
  box-shadow: inset 0 0 0 2px #0079bf;
  display: block;
  margin: 0;
  transition: margin 85ms ease-in, background-color 85ms ease-in;
  width: 100%;
}
.column.mod-add.is-idle .add-list-title {
  background-color: none;
  border-color: transparent;
  box-shadow: none;
  cursor: pointer;
  display: none;
  margin: 0;
}
.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
