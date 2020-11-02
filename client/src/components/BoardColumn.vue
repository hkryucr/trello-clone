<template>
  <div
    class="column flex flex-col max-h-full"
    @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="pickupColumn($event, columnIndex)"
    draggable
    style="background-color: #ebecf0;"
  >
    <div class="flex justify-between mb-3 font-bold">
        <div class="input-main-header w-full">
          <textarea
            ref="columnName"
            class="text-lg input-show"
            type="text"
            rows="1"
            @click.prevent="selectAllText"
            @input="updateHeight($event)"
            @blur="updateColumn($event)"
            @keydown.enter.exact.prevent
            @keyup.enter.exact="updateColumn($event)"
            @keyup.esc="updateColumn($event)"
            v-bind:value="column.name"
          />
        </div>
        <button @click.prevent="deleteColumn" class="self-start">
          <span class="icon-sm icon-close"></span>
        </button>
    </div>
    <div class="list-reset overflow-y-auto">
      <ColumnTask
        v-for="(task, $taskIndex) of column.tasks"
        :key="$taskIndex"
        :task="task"
        :column="column"
        :taskIndex="$taskIndex"
        :board="board"
        :columnIndex="columnIndex"
      />
    </div>
    <div class="task-composer task-hide" ref="taskWrapper" :id="'task-' + columnIndex">
      <div class="task">
        <textarea
            ref="newTaskInput"
            class="block p-2 w-full bg-transparent task-composer-textarea"
            placeholder="Enter a title for this card…"
            v-model="newTaskName"
            @input="updateHeight($event)"
            @keydown.enter.exact.prevent
            @keyup.enter.exact="createTask"
            @keyup.esc="closeAddCard"
        />
      </div>
      <div class="task-controls">
        <input type="submit" class="primary" value="Add Card" @click.prevent="createTask" style="margin: 4px 4px 0 0;font-size: 14px; font-weight: 400">
        <a href="#" class="icon-lg icon-close dark-hover js-cancel" @click.prevent="closeAddCard"></a>
      </div>
    </div>
    <div class="task-composer-container" ref="addTaskContainer" :id="'composer-' + columnIndex">
      <a href="#" class="open-task-composer" @click.prevent="openAddCard">
        <span class="icon-sm icon-add"></span>
        <span>Add a card</span>
      </a>
    </div>
  </div>
</template>

<script>
import ColumnTask from '@/components/ColumnTask'
import movingTasksAndColumns from '@/mixins/movingTasksAndColumns'
import { mapGetters } from 'vuex'
import autosize from 'autosize'

export default {
  components: { ColumnTask },
  mixins: [movingTasksAndColumns],
  data () {
    return {
      newTaskName: '',
      throttling: false,
      updating: false
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  mounted () {
    this.$refs.columnName.style.display = 'none'
    autosize(this.$refs.columnName)
    autosize(this.$refs.newTaskInput)
    this.$refs.columnName.style.display = ''
    autosize.update(this.$refs.columnName)
  },
  methods: {
    selectAllText () {
      this.$refs.columnName.select()
    },
    updateHeight (e) {
      if (!this.throttling) {
        this.throttling = true
        autosize.update(e.target)
        window.setTimeout(() => {
          this.throttling = false
        }, 100)
      }
    },
    clickColumnName () {
      this.nameInputClicked = true
      this.$refs.columnName.classList.add('input-show')
      this.$refs.columnName.focus()
      this.$refs.columnName.select()
    },
    pickupColumn (e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
    },
    createTask (e) {
      if (this.newTaskName.replace(/ /g, '').length !== 0) {
        const data = {
          name: this.newTaskName,
          columnId: this.column._id,
          userId: this.getUser._id
        }
        this.$store.dispatch('createTask', data)
        this.newTaskName = ''
      }
    },
    updateColumn (e) {
      if (e.target.value.replace(/ /g, '').length !== 0 && this.column.name !== e.target.value && !this.updating) {
        this.$refs.columnName.classList.remove('input-show')
        this.updating = true
        this.$store.dispatch('updateColumn', {
          name: e.target.value,
          columnId: this.column._id
        }).then(() => {
          this.$refs.columnName.blur()
          this.updating = false
        })
      } else {
        this.$refs.columnName.blur()
      }
    },
    openAddCard () {
      this.$refs.taskWrapper.classList.remove('task-hide')
      this.$refs.newTaskInput.focus()
      this.$refs.newTaskInput.select()
      this.$refs.addTaskContainer.classList.add('task-hide')
      document.addEventListener('click', this.outsideClickListener)
    },
    closeAddCard () {
      this.newTaskName = ''
      if (this.$refs.taskWrapper) this.$refs.taskWrapper.classList.add('task-hide')
      if (this.$refs.addTaskContainer) this.$refs.addTaskContainer.classList.remove('task-hide')
      this.removeClickListener()
    },
    outsideClickListener (event) {
      if (event.target.closest(`#task-${this.columnIndex}`) === null && event.target.closest(`#composer-${this.columnIndex}`) === null) {
        this.closeAddCard()
      }
    },
    removeClickListener () {
      document.removeEventListener('click', this.outsideClickListener)
    },
    deleteColumn () {
      this.$store.dispatch('deleteColumn', {
        column: this.column,
        idx: this.columnIndex
      })
    }
  }
}
</script>

<style lang="css">
.input-main-header > textarea {
  width: 100%;
  font-size: 14px;
  white-space: wrap;
  line-height: 20px;
  transition-property: background-color,border-color,box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  background: transparent;
  border-radius: 3px;
  box-shadow: none;
  font-weight: 600;
  margin: -4px 0;
  height: 20px;
  min-height: 20px;
  padding: 4px 8px;
  padding-left: 4px;
  resize: none;
  cursor: pointer;
  max-height: 256px;
}

.input-main-header > textarea:focus {
  box-shadow: inset 0 0 0 2px #0079bf;
  background: #fff;
}

textarea.task-composer-textarea {
  background: none;
  border: none;
  box-shadow: none;
  height: auto;
  resize: none;
  margin-bottom: 4px;
  max-height: 162px;
  min-height: 54px;
  overflow: hidden;
  overflow-wrap: break-word;
  padding: 0;
  font-size: 14px;
}

.task-composer-container {
  min-height: 38px;
  max-height: 38px;
  display: flex;
  justify-content: space-between;
}

.open-task-composer {
  border-radius: 3px;
  color: #5e6c84;
  display: block;
  flex: 1 0 auto;
  /* margin: 2px 0 8px 8px; */
  padding: 6px 8px 12px 6px;
  position: relative;
  text-decoration: none;
  -webkit-user-select: none;
  user-select: none;
  font-size: 14px;
  line-height: 20px;
}

.open-task-composer span {
  color: #5e6c84;
  margin-right: 2px;
}

.task-hide {
  display: none;
}

.task-controls > input[type="submit"] {
  margin: 4px 4px 0 0;
}
</style>
