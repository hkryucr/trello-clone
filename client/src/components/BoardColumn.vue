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
    <div class="task-composer">
      <textarea
          ref="newTaskInput"
          class="block p-2 w-full bg-transparent task"
          placeholder="Add a task"
          v-model="newTaskName"
      />
    </div>
    <div class="task mod-add is-idle" ref="taskWrapper">
      <form
        class="flex flex-row flex-wrap add-task-form"
        @submit.prevent="createTask"
        @blur="removeAddList"
      >
        <a href="#" class="add-task-button" @click.prevent="openAddList">
          <span class="icon-sm icon-add"></span>
          Add a list
        </a>

        <div class="add-task-controls">
          <input type="submit" class="primary" value="Add Card" />
          <button
            @click="removeAddList"
            class="icon-lg icon-close dark-hover"
          ></button>
        </div>
      </form>
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
      nameInputClicked: false
    }
  },
  methods: {
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
      this.$refs.taskWrapper.classList.remove('is-idle')
      this.$refs.newColumnInput.focus()
      this.$refs.newColumnInput.select()
      document.addEventListener('click', this.outsideClickListener)
    },
    removeAddCard () {
      this.newColumnName = ''
      this.$refs.taskWrapper.classList.add('is-idle')
      this.removeClickListener()
    },
    outsideClickListener (event) {
      if (event.target.closest('form.add-task-form') === null) {
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
</style>
