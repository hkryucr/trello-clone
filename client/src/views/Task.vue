<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between">
      <div class="w-full">
        <div class="task-header flex flex-row relative flex-wrap">
          <span
            class="window-header-icon task-header-icon left-20 icon-lg js-card-header-icon icon-card absolute"
          ></span>
          <div class="w-full h-auto m-0 p-0">
            <div class="task-main-header">
              <h2
                class="input-name task-name m-0 p-0"
                @click.prevent="clickTaskName($event)"
                v-show="!nameInputClicked"
              >
                {{ task.name }}
              </h2>
              <input
                ref="taskName"
                class="text-lg input-hide m-0 p-0"
                v-bind:class="{ 'input-show': nameInputClicked }"
                type="text"
                @blur="updateTaskName($event)"
                @keyup.enter="updateTaskName($event)"
                @keyup.esc="updateTaskName($event)"
                v-bind:value="task.name"
              />
            </div>
            <div>
              in the list
              <router-link
                  class="text-gray-link"
                :to="{ name: 'board', params: { id: this.$route.params.id } }"
                >{{ column.name }}</router-link
              >
            </div>
          </div>
        </div>
      </div>
      <div class="task-main flex flex-row flex-grow items-start justify-between w-full">
        <div class="w-4/5">
          <div class="task-description relative">
            <span class="task-description-icon icon-description icon-lg window-module-title-icon absolute"></span>
            <h3>description</h3>
            <textarea
              ref="taskDescription"
              class="relative bg-trransparent w-full px-2 border mt-2 h-64 border-none leading-normal"
              :value="task.description"
              @change="updateTaskProperty($event, 'description')"
            />
            <input
              type="submit"
              value="Save"
              @click.prevent="updateTaskDescription($event)"
            />
          </div>
        </div>
        <div class="task-view-right w-1/5">
          <h3>Actions</h3>
          <ul class="button-list p-1">
            <li class="flex flex-row"><button><span class="icon-sm icon-move"></span>Move</button></li>
            <li class="flex flex-row"><button><span class="icon-sm icon-copy"></span>Copy</button></li>
            <li class="flex flex-row"><button><span class="icon-sm icon-archive"></span>Delete</button></li>
          </ul>
        </div>
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
      if (
        !this.nameInputClicked ||
        e.target.value.replace(/ /g, '').length === 0
      ) {
        this.nameInputClicked = false
      } else {
        this.nameInputClicked = false
        this.$refs.taskName.classList.remove('input-show')
        this.$store.dispatch('updateTask', {
          body: e.target.value,
          taskId: this.task._id,
          type: 'name'
        })
      }
    },
    updateTaskDescription (e) {
      this.$store.dispatch('updateTask', {
        body: this.$refs.taskDescription.value,
        taskId: this.task._id,
        type: 'description'
      })
    }
  }
}
</script>

<style>
.task-view {
  @apply relative flex flex-col pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  width: 768px;
  background: #f4f5f7;
}
.task-header {
  margin: 12px 40px 8px 56px;
  /* box-sizing: border-box; */
}
.task-main-header {
  padding: 3px 0;
  white-space:nowrap;
  display:inline-block;
}
.task-main-header > input {
  @apply rounded;
  height: 100%;
  width: fit-content;
  max-width: 100%;
  box-sizing:border-box;
  outline: transparent;
  font-weight: bolder;
  white-space:nowrap;
}
.task-name {
  padding: 0;
}
.task-name:hover {
  padding: 0;
}
.task-header-icon {
  left: -40px;
}
.task-description-icon {
  left: -40px;
}
.task-description {
  padding: 8px 0;
}
.task-main {
  padding: 0 8px 8px 16px;
}
.task-description {
  margin: 0 0 4px 40px;
}
.button-list {
  list-style-type: none;
}
</style>
