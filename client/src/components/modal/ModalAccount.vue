<template>
  <div class='modal-account'>
    <div class='modal-account-header-container'>
        <div class='modal-account-header'>Account</div>
        <div class='modal-account-close' v-on:click.prevent="closeModal"><img src="../../assets/exit.svg" alt=""></div>
    </div>
    <div class='modal-account-1'>
        <div class="modal-account-user-container">
            <div class='modal-account-initials'>{{ initials }}</div>
            <div class='modal-account-user-information'>
              <div class='modal-account-user-name'>{{ fullName }}</div>
              <div class='modal-account-user-email'>{{ email }}</div>
            </div>
        </div>
        <div @click.stop.prevent="deadMessage" class='modal-account-add-container'>
          <div class='modal-account-add-text'>Add Another Account</div>
          <div class='modal-account-new-background'>
            <div>NEW</div>
          </div>
        </div>
        <div class='modal-account-line-break'></div>
    </div>
    <div class='modal-account-2'>
        <div @click.stop.prevent="deadMessage" class='modal-account-2-link'>Profile and Visibility</div>
        <div @click.stop.prevent="deadMessage" class='modal-account-2-link'>Activity</div>
        <div @click.stop.prevent="deadMessage" class='modal-account-2-link'>Cards</div>
        <div @click.stop.prevent="deadMessage" class='modal-account-2-link'>Settings</div>
    </div>
    <div class='modal-account-3'>
        <div @click.stop.prevent="deadMessage" class='modal-account-3-link'>Help</div>
        <div @click.stop.prevent="deadMessage" class='modal-account-3-link'>Shortcuts</div>
    </div>
    <div class='modal-account-logout-container'>
        <div class='modal-account-logout-link' @click.prevent="logout">Log Out</div>
    </div>
    <b-modal id="modal-6" title="Under Construction">
      <p class="my-4">Sorry we're still working on this account section!</p>
      <img style="width: 150px; height: 100px;" :src="giphs[idx]" alt="">
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  props: {
    closeModal: {
      type: Function
    }
  },
  data () {
    return {
      giphs: ['https://media.giphy.com/media/jUZmz3kAiAuLC/giphy.gif', 'https://media.giphy.com/media/11xBk5MoWjrYoE/giphy.gif', 'https://media.giphy.com/media/xonOzxf2M8hNu/giphy.gif', 'https://media.giphy.com/media/bAplZhiLAsNnG/giphy.gif'],
      idx: 0
    }
  },
  computed: {
    ...mapGetters(['getCurrentUser']),
    initials () {
      return _.get(this.getCurrentUser, 'initials', '')
    },
    fullName () {
      return _.get(this.getCurrentUser, 'fullName', '')
    },
    email () {
      return _.get(this.getCurrentUser, 'email', '')
    }
  },
  methods: {
    async logout () {
      await this.$store.commit('RESET')
      this.$router.push({ name: 'login' })
    },
    deadMessage () {
      this.idx = Math.floor(Math.random() * 4)
      this.$bvModal.show('modal-6')
    }
  }
}
</script>
<style lang="css">
.modal-account {
  display: flex;
  flex-direction: column;
  width: 304px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #172b4d;
}
.modal-account-header-container {
  margin-bottom: 8px;
  padding: 0 12px;
  position: relative;
  text-align: center;
  display: grid;
  grid-template-columns: 12px 1fr 12px;
  border-bottom: 1px solid rgba(9,30,66,.13);
}
.modal-account-header {
  color: #5e6c84;
  line-height: 40px;
  margin: 0;
  grid-column: 1/span3;
  grid-row: 1;
}
.modal-account-close {
  cursor: pointer;
  grid-column: 3;
  grid-row: 1;
  line-height: 40px;
  width: 10px;
  height: auto;
}
.modal-account-initials {
  border-radius: 50%;
  font-weight: 800;
  font-size: 18px;
  color: #404650;
  background-color: rgb(235, 236, 240);
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-account-user-container {
  display: flex;
  padding: 4px 12px;
}
.modal-account-add-container:hover, .modal-account-2-link:hover, .modal-account-3-link:hover, .modal-account-logout-container:hover {
  background-color: rgb(244, 245, 246);
  cursor: pointer;
}
.modal-account-user-name {
  text-align: left;
  padding-left: 8px;
  font-weight: 500;
  padding-bottom: 5px;
}
.modal-account-user-email {
  text-align: left;
  padding-left: 8px;
  font-size: 11px;
  color: rgb(173, 173, 173);
}
.modal-account-1 {
  display: flex;
  flex-direction: column;
}
.modal-account-add-container {
  display: flex;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  padding: 5px 15px;
}
.modal-account-new-background {
  background-color: #d6ecd2;
  padding: 2px 8px;
  color: #49852e;
  font-size: 1em;
  font-weight: 500;
  display: flex;
  align-items: center;
  border-radius: 15px;
}
.modal-account-add-text {
  line-height: 20px;
  padding-right: 8px;
}
.modal-account-line-break {
  padding-top: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid rgba(9,30,66,.13);
  width: 90%;
  align-self: center;
}
.modal-account-2, .modal-account-3, .modal-account-logout-container {
  display: flex;
  flex-direction: column;
  text-align: left;
  border-bottom: 1px solid rgba(9,30,66,.13);
  padding-bottom: 10px;
}
.modal-account-logout-container {
  box-shadow: 0 8px 16px -4px rgba(9,30,66,.25);

}
.modal-account-2-link, .modal-account-3-link, .modal-account-logout-link {
  padding: 8px 16px;
  font-weight: 500;
}
</style>
