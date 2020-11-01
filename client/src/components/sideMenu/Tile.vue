<template>
  <div v-if="background.backgroundType === type " :style="`${(background.backgroundType === 'color') ? ('background-color:' + background.template) : ('background-image: url(' + background.template + ');')}`" class='side-menu-tile'>
  </div>
</template>

<script>
export default {
  props: ['background', 'type']
  // computed: {
  //   insertBackground () {
  //     return `${(background.backgroundType === 'color') ? ('background-color:' + background.template) : ('background-image: url(' + background.template + ');')}`
  //   }
  // }

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
