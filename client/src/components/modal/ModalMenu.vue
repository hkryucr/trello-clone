<template>
  <div class='modal-menu'>
    <div class='modal-menu-header-container'>
        <div class='modal-menu-header'>More from Atlassian</div>
        <div class='modal-menu-close' v-on:click.prevent="closeModal"><img src="../../assets/exit.svg" alt=""></div>
    </div>
    <div class='modal-menu-body'>
      <section class='modal-switch-container'>
        <h1 class='modal-menu-switch'>Switch To</h1>
        <div @click.stop.prevent="deadMessage" class='modal-icon-container'>
          <div class='modal-icon-background'>
            <img class='modal-menu-icon' src='../../assets/trello-brands-modal.svg' alt="trello-brand">
          </div>
          <div class='modal-trello'>Trello</div>
        </div>
      </section>
      <section class='modal-menu-bottom-container'>
        <div class='modal-menu-discover'>Discover</div>
        <div @click.stop.prevent="deadMessage" class='modal-menu-discover-item-container'>
          <div class='modal-discover-icon'>
            <img class='modal-discover-icon-svg' src="../../assets/modal-atlassian-confluence.svg" alt="confluence">
          </div>
            <div class='modal-confluence-text-container'>
              <div class='modal-discover-item-header'>
                <div>Confluence</div>
                <div class='modal-try-background'>
                  <div>TRY</div>
                </div>
              </div>
              <div class='modal-confluence-text' style="text-align: start">Free document collaboration for up to 10 users</div>
            </div>
        </div>
        <div @click.stop.prevent="deadMessage" class='modal-menu-discover-item-container'>
          <div class='modal-discover-icon'>
            <img class='modal-discover-icon-svg' src="../../assets/jira-software.svg" alt="confluence">
          </div>
            <div class='modal-confluence-text-container'>
              <div class='modal-discover-item-header'>
                <div>Jira Software</div>
              </div>
              <div class='modal-confluence-text' style="text-align: start">Free project and issue tracking for up to 10 users</div>
            </div>
        </div>
        <div @click.stop.prevent="deadMessage" class='modal-menu-discover-item-container'>
          <div class='modal-discover-icon'>
            <img class='modal-discover-icon-svg' src="../../assets/jira-service-desk.svg" alt="confluence">
          </div>
            <div class='modal-confluence-text-container'>
              <div class='modal-discover-item-header'>
                <div>Jira Service Desk</div>
              </div>
              <div class='modal-confluence-text' style="text-align: start">Free IT service and customer service desk for up to 3 agents</div>
            </div>
        </div>
        <div @click.stop.prevent="deadMessage" class='modal-menu-discover-more-container'>
          <div class='modal-discover-icon'>
            <font-awesome-icon class='modal-discover-icon-svg' icon='compass'></font-awesome-icon>
          </div>
          <div class='modal-atlassian'>More Atlassian products</div>
        </div>
      </section>
    </div>
    <b-modal id="modal-1" title="Under Construction">
      <p class="my-4">Sorry we're still working on this section!</p>
      <img style="width: 150px; height: 100px;" :src="giphs[idx]" alt="">
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
      this.idx = Math.floor(Math.random() * 4)
      this.$bvModal.show('modal-1')
    }
  },
  data () {
    return {
      giphs: ['https://media.giphy.com/media/fVeAI9dyD5ssIFyOyM/giphy.gif', 'https://media.giphy.com/media/JRbBb90Az3zxUc7bWj/giphy.gif', 'https://media.giphy.com/media/T8Dhl1KPyzRqU/giphy.gif', 'https://media.giphy.com/media/vqJAJMr4klojK/giphy.gif'],
      idx: 0
    }
  }
}
</script>
<style lang="css">
.modal-menu {
  display: flex;
  flex-direction: column;
  width: 305px;
}
.modal-menu-header-container {
  margin-bottom: 8px;
  padding: 0 12px;
  display: grid;
  grid-template-columns: 12px 1fr 12px;
}
.modal-menu-header {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  font-size: 14px;
  font-weight: 400;
  border-bottom: 1px solid rgba(9,30,66,.13);
  color: #5e6c84;
  line-height: 40px;
  margin: 0;
  grid-column: 1/span 3;
  grid-row: 1;
  text-align: center;
}
.modal-menu-close {
  grid-column: 3;
  grid-row: 1;
  line-height: 40px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  width: 10px;
  height: auto;
}
.modal-menu-body {
  display: flex;
  flex-direction: column;
}
.modal-menu-icon {
  width: 60%;
  height: auto;
}
.modal-discover-icon-svg {
  width: 75%;
  height: auto;
}
.modal-icon-background, .modal-discover-icon {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 8px;
  background-color: rgb(0, 82, 204);
  overflow: hidden;
}
.modal-discover-icon {
    background-color: rgb(235, 236, 240);
    position: absolute;
}
.modal-switch-container, .modal-menu-bottom-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 15px;
}
.modal-icon-container, .modal-menu-discover-item-container {
  display: flex;
  align-items: center;
  width: 95%;
  border-radius: 2px;
  padding: 6px;
}
.modal-menu-bottom-container {
  padding-bottom: 20px;
}
.modal-icon-container:hover, .modal-menu-discover-item-container:hover, .modal-menu-discover-more-container:hover {
  background-color: rgb(224, 226, 229);
  border-radius: 3px;
  cursor: pointer;
}
.modal-menu-switch, .modal-menu-discover {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  font-size: 0.785714em;
  color: rgb(107, 119, 140);
  font-weight: 700;
  margin-top: 16px;
  text-transform: uppercase;
  margin-bottom: 8px;
  padding-left: 8px;
}
.modal-trello {
  padding-left: 15px;
  font-weight: 500;
}
.modal-menu-bottom-container {
  box-shadow: 0 8px 16px -4px rgba(9,30,66,.25);
}
.modal-discover-item-header {
  display: flex;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  font-size: 14px;
  font-weight: 500;
  width: 62%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 3px;
}
.modal-confluence-text-container {
  margin-left: 45px;
}
.modal-confluence-text {
  color: rgb(94, 108, 132);
  font-size: 11px;
  line-height: 1.27273;
  padding-bottom: 1px;
}
.modal-try-background {
  background-color: rgb(222, 235, 255);
  padding: 0 15px;
  color: rgb(7, 71, 166);
  font-size: .8em;
  font-weight: 700;
  display: flex;
  align-items: center;
  border-radius: 2px;
}
.modal-atlassian {
  padding-left: 44px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  font-size: 14px;
  font-weight: 500;
}
.modal-menu-discover-more-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 2px;
  padding: 15px 5px;
  width: 95%;
}
</style>
