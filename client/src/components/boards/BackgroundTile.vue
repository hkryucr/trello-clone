<script>
export default {
  props: ['bkgrd']
  // methods: {
  //   updateIdx () {
  //     this.$emit('click', this.idx)
  //     console.log(this.idx)
  //   }
  // }
}
</script>
<template>
<div>
  <button class='background-tile-container' :style="`${(bkgrd.backgroundType === 'color') ? ('background-color:' + bkgrd.template) : ('background-image: url(' + bkgrd.template + ');')}`">
    <div class='background-tile'>
    </div>
  </button>
</div>
</template>
<style>
.background-tile-container{
  width: 28px;
  height: 28px;
  margin-bottom: 6px;
  align-items: center;
  background-position: 50%;
  background-size: cover;
  border-radius: 3px;
  box-shadow: none;
  display: flex;
  justify-content: center;
  outline: 0;
  position: relative;
  cursor: pointer;
}
</style>
