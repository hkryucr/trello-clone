<template>
  <div class="task" @click="goToTask(task)">
    <span class="w-full flex-no-shrink" style="font-size: 14px; font-weight: 500">
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
    deleteTask (task) {
      this.$store.dispatch('deleteTask', task)
    }
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
  background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
    cursor: pointer;
    display: block;
    margin-bottom: 8px;
    max-width: 300px;
    min-height: 20px;
    position: relative;
    text-decoration: none;
    z-index: 0;
}
.task:hover {
  background-color: #f4f5f7;
  border-bottom-color: rgba(9, 30, 66, .25);
}
</style>
