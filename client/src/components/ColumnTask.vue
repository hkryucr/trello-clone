<template>
  <div class="task"
    @click="goToTask(task)"
    draggable
    @dragstart="pickupTask($event, taskIndex, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
  >
    <span class="w-full flex-no-shrink font-bold">
      {{task.name}}
    </span>
    <p
      v-if="task.description"
      class="w-full flex-no-shrink mt-1 text-sm">
        <span class="icon-description icon-lg window-module-title-icon"></span>
    </p>
  </div>
</template>

<script>
import movingTasksAndColumns from '@/mixins/movingTasksAndColumns'

export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  mixins: [movingTasksAndColumns],
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { taskId: task._id } })
    },
    pickupTask (e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('from-task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'task')
    }
  }
}
</script>

<style lang="css">

</style>
