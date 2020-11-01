<template>
  <div class="board flex flex-col" ref="board" :style="insertBackground">
    <NavBar />
    <div class="flex flex-col">
      <div v-bind:class="{'sideMenuOpen': this.sideMenu}">
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
              <div class="column mod-add is-idle" ref="listWrapper">
                <form
                  class="flex flex-row flex-wrap add-list-form"
                  @submit.prevent="createColumn"
                  @blur="removeAddList"
                >
                  <a
                    href="#"
                    class="add-list-button"
                    @click.prevent="openAddList"
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
                    <input type="submit" class="primary" value="Add List" style="font-weight: 600;" />
                    <button
                      @click="removeAddList"
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
    <div @click.stop v-bind:class="{'side-menu-active': this.sideMenu, 'side-menu-inactive': !this.sideMenu}">
      <div v-if='this.sideMenu' class='side-menu-container'>
        <Splash v-if="this.component === 'splash'" :board="board"/>
        <ChangeBackground v-if="this.component === 'changeBackground'" :board="board"/>
        <Color v-if="this.component === 'color'" :board="board" />
        <Photo v-if="this.component === 'photo'" :board="board" />
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
import Splash from '../components/sideMenu/Splash'
import ChangeBackground from '../components/sideMenu/ChangeBackground'
import Color from '../components/sideMenu/Color'
import Photo from '../components/sideMenu/Photo'
import EventBus from '../utils/eventBus'

export default {
  components: {
    BoardColumn,
    NavBar,
    BoardHeader,
    Splash,
    ChangeBackground,
    Color,
    Photo
  },
  data () {
    return {
      newColumnName: '',
      boardName: '',
      sideMenu: false,
      component: 'splash'
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
    fetchBoard(boardId).then(async (res) => {
      await this.$store.commit('UPDATE_BOARD_STATE', {
        board: res.data
      })
      this.$store.dispatch('updateBoardViewDate')
    })
    const vm = this
    EventBus.$on('toggleSideMenu', function () {
      vm.sideMenu = !vm.sideMenu
    })
    EventBus.$on('closeSideMenu', function () {
      vm.sideMenu = false
    })
    EventBus.$on('updateComponent', function (component) {
      vm.component = component
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
  @apply p-2 text-left shadow rounded;
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
  font-size: 14px;
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
  font-weight: 600;
}
.column.mod-add .add-list-button {
  font-size: 14px;
  line-height: 20px;
}
.column.mod-add .add-list-button > span{
  font-size: 16px
}
.column.mod-add.is-idle .add-list-button {
  display: block;
}
.column .add-list-form {
  margin: 2px;
}
.column.mod-add.is-idle .icon-add {
  color: #fff;
  margin-right: 2px;
}

.column.mod-add .add-list-controls {
  overflow: hidden;
  margin: 4px 0 0;
  transition: margin 85ms ease-in, height 85ms ease-in;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
}

.column.mod-add .add-list-controls button {
  margin: 4px 4px 0 0;
}
.column.mod-add.is-idle .add-list-controls {
  height: 0;
  margin: 0;
  font-size: 14px;
  font-weight: 400;
}

.column.mod-add .add-list-title {
  background-color: #fff;
  border: none;
  box-shadow: inset 0 0 0 2px #0079bf;
  display: block;
  margin: 0;
  transition: margin 85ms ease-in, background-color 85ms ease-in;
  width: 100%;
  font-size: 14px;
  padding: 8px 12px;
}
.column.mod-add.is-idle .add-list-title {
  background-color: none;
  border-color: transparent;
  box-shadow: none;
  cursor: pointer;
  display: none;
  margin: 0;
  font-size: 14px;
  padding: 8px 12px;
}
.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
.sideMenuOpen {
  margin-right: 339px;
}
.side-menu-container {
  width: 339px;
  height: calc(100vh - 40px);
  background: #fff;
  top: 40px;
  right: 0;
  position: absolute;
  box-shadow: 0 12px 24px -6px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);
}
.side-menu-inactive {
  transform: translateX(339px)
}

</style>
