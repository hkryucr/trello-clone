<template>
  <div @click.stop.prevent="updateBackground(background, board._id)" v-if="background.backgroundType === type " :style="`${(background.backgroundType === 'color') ? ('background-color:' + background.template) : ('background-image: url(' + background.template + ');')}`" class='side-menu-tile'>
  </div>
</template>

<script>
export default {
  props: ['background', 'type', 'board'],
  methods: {
    updateBackground (background, boardId) {
      const data = {
        background,
        boardId
      }
      this.$store.dispatch('updateBackground', data)
    }
  }
}
</script>

<style>
  .side-menu-tile {
    height: 96px;
    width: 156px;
    border-radius: 5px;
    overflow: hidden;
    background-size: cover;
    background-position: 50%;
    margin: 5px;
  }
  .side-menu-tile:hover {
    cursor: pointer;
    opacity: 70%
  }
</style>
