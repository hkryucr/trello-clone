<template>
  <div class='modal-notification'>
    <div class='modal-notification-header-container'>
        <div class='modal-notification-header'>Notifications</div>
        <div class='modal-notification-close' v-on:click.prevent="closeModal"><img src="../../assets/exit.svg" alt=""></div>
    </div>
    <div @click.stop.prevent="deadMessage" class='modal-notification-view-all-container'>
        <a class='modal-notification-view-all'>View All</a>
    </div>
    <div class='modal-notification-image-container'>
        <img src="../../assets/unread.svg" alt="unread">
    </div>
    <div style="align-items: center">
      <h1 class='modal-notification-message'>No Unread Messages</h1>
    </div>
    <div style="align-items: center">
      <h3 class='modal-notfication-link'>Click <a @click.stop.prevent="deadMessage" class='modal-notification-view-all'>View All</a> to view all you're notifications</h3>
    </div>
    <div class='modal-notification-bottom-container'>
      <div class='modal-notification-bottom-text'>Change Notification Email Frequency</div>
      <div class='modal-notification-bottom-text'>Allow Desktop Notifications</div>
    </div>
    <b-modal id="modal-3" title="Loser">
      <p class="my-4">You have no notifications!</p>
      <img style="width: 200px; height: 100px;" src="https://media.giphy.com/media/mcH0upG1TeEak/giphy.gif" alt="">
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
      this.$bvModal.show('modal-3')
    }
  }
}
</script>
<style lang="css">
.modal-notification {
  display: flex;
  flex-direction: column;
  width: 432px;
}
.modal-notification-header-container {
  margin-bottom: 8px;
  padding: 0 12px;
  position: relative;
  text-align: center;
  display: grid;
  grid-template-columns: 12px 1fr 12px;
  border-bottom: 1px solid rgba(9,30,66,.13);
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  font-size: 14px;
  font-weight: 400;
}
.modal-notification-header {
  font-size: 14px;
  font-weight: 400;
  color: #5e6c84;
  line-height: 40px;
  margin: 0;
  grid-column: 1/span3;
  grid-row: 1;
}
.modal-notification-close {
  grid-column: 3;
  grid-row: 1;
  line-height: 40px;
  width: 10px;
  height: auto;
  cursor: pointer;
}
.modal-notification-view-all-container {
  width: 100%;
  font-weight: 400;
  color: #6b778c;
  padding: 10px;
  display: flex;
}
.modal-notification-view-all {
  font-weight: 450;
  color: #6b778c;
  text-decoration: underline;
  font-size: .9em;
}
.modal-notification-view-all:hover {
  color: black;
  cursor: pointer;
}
.modal-notification-image-container {
  width: 100%;
  padding: 32px;
  text-align: center;
}
.modal-notification-message {
  font-size: 20px;
  font-weight: 600;
  padding: 24px;
  color: black;
  text-align: center;
}
.modal-notfication-link {
  font-size: 16px;
  font-weight: 400;
  padding-bottom: 95px;
  text-align: center;
}
.modal-notification-bottom-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 12px;
  box-shadow: 0 8px 16px -4px rgba(9,30,66,.25);

}
.modal-notification-bottom-text {
  text-align: left;
  width: 100%;
  padding: 6px 12px;
  font-size: 15px;
  font-weight: 500;
}
.modal-notification-bottom-text:hover {
  background-color: rgb(245, 245, 245);
  cursor: pointer;
}
</style>
