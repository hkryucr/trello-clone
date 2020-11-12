<template>
  <div
    class="column flex flex-col max-h-full"
    style="background-color: #ebecf0;"
    @mouseenter="openContainer"
    @mouseleave="closeContainer"
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
        <button v-if="!deleteConfirm" @click.stop.prevent="deleteColumnConfirm" class="self-start self-start-button">
          <span class="icon-sm icon-close"></span>
        </button>
        <button v-if="deleteConfirm" @click.stop.prevent="deleteColumn" class="self-start self-start-confirm-button">
          <span class="icon-sm icon-close"></span>
        </button>
    </div>
    <div class="list-reset overflow-y-auto">
      <Container
        group-name="task"
        :get-child-payload="getTaskPayload"
        :drop-placeholder="dropPlaceholderOptions"
        @drop="(e) => onDrop(columnIndex, e)"
        @drag-start="startDragging"
        drag-class="tilt-task"
        drop-class="drop-task"
        v-if="containerOpen"
      >
      <Draggable v-for="(task, $taskIndex) of column.tasks" :key="$taskIndex">
        <ColumnTask
          :task="task"
          :column="column"
          :taskIndex="$taskIndex"
          :board="board"
          :columnIndex="columnIndex"
        />
        </Draggable>
      </Container>
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
import { Container, Draggable } from 'vue-smooth-dnd'
import { mapGetters } from 'vuex'
import autosize from 'autosize'
import EventBus from '../utils/eventBus'

export default {
  props: ['dragging'],
  components: { ColumnTask, Container, Draggable },
  mixins: [movingTasksAndColumns],
  data () {
    return {
      newTaskName: '',
      throttling: false,
      updating: false,
      deleteConfirm: false,
      containerOpen: true,
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true
      }
    }
  },
  computed: {
    ...mapGetters(['getCurrentUser']),
    taskLength () {
      return this.column.tasks.length
    }
  },
  watch: {
    taskLength (length) {
      if (length === 0) {
        this.containerOpen = false
      } else {
        this.containerOpen = true
      }
    }
  },
  mounted () {
    const vm = this
    this.$refs.columnName.style.display = 'none'
    autosize(this.$refs.columnName)
    autosize(this.$refs.newTaskInput)
    this.$refs.columnName.style.display = ''
    autosize.update(this.$refs.columnName)
    EventBus.$on('closeConfirmed', function () {
      vm.deleteConfirm = false
    })
    if (this.column.tasks.length === 0) {
      this.containerOpen = false
    }
  },
  methods: {
    deleteColumnNotConfirm () {
      this.deleteConfirm = false
    },
    deleteColumnConfirm () {
      this.deleteConfirm = true
    },
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
          userId: this.getCurrentUser._id
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
    },
    getTaskPayload (index) {
      return {
        fromTaskIndex: index,
        fromColumnIndex: this.columnIndex
      }
    },
    onDrop (columnIndex, dropResult) {
      if (dropResult.addedIndex !== null) {
        this.$store.dispatch('moveTask', {
          fromColumn: dropResult.payload.fromColumnIndex,
          fromTask: dropResult.payload.fromTaskIndex,
          toColumn: columnIndex,
          toTask: dropResult.addedIndex
        })
      }
      EventBus.$emit('stopDraggingTask')
    },
    openContainer () {
      if (this.dragging) {
        this.containerOpen = true
      }
    },
    closeContainer () {
      if (this.taskLength === 0) {
        this.containerOpen = false
      }
    },
    startDragging () {
      EventBus.$emit('startDraggingTask')
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
.self-start-button > span {
  font-size: 14px;
}
.self-start-button:hover {
  background-color: rgba(9,30,66,.08);
  border-radius: 15%;
}
.self-start-button > span:hover {
  font-size: 16px;
}
.self-start-confirm-button {
  /* background-color: #e26956; */
  background-color: #eb5a46;
  border-radius: 15%;
}
.self-start-confirm-button > span {
  color: white;
  font-size: 14px;
}
.self-start-confirm-button > span:hover {
  font-size: 16px;
}
.tilt-task {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg);
}
.drop-task {
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg);
}
.drop-preview {
  background-color: rgba(150, 150, 200, 0.1);
  /* border: 1px dashed #abc; */
  margin: 5px;
}
</style>
