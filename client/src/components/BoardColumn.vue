<template>
  <div
    class="column flex flex-col max-h-full"
    @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="pickupColumn($event, columnIndex)"
    draggable
  >
    <div class="flex items-center mb-2 font-bold">
      <div class="input-main-header">
        <h3
          class="input-name column-name"
          @click.prevent="clickColumnName($event)"
          v-show="!nameInputClicked"
        >
          {{ column.name }}
        </h3>
        <textarea
          ref="columnName"
          class="text-lg input-hide"
          v-bind:class="{ 'input-show': nameInputClicked }"
          type="text"
          @blur="updateColumn($event)"
          @keyup.enter="updateColumn($event)"
          @keyup.esc="updateColumn($event)"
          v-bind:value="column.name"
        />
      </div>
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
    <div class="task-composer task-hide" ref="taskWrapper">
      <div class="task">
        <textarea
            ref="newTaskInput"
            class="block p-2 w-full bg-transparent task-composer-textarea"
            placeholder="Enter a title for this card…"
            v-model="newTaskName"
            @input="updateHeight"
            @keyup.enter="createTask"
            @keyup.esc="createTask"
        />
      </div>
      <div class="task-controls">
        <input type="submit" class="primary" value="Add Card" @click.prevent="createTask">
        <a href="#" class="icon-lg icon-close dark-hover js-cancel" @click.prevent="closeAddCard"></a>
      </div>
    </div>
    <div class="task-composer-container" ref="addTaskContainer">
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

export default {
  components: { ColumnTask },
  mixins: [movingTasksAndColumns],
  data () {
    return {
      newTaskName: '',
      nameInputClicked: false,
      throttling: false
    }
  },
  methods: {
    updateHeight () {
      if (!this.throttling) {
        console.log('updating')
        this.throttling = true
        this.$refs.newTaskInput.style.height = 'auto'
        this.$refs.newTaskInput.style.height = this.$refs.newTaskInput.scrollHeight + 5 + 'px'
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
      const data = {
        name: this.newTaskName,
        columnId: this.column._id
      }
      this.$store.dispatch('createTask', data)
      this.newTaskName = ''
    },
    updateColumn (e) {
      if (
        !this.nameInputClicked ||
        e.target.value.replace(/ /g, '').length === 0
      ) {
        this.nameInputClicked = false
      } else {
        this.nameInputClicked = false
        this.$refs.columnName.classList.remove('input-show')
        this.$store.dispatch('updateColumn', {
          name: e.target.value,
          columnId: this.column._id
        })
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
      this.$refs.taskWrapper.classList.add('task-hide')
      this.$refs.addTaskContainer.classList.remove('task-hide')
      this.removeClickListener()
    },
    outsideClickListener (event) {
      if (event.target.closest('div.task-composer') === null && event.target.closest('div.task-composer-container') === null) {
        this.closeAddCard()
      }
    },
    removeClickListener () {
      document.removeEventListener('click', this.outsideClickListener)
    }
  }
}
</script>

<style lang="css">
.input-main-header > textarea {
  @apply rounded;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  outline: transparent;
  padding: 4px;
  padding-left: 4px;
  font-size: 14px;
  font-weight: 600;
  white-space: wrap;
  resize: none;
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
  margin: 2px 0 8px 8px;
  padding: 4px 8px;
  position: relative;
  text-decoration: none;
  -webkit-user-select: none;
  user-select: none;
}

.open-task-composer span {
  color: #5e6c84;
  margin-right: 2px;
}

.task-hide {
  display: none;
}

</style>
