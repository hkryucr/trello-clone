<template>
  <div class='modal-information'>
    <div class='modal-information-header-container'>
        <div class='modal-information-header'>Information</div>
        <div class='modal-information-close' v-on:click.prevent="closeModal"><img src="../../assets/exit.svg" alt=""></div>
    </div>
    <a @click.stop.prevent="deadMessage" class='modal-information-photo-container'>
      <img class='modal-information-photo' src="../../assets/information.png" alt="information">
      <div style="display: flex; justify-content: center">
        <div class='modal-information-new-link'>New To Trello? Check Out The Guide</div>
      </div>
    </a>
    <div style="display: flex; justify-content: center">
      <div class='modal-information-new-tip'>Get a new tip</div>
    </div>
    <div class='modal-information-bottom'>
      <div class='modal-information-bottom-container'>
          <div class='modal-information-bottom-link'>Pricing</div>
          <div class='modal-information-bottom-link'>Apps</div>
          <div class='modal-information-bottom-link'>Blog</div>
          <div class='modal-information-bottom-link'>Privacy</div>
          <div class='modal-information-bottom-link'>More...</div>
      </div>
    </div>
    <b-modal id="modal-2" title="Under Construction">
      <p class="my-4">Sorry we're still working on this section!</p>
      <img style="width: 100px; height: 100px;" src="https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif" alt="">
    </b-modal>
  </div>
</template>
<script>
export default {
  props: {
    closeModal: {
      type: Function
    }
  },
  methods: {
    deadMessage () {
      this.$bvModal.show('modal-2')
    }
  }
}
</script>
<style lang="css">
.modal-information {
  display: flex;
  flex-direction: column;
  width: 384px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  font-size: 14px;
  font-weight: 400;
}
.modal-information-header-container {
  margin-bottom: 8px;
  padding: 0 12px;
  position: relative;
  text-align: center;
  display: grid;
  grid-template-columns: 12px 1fr 12px;
  border-bottom: 1px solid rgba(9,30,66,.13);
}
.modal-information-header {
  color: #5e6c84;
  line-height: 40px;
  margin: 0;
  grid-column: 1/span3;
  grid-row: 1;
}
.modal-information-close {
  grid-column: 3;
  grid-row: 1;
  line-height: 40px;
  cursor: pointer;
  width: 10px;
  height: auto;
}
.modal-information-bottom-container {
  display: flex;
  width: 90%;
  border-top: 1px solid rgba(9,30,66,.13);
  justify-content: space-around;
  padding: 8px 20px;
  margin-top: 5px;

}
.modal-information-photo-container {
  padding: 0 25px;
  text-decoration: none;
}
.modal-information-photo {
  height: 170px;
  width: auto;
}
.modal-information-new-link {
  font-weight: 600;
  font-size: 16px;
  width: 334px;
  text-align: center;
  min-height: 50px;
  padding: 8px;
  color: black;
  text-decoration: none;
}
.modal-information-new-link:hover {
  background-color: rgb(245, 245, 245);
  border-radius: 2px

}
.modal-information-new-tip{
  font-size: 14px;
  width: 334px;
  padding: 10px 0;
  color: #7a869a;
  text-decoration: underline;
  text-align: center;
}
.modal-information-new-tip:hover {
  color: black;
  background-color: rgb(235, 236, 240);
  cursor: pointer;
  border-radius: 2px;
}
.modal-information-bottom-link {
  padding: 10px;
  text-decoration: underline;
  color: #474e5a;
}
.modal-information-bottom-link:hover {
  color: black;
  background-color: rgb(235, 236, 240);
  border-radius: 2px;
  cursor: pointer;
}
.modal-information-bottom{
  display: flex;
  justify-content: center;
  box-shadow: 0 8px 16px -4px rgba(9,30,66,.25);
}
</style>
