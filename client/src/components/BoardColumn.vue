<template>
  <div class="column"
    @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="pickupColumn($event, columnIndex)"
    draggable
  >
      <div class="flex items-center mb-2 font-bold">
          {{column.name}}
      </div>
      <div class="list-reset">
        <ColumnTask
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          :task="task"
          :column="column"
          :taskIndex="$taskIndex"
          :board="board"
          :columnIndex="columnIndex"
        />
        <input
          type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+ Enter new task"
          v-model='name'
          @keyup.enter="createTask($event)"
        >
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
      name: ''
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="css">
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
