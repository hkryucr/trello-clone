<template>
  <div class="column flex flex-col max-h-full"
    @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="pickupColumn($event, columnIndex)"
    draggable
  >
    <div class="flex items-center mb-2 font-bold">
        <div class="input-main-header">
          <h3 class="input-name  column-name" @click.prevent="clickColumnName($event)" v-show="!nameInputClicked">{{column.name}}</h3>
          <textarea
            ref="columnName"
            class="text-lg input-hide"
            v-bind:class="{'input-show': nameInputClicked}"
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
      <input
        type="text"
        class="block p-2 w-full bg-transparent"
        placeholder="+ Enter new task"
        v-model='name'
        @keyup.enter="createTask($event)"
      >
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
      name: '',
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
        name: this.name,
        columnId: this.column._id
      }
      this.$store.dispatch('createTask', data)
      this.name = ''
    },
    updateColumn (e) {
      if (!this.nameInputClicked || e.target.value.replace(/ /g, '').length === 0) {
        this.nameInputClicked = false
      } else {
        this.nameInputClicked = false
        this.$refs.columnName.classList.remove('input-show')
        this.$store.dispatch('updateColumn', { name: e.target.value, columnId: this.column._id })
      }
    }
  }
}
</script>

<style lang="css">
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

.input-main-header > textarea {
  @apply rounded;
  height: 100%;
  width: 100%;
  box-sizing:border-box;
  outline: transparent;
  padding: 4px;
  padding-left: 4px;
  font-size: 14px;
  font-weight: 600;
  white-space:wrap;
  resize: none;
}
</style>
