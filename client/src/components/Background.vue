<template>
  <div class="background">
    <div class="leftLarge">
      <img src="../assets/Log in to Trello-0.svg" alt="">
    </div>
    <div class="rightLarge">
      <img src="../assets/Log in to Trello-1.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.background {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: -999;
}
.leftLarge {
  position: absolute;
  width: 400px;
  bottom: 0;
  left: 0;
  z-index: -999;
  max-width: 30%;
}
.rightLarge {
  position: absolute;
  width: 400px;
  bottom: 0;
  right: 0;
  z-index: -999;
  max-width: 30%;
}
</style>
