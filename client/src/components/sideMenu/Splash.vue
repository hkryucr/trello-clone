<template>
<div>
  <div class='side-menu-splash-header-container'>
    <div class='side-menu-splash-header'>Menu</div>
    <div class='side-menu-splash-close' v-on:click.prevent="closeModal"><img src="../../assets/exit.svg" alt=""></div>
  </div>
  <div class='side-menu-splash-options-container'>
    <div class='side-menu-splash-option'>
      <div class='side-menu-splash-trello-icon-container'>
        <img src="../../assets/modal-create/create-board.svg" alt="create">
      </div>
      <div class='side-menu-splash-option-text-container'>
        <div class='side-menu-splash-about'>About This Board</div>
        <div class='side-menu-splash-description'>Add a description to your board</div>
      </div>
    </div>
    <div class='side-menu-splash-option'>
      <div class='side-menu-splash-bkgrd-icon-container'>
        <img class="side-menu-splash-bkgrd" src="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/128x192/e01af9b7d066f493aead02b94d8b2094/photo-1603408619685-47e71db52d0c.jpg" img>
      </div>
      <div class='side-menu-splash-text'>Change Background</div>
    </div>
    <div class='side-menu-splash-option'>
      <div class='side-menu-splash-bkgrd-icon-container'>
        <span style="font-size: 20px" class="icon-sm icon-search board-menu-navigation-item-link-icon"></span>      </div>
      <div class='side-menu-splash-text'>Search Cards</div>
    </div>
    <div class='side-menu-splash-option'>
      <div class='side-menu-splash-bkgrd-icon-container'>
        <span style="font-size: 20px" class="icon-sm icon-sticker board-menu-navigation-item-link-icon"></span>
      </div>
      <div class='side-menu-splash-text'>Stickers</div>
    </div>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style lang="css">
.side-menu-splash-header-container {
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
.side-menu-splash-header {
  color: #172b4d;
  line-height: 50px;
  margin: 0;
  grid-column: 1/span3;
  grid-row: 1;
  font-weight: 700;
}
.side-menu-splash-close {
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
  margin: 5px;
  display: flex;
  flex-direction: column;
}
.side-menu-splash-option:hover{
  background-color: rgba(9,30,66,.08);
}
.side-menu-splash-option {
  display: flex;
  padding: 6px 15px;
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
