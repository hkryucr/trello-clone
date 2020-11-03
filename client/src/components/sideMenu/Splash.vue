<template>
<div>
  <div class='side-menu-header-container'>
    <div class='side-menu-header'>Menu</div>
    <div class='side-menu-close' v-on:click.prevent="closeModal"><img src="../../assets/exit.svg" alt=""></div>
  </div>
  <div class='side-menu-splash-options-container'>
    <div @click.stop.prevent="deadMessage" class='side-menu-splash-option'>
      <div class='side-menu-splash-trello-icon-container'>
        <img src="../../assets/modal-create/create-board.svg" alt="create">
      </div>
      <div class='side-menu-splash-option-text-container'>
        <div class='side-menu-splash-about'>About This Board</div>
        <div class='side-menu-splash-description'>Add a description to your board</div>
      </div>
    </div>
    <div @click.stop.prevent="updateComponent('changeBackground')" class='side-menu-splash-option'>
      <div class='side-menu-splash-bkgrd-icon-container'>
        <img class="side-menu-splash-bkgrd" src="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/128x192/e01af9b7d066f493aead02b94d8b2094/photo-1603408619685-47e71db52d0c.jpg" img>
      </div>
      <div  class='side-menu-splash-text'>Change Background</div>
    </div>
    <div @click.stop.prevent="deadMessage" class='side-menu-splash-option'>
      <div class='side-menu-splash-bkgrd-icon-container'>
        <span style="font-size: 20px" class="icon-sm icon-search board-menu-navigation-item-link-icon"></span>      </div>
      <div class='side-menu-splash-text'>Search Cards</div>
    </div>
    <div @click.stop.prevent="deadMessage" class='side-menu-splash-option'>
      <div class='side-menu-splash-bkgrd-icon-container'>
        <span style="font-size: 20px" class="icon-sm icon-sticker board-menu-navigation-item-link-icon"></span>
      </div>
      <div class='side-menu-splash-text'>Stickers</div>
    </div>
    <div @click.stop.prevent="openDeleteWarningModal" class='side-menu-splash-option'>
      <div class='side-menu-splash-bkgrd-icon-container flex justify-center items-center w-full'>
        <font-awesome-icon icon="trash-alt"/>
      </div>
      <div class='side-menu-splash-text'>Delete Board</div>
    </div>
    <div class="delete-warning-modal-container" style="position:relative;" v-if="isDeleteWarningModalOpen">
      <DeleteWarningModal
      :deleteTarget="deleteBoard"
      :cancel="closeDeleteWarningModal"
      :target="'board'"
      />
    </div>
  </div>
  <b-modal id="modal-5" title="Under Construction">
    <p class="my-4">Sorry we're still working on this account section!</p>
    <img style="width: 150px; height: 100px;" :src="giphs[idx]" alt="">
  </b-modal>
</div>
</template>

<script>
import DeleteWarningModal from '../DeleteWarningModal'
import EventBus from '../../utils/eventBus'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faTrashAlt)

export default {
  components: {
    DeleteWarningModal
  },
  data () {
    return {
      isDeleteWarningModalOpen: false,
      giphs: ['https://media.giphy.com/media/jUZmz3kAiAuLC/giphy.gif', 'https://media.giphy.com/media/11xBk5MoWjrYoE/giphy.gif', 'https://media.giphy.com/media/xonOzxf2M8hNu/giphy.gif', 'https://media.giphy.com/media/bAplZhiLAsNnG/giphy.gif'],
      idx: 0
    }
  },
  props: ['board'],
  methods: {
    deadMessage () {
      this.idx = Math.floor(Math.random() * 4)
      this.$bvModal.show('modal-5')
    },
    async deleteBoard () {
      await this.$store.dispatch('deleteBoard', this.board._id)
      this.isDeleteWarningModalOpen = false
    },
    updateComponent (component) {
      EventBus.$emit('closeDeleteWarningModal')
      EventBus.$emit('updateComponent', component)
    },
    closeModal () {
      EventBus.$emit('closeSideMenu')
    },
    openDeleteWarningModal () {
      this.isDeleteWarningModalOpen = !this.isDeleteWarningModalOpen
    },
    closeDeleteWarningModal () {
      this.isDeleteWarningModalOpen = false
    }
  },
  mounted () {
    const vm = this
    EventBus.$on('closeDeleteWarningModal', function () {
      vm.closeDeleteWarningModal()
    })
  }
}
</script>

<style lang="css">
.side-menu-header-container {
  margin: 0 10px;
  margin-bottom: 8px;
  padding: 0 12px;
  position: relative;
  text-align: center;
  display: grid;
  grid-template-columns: 12px 1fr 12px;
  border-bottom: 1px solid rgba(9,30,66,.13);
  height: 48px;
}
.side-menu-header {
  color: #172b4d;
  line-height: 50px;
  margin: 0;
  grid-column: 1/span3;
  grid-row: 1;
  font-weight: 700;
}
.side-menu-close {
  cursor: pointer;
  grid-column: 3;
  grid-row: 1;
  line-height: 48px;
  width: 10px;
  height: auto;
}
.side-menu-splash-options-container{
  padding: 12px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
}
.side-menu-splash-option:hover{
  background-color: rgba(9,30,66,.08);
  cursor: pointer;
}
.side-menu-splash-option {
  display: flex;
  padding: 6px 12px;
  border-radius: 3px;

}
.side-menu-splash-trello-icon-container{
  width: 21px;
  height: 21px;
  display: inline-flex;
  align-items: center;
  font-size: 20px;
}
.side-menu-splash-about, .side-menu-splash-text {
  color: #172b4d;
  font-size: 14px;
  font-weight: 700;
}
.side-menu-splash-text {
padding: 0 10px;
line-height: 20px;
}
.side-menu-splash-option-text-container{
  padding: 0 10px;
}
.side-menu-splash-description{
  color: #5e6c84;
  font-weight: 400;
  padding-top: 5px;
  font-size: 14px;
}
.side-menu-splash-bkgrd-icon-container {
  width: 20px;
  height: 20px;
}
.side-menu-splash-bkgrd{
  width: 20px;
  height: 20px;
  border-radius: 3px;
}
</style>
