<template>
  <div>
    <div class='side-menu-header-container'>
      <div @click.stop.prevent="updateComponent('changeBackground')" class="board-menu-header-back-button icon-lg icon-back js-pop-widget-view"></div>
      <div class='side-menu-header'>Photos</div>
      <div class='side-menu-close' v-on:click.prevent="closeModal"><img src="../../assets/exit.svg" alt=""></div>
   </div>
   <ul class="side-menu-tial-container">
     <Tile v-for="(background, $backgroundIndex) of getBackgrounds" :key="$backgroundIndex" :background=background :type="type" :board="board"/>
   </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EventBus from '../../utils/eventBus'
import Tile from '../sideMenu/Tile'

export default {
  props: ['board'],
  components: {
    Tile
  },
  computed: {
    ...mapGetters(['getBackgrounds'])
  },
  methods: {
    updateComponent (component) {
      EventBus.$emit('updateComponent', component)
    },
    closeModal () {
      EventBus.$emit('closeSideMenu')
    }
  },
  data () {
    return {
      type: 'image'
    }
  }
}
</script>

<style>
  .side-menu-tial-container {
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    height: calc(100vh - 97px);
    align-content: flex-start;
  }
</style>
