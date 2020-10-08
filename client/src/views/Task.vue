<template>
  <div class="task-view">
    <div class="flex flex-row flex-grow items-start justify-between px-4">
      <div class="w-4/5">
        <div class="input-main-header">
          <span class="icon-lg icon-clock"></span>
          <span class="window-header-icon icon-lg js-card-header-icon icon-card"></span>
          <h3 class="input-name  task-name" @click.prevent="clickTaskName($event)" v-show="!nameInputClicked">
            {{task.name}}
          </h3>
          <textarea
            ref="taskName"
            class="text-lg input-hide"
            v-bind:class="{'input-show': nameInputClicked}"
            type="text"
            @blur="updateTaskName($event)"
            @keyup.enter="updateTaskName($event)"
            @keyup.esc="updateTaskName($event)"
            v-bind:value="task.name"
          />
        </div>
        <div class="w-1/5">
          in the list
          <router-link :to="{ name: 'board', params: { id: this.$route.params.id } }">{{column.name}}</router-link>
        </div>
        <div class="description-container">
          <h3>description</h3>
          <textarea ref="taskDescription" class="relative bg-trransparent w-full px-2 border mt-2 h-64 border-none leading-normal" :value="task.description" @change="updateTaskProperty($event, 'description')"/>
          <input type="submit" value="Save" @click.prevent="updateTaskDescription($event)">
        </div>
      </div>
      <div class="task-view-right">
        <h3>Actions</h3>
        <ul class="button-list p-1">
          <li><button>Move</button></li>
          <li><button>Copy</button></li>
          <li><button>Delete</button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nameInputClicked: false
    }
  },
  computed: {
    task () {
      return this.$store.getters.getTask(this.$route.params.taskId)
    },
    column () {
      return this.$store.getters.getColumn(this.$route.params.taskId)
    }
  },
  methods: {
    updateTaskProperty (e, key) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key,
        value: e.target.value
      })
    },
    clickTaskName () {
      this.nameInputClicked = true
      // this.updateWidth()
      this.$refs.taskName.classList.add('input-show')
      this.$refs.taskName.focus()
      this.$refs.taskName.select()
    },
    updateTaskName (e) {
      if (!this.nameInputClicked || e.target.value.replace(/ /g, '').length === 0) {
        this.nameInputClicked = false
      } else {
        this.nameInputClicked = false
        this.$refs.taskName.classList.remove('input-show')
        this.$store.dispatch('updateTask', { body: e.target.value, taskId: this.task._id, type: 'name' })
      }
    },
    updateTaskDescription (e) {
      this.$store.dispatch('updateTask', { body: this.$refs.taskDescription.value, taskId: this.task._id, type: 'description' })
    }
  }
}
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-grey pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
.button-list {
  list-style-type: none;
}

</style>
