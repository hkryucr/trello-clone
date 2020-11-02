<template>
  <div class="task-view" @click.prevent="closeEditing">
    <div class="w-full">
      <router-link class="icon-md icon-close dialog-close-button" :to="{ name: 'board', params: { id: this.$route.params.id } }"></router-link>
      <div class="flex flex-col flex-grow items-start justify-between">
        <div class="w-full overflow-hidden">
          <div class="task-header relative">
            <span
              class="window-header-icon task-header-icon icon-lg js-card-header-icon icon-card absolute"
            ></span>
            <div class="task-main-header">
              <input
                ref="taskName"
                class="text-xl m-0 p-0"
                type="text"
                @blur="updateTaskName($event)"
                @keyup.enter="updateTaskName($event)"
                @keyup.esc="updateTaskName($event)"
                v-bind:value="task.name"
              />
            </div>
            <div class="text-sm" style="margin-top: 4px">
              in the list
              <router-link
                class="text-gray-link"
                :to="{ name: 'board', params: { id: this.$route.params.id } }"
                >{{ column.name }}</router-link
              >
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
              <div class="editable" ref="descriptionButton">
                <div v-if="task.description" class="description-edit-controls editable-button">
                  <a href="#" class="description-edit-button" @click.stop.prevent="openEditing">Edit</a>
                </div>
              </div>
            </div>
            <div class="margin-left-40" @click.stop.prevent="openEditing">
              <div class="editable" ref="descriptionWrapper">
                <div class="description-edit-controls">
                  <p>
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
                    class="task-description-input relative overflow-hidden bg-trransparent w-full border h-64 border-none leading-normal resize-none"
                    placeholder="Add a more detailed description…"
                    :value="task.description"
                    @click.stop
                    @change="updateTaskProperty($event, 'description')"
                  />
                  <input
                    class="primary"
                    type="submit"
                    value="Save"
                    @click.stop.prevent="updateTaskDescription($event)"
                  />
                  <button
                    class="text-gray-link icon-lg icon-close dark-hover cancel js-cancel-edit"
                    @click.stop.prevent="closeEditing"
                  ></button>
                </div>
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
                <button class="button-link" @click.stop.prevent="deleteWarning" v-if="!deleteConfirm">
                  <span class="icon-sm icon-trash"></span>Delete
                </button>
              </li>
              <li>
                <button class="button-link button-link-delete-confirm" title="Delete" v-if="deleteConfirm" @click.stop.prevent="deleteTask">
                  <span class="icon-sm icon-remove" style="color: white"></span>Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import _ from 'lodash'
import { fetchBoard } from '../utils/BoardApiUtil'

library.add(faTrashAlt)

export default {
  data () {
    return {
      loaded: false,
      updating: false,
      deleteConfirm: false
    }
  },
  computed: {
    task () {
      if (!this.loaded) {
        return {
          name: '',
          description: ''
        }
      }
      return this.$store.getters.getTask(this.$route.params.taskId)
    },
    column () {
      if (!this.loaded) {
        return {
          name: ''
        }
      }
      return this.$store.getters.getColumn(this.$route.params.taskId)
    }
  },
  mounted () {
    const state = this.$store.state
    if (_.isEmpty(state.board) || state.board._id !== this.$route.params.id) {
      fetchBoard(this.$route.params.id).then(res => {
        this.$store.commit('UPDATE_BOARD_STATE', {
          board: res.data
        })
        this.loaded = true
      })
    } else {
      this.loaded = true
    }
  },
  methods: {
    deleteWarning () {
      this.deleteConfirm = true
    },
    updateTaskProperty (e, key) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key,
        value: e.target.value
      })
    },
    updateTaskName (e) {
      if (e.target.value.replace(/ /g, '').length !== 0 && e.target.value !== this.task.name && !this.updating) {
        this.updating = true
        this.$store.dispatch('updateTask', {
          body: e.target.value,
          taskId: this.task._id,
          type: 'name'
        }).then(() => {
          this.$refs.taskName.blur()
          this.updating = false
        })
      } else {
        this.$refs.taskName.blur()
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
      this.$router.push({ name: 'board', params: { id: this.$route.params.id } })
    },
    openEditing () {
      this.$refs.descriptionWrapper.classList.add('editing')
      this.$refs.descriptionButton.classList.add('editing')
      this.$refs.taskDescription.focus()
      this.$refs.taskDescription.select()
    },
    closeEditing () {
      if (this.$refs.descriptionWrapper) this.$refs.descriptionWrapper.classList.remove('editing')
      if (this.$refs.descriptionButton) this.$refs.descriptionButton.classList.remove('editing')
      this.deleteConfirm = false
    }
  }
}
</script>

<style>
.task-view {
  @apply relative flex flex-col pin mx-4 m-32 mx-auto pb-4 text-left rounded shadow;
  width: 768px;
  background: #f4f5f7;
}
.task-view .dialog-close-button {
  display: flex;
  vertical-align: center;
  align-items: center;
  justify-content: center;
}
.task-header {
  margin: 12px 40px 8px 56px;
  /* box-sizing: border-box; */
}
.task-main-header {
  padding: 3px 0;
  white-space: nowrap;
  display: block;
}
.dialog-close-button {
  color: #42526e;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  height: 32px;
  overflow: hidden;
  padding: 4px;
  margin: 4px;
  width: 32px;
  z-index: 2;
  transition: background-color 85ms,color 85ms;
}
.dialog-close-button:hover {
  background-color: rgba(9,30,66,.08);
  color: #42526e;
}
.task-main-header > input {
  max-width: 100%;
  box-sizing: border-box;
  outline: transparent;
  white-space: nowrap;
  background: transparent;
  border-radius: 3px;
  box-shadow: none;
  font-size: 20px;
  font-weight: 600;
  height: 32px;
  line-height: 24px;
  margin: -4px -8px;
  min-height: 24px;
  padding: 4px 8px;
  width: 100%;
}
.task-main-header > input:focus {
  box-shadow: inset 0 0 0 2px #0079bf;
  background: #fff;
}
.task-header-icon, .task-description-icon {
  left: -40px;
}
.task-main {
  padding: 0 8px 8px 16px;
}
.description-header {
  display: flex;
  align-items: center;
  min-height: 48px;
  padding: 8px 0;
  position: relative;
  margin: 0 0 0px 40px;
  height: 3rem;
}
.description-header  h3 {
  font-size: 16px;
}
.task-description-input {
  min-height: 108px;
  overflow-wrap: break-word;
  border-radius: 3px;
  font-size: 14px;
  padding: 6px 12px;
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
.margin-left-40 {
  margin-left: 40px;
}
.editable .description-edit-controls {
  cursor: pointer;
  word-break: break-word;
  word-wrap: break-word;
  overflow-wrap: break-word;
  /* background-color: rgba(9,30,66,.04); */
  box-shadow: none;
  border: none;
  border-radius: 3px;
  display: block;
  min-height: 40px;
  /* padding: 8px 12px; */
  text-decoration: none;
}
/* .description-edit-controls:hover {
  background-color: rgba(9, 30, 66, .08);
} */
.description-edit-controls p {
  margin: 0 0 8px;
  font-size: 14px;
}
.editable .description-edit-button {
  box-sizing: border-box;
  -webkit-appearance: none;
  border-radius: 3px;
  display: inline-block;
  line-height: 20px;
  padding: 6px 12px;
  margin: 0 0 0 8px;
  background-color: rgba(9,30,66,.04);
  box-shadow: none;
  border: none;
  font-weight: 400;
  text-align: center;
  color: #172b4d;
  font-size: 14px;
}
.editable .description-input {
  display: none;
}
.editing .description-edit-controls {
  display: none;
}
.editable-button {
  padding-left: 0 !important;
  background: none !important;
  display: flex !important;
  align-items: center !important;
}
.editable-button > a:hover {
background-color: rgba(9, 30, 66, .08);
}
.editing .description-input {
  display: block;
  float: left;
  padding-bottom: 9px;
  z-index: 50;
  width: 100%;
}
input[type="submit"].primary, button.primary {
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
input[type="submit"].primary:hover, button.primary:hover {
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
.button-link:hover {
  background-color: rgba(9,30,66,.08);
  box-shadow: none;
  border: none;
}
.button-link-delete-confirm {
  background-color: #cf513d;
  color: white
}
.button-link-delete-confirm:hover {
  background-color: #eb5a46;
  box-shadow: none;
  border: none;
  color: #fff;
}
.task-view-right > h3 {
    padding: .25rem;
}
.task-view-right .button-link {
  display: flex;
}
.task-view-right .button-link .icon-move, .task-view-right .button-link .icon-copy,.task-view-right .button-link .icon-trash,  .task-view-right .button-link .icon-remove{
  margin-right: 6px;
}
</style>
