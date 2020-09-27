export default {
  props: {
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    board: {
      type: Object,
      requied: true
    }
  },
  methods: {
    moveTaskOrColumn (e, toTasks, toColumnIndex, toTaskIndex) {
      const type = e.dataTransfer.getData('type')
      if (type === 'task') {
        this.moveTask(e, toColumnIndex, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
      } else if (type === 'column') {
        this.moveColumn(e, toColumnIndex)
      }
    },
    moveTask (e, toColumn, toTasks, toTask) {
      const fromColumn = e.dataTransfer.getData('from-column-index')
      // const fromTasks = this.board.columns[fromColumnIndex].tasks
      const fromTask = e.dataTransfer.getData('from-task-index')
      this.$store.dispatch('moveTask', {
        fromColumn,
        fromTask,
        toColumn,
        toTask
      })
    },
    moveColumn (e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      this.$store.dispatch('moveColumn', {
        fromColumnIndex,
        toColumnIndex
      })
    }
  }
}
