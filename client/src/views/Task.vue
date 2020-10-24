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
      <div
        class="task-main flex flex-row flex-grow items-start justify-between w-full"
      >
        <div class="w-4/5">
          <div class="description-header">
            <span
              class="task-description-icon icon-description icon-lg window-module-title-icon absolute"
            ></span>
            <h3>Description</h3>
            <div class="editable">
              <div class="description-edit-controls">
                <a href="#" class="description-edit-button" @click.prevent="openEditing">Edit</a>
              </div>
            </div>
          </div>
          <div class="editable" ref="descriptionWrapper">
            <div class="description-edit-controls">
              <p @click.prevent="openEditing">
                {{
                  task.description
                    ? task.description
                    : "Add a more detailed description…"
                }}
              </p>
            </div>
            <div class="description-input">
              <textarea
                ref="taskDescription"
                class="task-description-input relative overflow-hidden bg-trransparent w-full px-2 border mt-2 h-64 border-none leading-normal resize-none"
                placeholder="Add a more detailed description…"
                :value="task.description"
                @change="updateTaskProperty($event, 'description')"
              />
              <input
                class="primary"
                type="submit"
                value="Save"
                @click.prevent="updateTaskDescription($event)"
              />
              <button
                class="text-gray-link icon-lg icon-close dark-hover cancel js-cancel-edit"
                @click.prevent="closeEditing"
              ></button>
              <!-- <router-link
                  class="text-gray-link icon-lg icon-close dark-hover cancel js-cancel-edit"
                  :to="{ name: 'board', params: { id: this.$route.params.id } }"
                ></router-link> -->
            </div>
          </div>
        </div>
        <div class="task-view-right w-1/5">
          <h3>Actions</h3>
          <ul class="button-list p-1">
            <li class="flex flex-row">
              <button class="button-link">
                <span class="icon-sm icon-move"></span>Move
              </button>
            </li>
            <li class="flex flex-row">
              <button class="button-link">
                <span class="icon-sm icon-copy"></span>Copy
              </button>
            </li>
            <li class="flex flex-row">
              <button class="button-link" @click.prevent="deleteTask">
                <span class="icon-sm icon-archive"></span>Delete
              </button>
            </li>
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
      this.closeEditing()
    },
    deleteTask () {
      this.$store.dispatch('deleteTask', {
        task: this.task,
        idx: this.task.idx
      })
    },
    openEditing () {
      this.$refs.descriptionWrapper.classList.add('editing')
      this.$refs.taskDescription.focus()
      this.$refs.taskDescription.select()
    },
    closeEditing () {
      this.$refs.descriptionWrapper.classList.remove('editing')
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
  white-space: nowrap;
  display: inline-block;
}
.task-main-header > input {
  @apply rounded;
  height: 100%;
  width: fit-content;
  max-width: 100%;
  box-sizing: border-box;
  outline: transparent;
  font-weight: bolder;
  white-space: nowrap;
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
.task-main {
  padding: 0 8px 8px 16px;
}
.description-header {
  display: flex;
  align-items: center;
  min-height: 32px;
  padding: 8px 0;
  position: relative;
  margin: 0 0 4px 40px
}
.task-description-input {
  min-height: 108px;
  overflow-wrap: break-word;
  border-radius: 3px;
}
.task-description-input:focus {
  box-shadow: inset 0 0 0 2px #0079bf;
}
.task-main > div:first-child {
  padding: 0 8px 8px 0;
}
.button-list {
  list-style-type: none;
}
.editable {
  margin-left: 40px;
}

.editable .description-edit-controls {
  cursor: pointer;
  word-break: break-word;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.description-edit-controls p {
  margin: 0 0 8px;
}
.editable .description-edit-button {
  margin: 0 0 0 8px;
  background-color: rgba(9,30,66,.04);
  box-shadow: none;
  border: none;
}
.editable .description-input {
  display: none;
}
.editing .description-edit-controls {
  display: none;
}

.editing .description-input {
  display: block;
  float: left;
  padding-bottom: 9px;
  z-index: 50;
  width: 100%;
}
input[type="submit"].primary {
  background-color: #5aac44;
  box-shadow: none;
  border: none;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  line-height: 20px;
  margin: 8px 4px 0 0;
  padding: 6px 12px;
  text-align: center;
  border-radius: 3px;
}
input[type="submit"].primary:hover {
  background-color: #61bd4f;
  box-shadow: none;
  border: none;
  color: #fff;
}

.button-link {
  background-color: rgba(9, 30, 66, 0.04);
  box-shadow: none;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  height: 32px;
  color: #172b4d;
  width: 100%;
  text-align: left;
  margin-top: 8px;
  max-width: 300px;
  overflow: hidden;
  padding: 6px 12px;
  position: relative;
  text-decoration: none;
  text-overflow: ellipsis;
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
}
</style>
