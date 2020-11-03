<template>
<div>
  <div class='side-menu-header-container'>
    <div @click.stop.prevent="updateComponent('splash')" class="board-menu-header-back-button icon-lg icon-back js-pop-widget-view"></div>
    <div class='side-menu-header'>Change Background</div>
    <div class='side-menu-close' v-on:click.prevent="closeModal"><img src="../../assets/exit.svg" alt=""></div>
  </div>
  <div @click.stop.prevent="updateComponent('photo')" class='background-options-container'>
    <div class='background-option'>
      <div class='background-img-container'>
        <img src="https://a.trellocdn.com/prgb/dist/images/photos-thumbnail@3x.48948499e309aef794d7.jpg" alt="">
      </div>
      <div class='background-option-text'>Photos</div>
    </div>
    <div @click.stop.prevent="updateComponent('color')" class='background-option'>
      <div class='background-img-container'>
        <img src="https://a.trellocdn.com/prgb/dist/images/colors@2x.864f4df15d825e89e199.jpg" alt="">
      </div>
      <div class='background-option-text'>Colors</div>
    </div>
  </div>
</div>
</template>

<script>
import EventBus from '../../utils/eventBus'

export default {
  props: ['board'],
  methods: {
    updateComponent (component) {
      EventBus.$emit('updateComponent', component)
    },
    closeModal () {
      EventBus.$emit('closeSideMenu')
    }
  },
  mounted () {
    this.$store.dispatch('fetchBackgrounds')
      .then(async res => {
        await this.$store.commit('SET_BACKGROUNDS', res.data)
      })
  }
}
</script>

<style>
.board-menu-header-back-button{
  grid-row: 1;
  grid-column: 1;
}
.board-menu-header-back-button:hover {
  cursor: pointer;
}
.icon-back::before{
  line-height: 50px;
}
.background-options-container{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(9,30,66,.13);
  margin: 10px;
}
.background-img-container{
  width: 148px;
  height: 96px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.background-img-container:hover{
  opacity: 70%;
}
.background-option {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.background-option:hover{
  cursor: pointer;
}
.background-option-text {
  padding-top: 8px;
  font-size: 14px;
  font-weight: 500;
}
</style>
