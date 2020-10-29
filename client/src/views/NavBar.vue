<template>
  <div class="navbar-outer-container">
    <div class="navbar-container">
      <div class='navbar-left'>
          <div @click.stop.prevent="openModal('modalMenu')" class='navbar-icon'><font-awesome-icon icon="th" :style="{ color: '#fff' }" class="icon" /></div>
          <div class='navbar-icon'><font-awesome-icon icon="home" :style="{ color: '#fff' }" /></div>
          <div class='navbar-board-link' v-on:click.stop="openModal('modalBoard')">
            <img class='trello-icon'  src ='../assets/trello-brands.svg' >
            <div class='navbar-boards-text'>Boards</div>
          </div>
          <div :class="[{ 'search-input-clicked': isSearchInputClicked }, '_3Z6i0FBUukKNYK']" @click.stop.prevent="openSearchModal('modalSearch')">
            <span class="H-W6qp3xgoZvbe" id="search-input-label-text">Search Trello</span>
            <input autocomplete="off" autocorrect="off" spellcheck="false" class="_1CyMivLdH2a8dA" id="bOzGXajER38WrMCJUQtLelwWmN5nnRZA" type="text" aria-labelledby="search-input-label-text" v-model="searchInput" ref="searchInputDOM">
            <span class="_2baX9YmlCebcUG">
              <label for="bOzGXajER38WrMCJUQtLelwWmN5nnRZA">
                <span class="nch-icon _2_Q6rrYCFblD3M _3Dk1GPoKnJxuep _35K2W68MBDEnev">
                  <span class="sc-bdVaJa kBFJig" role="img" aria-label="SearchIcon">
                    <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 18a7.5 7.5 0 115.936-2.915l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006A7.467 7.467 0 0110.5 18zm5.5-7.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" fill="currentColor"></path>
                    </svg>
                  </span>
                </span>
              </label>
              <!-- <a href="/search?q=" aria-label="Jump to search page" v-if="isSearchInputClicked"> -->
                <!-- <span class="nch-icon _2_Q6rrYCFblD3M _3Dk1GPoKnJxuep _1aTEN2k6mbGXDt"> -->
                  <!-- <span class="sc-bdVaJa jKipYA" role="img" aria-label="ExternalLinkIcon">
                    <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.745 8.608a1.03 1.03 0 011.031-1.036h.004l4.161.02a1.053 1.053 0 011.045 1.044l.019 4.161a1.03 1.03 0 01-1.036 1.035 1.05 1.05 0 01-1.045-1.044l-.008-1.712-6.723 6.723c-.391.39-1.025.39-1.415 0a1.002 1.002 0 010-1.415l6.723-6.723-1.712-.008a1.05 1.05 0 01-1.044-1.045z" fill="currentColor"></path>
                    </svg>
                  </span> -->
                <!-- </span> -->
              <!-- </a> -->
              <span v-if="isSearchInputClicked" class="nch-icon _2_Q6rrYCFblD3M _3Dk1GPoKnJxuep _1rJlkXCMSTe5X7">
                <span class="sc-bdVaJa jKipYA" @click.stop.prevent="closeSearchModal" role="img" aria-label="CloseIcon">
                  <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.586 12L5.293 6.707a1 1 0 011.414-1.414L12 10.586l5.293-5.293a1 1 0 111.414 1.414L13.414 12l5.293 5.293a1 1 0 01-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 01-1.414-1.414L10.586 12z" fill="currentColor"></path>
                  </svg>
                </span>
              </span>
            </span>
          </div>
      </div>
      <div class="navbar-header">
        <router-link to="/">
          <svg style="top: 3.8px; left: 45%;" class="d-block" width="130" height="25" viewBox="0 0 885 272" alt="Trello">
            <g fill-rule="evenodd">
            <path d="M723.294 178.59c-12.77 5.203-22.85 23.18-38.176 33.4-.95.632-1.9.95-2.534.95-1.267 0-2.85-1.268-2.85-6.97 0-19.642 6.335-29.146 11.72-43.085 18.692-48.47 50.688-89.97 79.2-135.274 2.218-3.484 3.485-7.285 3.485-11.404 0-3.484-1.268-6.336-2.852-9.82C770.02 3.534 764.318 1 757.982 1c-3.484 0-6.652.317-10.77.317-14.89 0-18.058 21.86-21.543 27.56-23.76 40.235-51.006 89.973-64.945 125.137-3.057 7.883-6.36 15.767-8.868 23.857-13.775 3.99-24.095 23.358-40.236 34.12-.95.632-1.9.95-2.534.95-1.267 0-2.85-1.268-2.85-6.97 0-19.642 6.335-29.146 11.72-43.085 18.692-48.47 50.69-89.97 79.2-135.274 2.218-3.484 3.486-7.285 3.486-11.404 0-3.484-1.268-6.336-2.852-9.82C696.523 3.534 690.82 1 684.485 1c-3.485 0-6.653.317-10.77.317-14.89 0-18.06 21.86-21.544 27.56-23.76 40.235-51.004 89.973-64.943 125.137-1.108 2.858-2.248 5.716-3.372 8.584-.346.185-.7.386-1.063.604-16.157 9.504-29.78 26.294-49.42 37.7-3.802 2.216-15.524 10.453-25.028 10.453-2.218 0-4.118-.633-6.02-1.584-2.85-1.266-5.702-7.285-5.702-9.186 0-1.584.317-1.9 3.485-3.802 27.88-16.79 50.688-40.867 70.33-64.944 7.286-8.87 16.79-26.294 16.79-38.966 0-8.237-2.85-17.74-12.672-21.226-6.97-2.534-14.89-3.8-21.225-3.8-16.79 0-29.146 7.602-36.116 14.888-7.095 7.575-13.958 15.353-20.335 23.405-6.663-5.753-16.06-8.2-24.968-8.2-10.454 0-30.096 12.99-40.234 20.593-1.584 1.267-2.534 1.9-3.168 1.9-.316 0-.633-.316-.633-.95 0-.317.633-3.168.633-8.237 0-4.435-.95-10.137-5.068-17.107-.95-1.585-6.653-5.07-13.623-5.07-8.554 0-16.474 4.12-16.474 8.554 0 3.168 2.85 4.435 2.85 7.286 0 1.584-1.266 8.87-3.167 15.84-5.387 20.276-12.04 40.234-19.01 60.192-3.8 11.088-16.473 20.91-16.473 32.948 0 3.8 2.535 8.87 6.02 12.672 5.702 6.336 9.187 8.553 14.255 8.553 2.218 0 4.752-.633 6.97-2.534 4.752-4.118 7.286-8.236 8.554-13.938 8.236-37.383 31.996-62.727 58.29-79.517 8.87-5.703 20.91-11.722 22.494-11.722 1.624 0 4.164.75 6.724 1.48-7.35 11.99-13.306 24.632-17.18 38.12-1.266 4.435-1.9 8.554-1.9 12.99 0 7.285 1.584 14.89 4.12 22.175 3.484 10.138 9.186 19.008 17.106 23.126 14.573 7.604 25.027 11.722 34.53 11.722 5.387 0 9.505-.95 13.94-3.485 20.823-11.78 33.59-20.718 42.807-28.656.253 8.05 1.84 12.508 7.565 18.52 5.702 6.02 14.572 11.404 26.294 13.94 1.9.316 3.802.632 5.702.632 13.41 0 26.318-10.9 36.27-21.706 1.152 2.358 2.827 4.61 5.23 7.134 5.704 6.02 14.574 11.404 26.296 13.94 1.9.316 3.8.632 5.702.632 15.71 0 30.727-14.957 41.114-27.2 3.462 7.162 13.137 14.24 24.78 19.914 3.168 1.584 6.97 2.534 10.455 2.534 13.622 0 23.443-11.088 31.046-19.324 19.643-21.543 30.414-48.154 38.65-81.735.634-2.534 1.585-3.485 2.852-3.485 3.168 0 7.286 0 11.722-.633 8.553-1.267 15.206-4.12 23.126-5.386 4.752-.95 4.118-2.533 8.554-4.117 3.168-1.267 5.702-2.535 5.702-5.703 0-5.385-9.82-11.088-24.71-11.088-11.722 0-18.692.95-23.444.95-7.286 0-9.187-2.217-13.94-14.572 0 0 4.753 12.355 0 0-.95-2.534-1.9-3.802-4.75-6.336-6.654-5.702-14.89-7.603-21.543-7.603-15.84 0-29.464 16.158-38.968 29.78-2.217 3.168-5.385 5.702-7.603 9.187-13.05 19.575-25.545 41.65-27.086 65.443zM318.264 70.696c7.92 0 12.355-.634 13.306-.634.95 0 1.584.317 1.584 1.268 0 .633-.317 1.584-2.535 6.336-19.326 41.5-32.63 83.635-44.353 130.204-.317 1.268-1.267 6.02-1.267 10.772 0 4.435 1.267 9.187 5.702 11.72 8.554 5.07 15.524 7.288 20.276 7.288 6.97 0 10.454-4.436 10.454-11.722 0-6.336.317-12.99 1.267-18.058 8.87-46.57 22.175-83 42.767-121.017 9.82-18.058 11.088-19.008 11.088-20.592 0-.633-.317-1.583-.95-2.534 12.672-2.85 27.878-4.752 41.817-4.752 1.584 0 7.92 2.218 8.87 3.168 2.218 2.218 4.436 4.436 8.238 4.436 3.168 0 8.553-2.218 10.454-3.485 4.435-3.168 6.653-6.653 6.653-12.355 0-5.386-19.96-18.692-33.898-18.692-17.108 0-32.63 2.218-47.204 5.07-6.336 1.266-29.146 4.75-45.62 4.75-15.84 0-14.89-2.216-21.542-2.216-3.8 0-5.702 1.9-7.286 3.484-1.584 1.584-2.534 7.92-2.534 13.623 0 2.85 0 5.07 1.584 6.97 4.752 5.702 13.94 6.97 23.126 6.97 0 0-9.187 0 0 0zm234.75 25.66c0 2.852-.952 4.753-4.753 10.772-3.8 6.02-2.217 6.02-6.97 12.355-9.186 12.355-20.59 24.71-35.48 38.333-4.12 3.802-4.752 3.802-5.386 3.802-.317 0-.95-.317-.95-.95 0-.95.316-2.218 3.484-8.87 9.82-20.593 21.86-34.216 35.165-47.52 7.287-7.288 11.722-9.822 13.306-9.822.95 0 1.583.317 1.583 1.9 0 0 0-1.583 0 0zm243.618 8.238c.317 0 .634.316.95.95.317.95.95 1.9 2.535 3.168 1.267.95 1.267 5.386 1.267 8.87 0 30.73-17.424 56.074-34.53 81.735-3.803 5.702-6.02 6.653-7.92 6.653-1.585 0-4.12-4.12-5.07-6.653-1.267-3.485-1.584-7.603-1.584-9.187 0-24.71 23.443-61.46 38.966-81.735 2.535-3.485 4.436-3.8 5.386-3.8 0 0-.95 0 0 0z">
            </path>
            <path d="M75 36c-13.807 0-25 11.2-25 25v150c0 13.806 11.2 25 25 25h150c13.806 0 25-11.2 25-25V61c0-13.807-11.2-25-25-25H75zm99.997 26C168.37 62 163 67.372 163 74.006v63.988c0 6.63 5.373 12.006 11.997 12.006h37.006c6.626 0 11.997-5.372 11.997-12.006V74.006C224 67.376 218.627 62 212.003 62h-37.006zm-87 0C81.37 62 76 67.367 76 74.005v113.99C76 194.625 81.373 200 87.997 200h37.006c6.626 0 11.997-5.367 11.997-12.005V74.005C137 67.375 131.627 62 125.003 62H87.997z"></path>
            </g>
          </svg>
        </router-link>
      </div>
      <div class="navbar-right">
          <div v-on:click.stop.prevent="openModal('modalCreate')" class='navbar-icon'><font-awesome-icon icon="plus" class="icon" :style="{ color: '#fff' }"/></div>
          <div v-on:click.stop.prevent="openModal('modalInformation')" class='navbar-icon'><font-awesome-icon icon="info-circle" class="icon" :style="{ color: '#fff' }"/></div>
          <div v-on:click.stop.prevent="openModal('modalNotification')" class='navbar-icon'><font-awesome-icon icon="bell" class="icon" :style="{ color: '#fff' }"/></div>
          <span v-on:click.stop.prevent="openModal('modalAccount')" class='navbar-user'>{{ this.initials }}</span>
      </div>
      <div v-bind:class=[getNavModal] @click.stop.prevent="stopTheEvent">
        <ModalMenu class="modal-border" v-if="getNavModal === 'modalMenu'" :closeModal="closeModal"/>
        <ModalBoard class="modal-border" v-if="getNavModal === 'modalBoard'" :closeModal="closeModal"/>
        <ModalCreate class="modal-border" v-if="getNavModal === 'modalCreate'" :closeModal="closeModal"/>
        <ModalInformation class="modal-border" v-if="getNavModal === 'modalInformation'" :closeModal="closeModal"/>
        <ModalNotification class="modal-border" v-if="getNavModal === 'modalNotification'" :closeModal="closeModal"/>
        <ModalAccount class="modal-border" v-if="getNavModal === 'modalAccount'" :closeModal="closeModal"/>
        <ModalSearch class="modal-border" v-if="isSearchInputClicked"/>
      </div>
    </div>
   </div>
</template>

<script>
import ModalMenu from '../components/modal/ModalMenu'
import ModalSearch from '../components/modal/ModalSearch'
import ModalBoard from '../components/modal/ModalBoard'
import ModalCreate from '../components/modal/ModalCreate'
import ModalInformation from '../components/modal/ModalInformation'
import ModalNotification from '../components/modal/ModalNotification'
import ModalAccount from '../components/modal/ModalAccount'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import EventBus from '../utils/eventBus'
import Vue from 'vue'
import { mapGetters } from 'vuex'

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

export default {
  components: {
    ModalMenu,
    ModalBoard,
    ModalCreate,
    ModalInformation,
    ModalNotification,
    ModalAccount,
    ModalSearch
  },
  data () {
    return {
      isSearchInputClicked: false,
      searchInput: ''
    }
  },
  mounted () {
    const vm = this
    EventBus.$on('closeSearchModal', function (payLoad) {
      vm.closeSearchModal()
    })
  },
  methods: {
    stopTheEvent: (event) => event.stopPropagation(),
    openModal (modal) {
      if (this.getNavModal === modal) {
        this.$store.commit('CLOSE_MODAL')
      } else {
        this.$store.commit('OPEN_MODAL', modal)
      }
    },
    homepage: function () {
      this.$router.push('/')
    },
    closeModal () {
      this.$store.commit('CLOSE_MODAL')
    },
    openSearchModal (modal) {
      this.isSearchInputClicked = true
      this.$refs.searchInputDOM.focus()
    },
    closeSearchModal () {
      // this.$refs.searchInputDOM.blur()
      this.isSearchInputClicked = false
      this.searchInput = ''
    }
  },
  computed: {
    ...mapGetters(['getNavModal']),
    initials () {
      return this.$store.getters.getUser.initials
    }
  }
}
</script>

<style lang="css">
.navbar-outer-container {
  background-color: #026aa7;
  padding: 2px;
  height: 2.5rem;
}
.navbar-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
}
.navbar-left{
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-basis: 100%;
}
.navbar-left > input {
  border-radius: 3px;
  margin: 0 2px;
}
.navbar-right{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-grow: 1;
  flex-basis: 100%;
}
.navbar-header {
  position: relative;
  text-align: center;
  flex-shrink: 0;
}
.navbar-icon{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hsla(0,0%,100%,.3);
  height: 90%;
  width: 32px;
  height: 32px;
  margin: 0 2px;
  padding: 5px;
  border-radius: 3px;
}
.navbar-icon:hover, .navbar-user:hover, .navbar-board-link:hover {
  background-color: rgba(255, 255, 255, 0.15);
  cursor: pointer;
}
.navbar-user{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hsla(0,0%,100%,.3);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  text-align: center;
  vertical-align: middle;
  color: #fff;
  font-weight: 700;
  margin: 0 2px;
  font-size: 14px;
}
.empty{
  /* display: none; */
  width: 0
}
.modalMenu, .modalBoard {
  position: fixed;
  top: 44px;
  left: 4px;
  border-radius: 5px;
  background-color: #fff;
  z-index: 10;
}
.modalCreate, .modalInformation, .modalNotification, .modalAccount {
  position: fixed;
  right: 4px;
  top: 44px;
  border-radius: 5px;
  background-color: #fff;
  z-index: 10;
}
.modalCreate {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  background-color: #fff;
  border-radius: 3px;
  box-sizing: border-box;
  outline: 0;
  overflow: hidden;
}
.modal-border {
  box-shadow: 0 8px 16px -4px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08) !important;
  -webkit-box-shadow: 0 8px 16px -4px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08) !important;
  border: 1px solid rgba(9,30,66,.25)
}
.navbar-board-link {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hsla(0,0%,100%,.3);
  width: 110px;
  min-width: 110px;
  height: 32px;
  margin: 0 2px;
  padding: 5px;
  border-radius: 2px;
}
.trello-icon {
  width: 20%;
  margin-right: 10px;
}
.navbar-boards-text {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  font-size: .9em;
  font-weight: 700;
  color: #fff;
}
.d-block {
  fill:hsla(0,0%,100%,.3)
}
.d-block:hover {
  cursor: pointer;
  fill: #fff;
}
._3Z6i0FBUukKNYK {
  position: relative;
  margin: 0 2px;
}
._3Z6i0FBUukKNYK .H-W6qp3xgoZvbe {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
._3Z6i0FBUukKNYK ._1CyMivLdH2a8dA {
    background-color: hsla(0,0%,100%,.3);
    border-radius: 3px;
    border: none;
    box-shadow: none;
    box-sizing: border-box;
    color: hsla(0,0%,100%,.5);
    float: left;
    font-size: 13px;
    height: 32px;
    line-height: 19px;
    margin: 0;
    outline: none;
    padding-left: 8px;
    padding-right: 30px;
    transition: width .15s;
    width: 180px;
}
._2baX9YmlCebcUG {
    color: #fff;
    position: absolute;
    right: 2px;
}
._3Z6i0FBUukKNYK label {
    margin: 0;
    padding: 0;
    color: #fff;
}
._35K2W68MBDEnev {
    display: flex;
    width: 32px;
    height: 32px;
    justify-content: center;
    align-items: center;
}
.kBFJig {
    color: rgb(255, 255, 255);
    display: inline-block;
    fill: inherit;
    flex-shrink: 0;
    line-height: 1;
}
._3Dk1GPoKnJxuep svg {
    height: 20px;
    width: 20px;
    line-height: 20px;
}
.kBFJig > svg {
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
    pointer-events: none;
    vertical-align: bottom;
}
._3Z6i0FBUukKNYK.search-input-clicked ._2baX9YmlCebcUG {
    color: rgba(0,0,0,.4);
    display: flex;
}
._2baX9YmlCebcUG {
    color: #fff;
    position: absolute;
    right: 2px;
}
._3Z6i0FBUukKNYK.search-input-clicked ._2baX9YmlCebcUG {
    color: rgba(0,0,0,.4);
    display: flex;
}
._2baX9YmlCebcUG {
    color: #fff;
    position: absolute;
    right: 2px;
}
._2baX9YmlCebcUG a {
  color: #172b4d;
  background-color: transparent;
}
._3Z6i0FBUukKNYK.search-input-clicked ._1aTEN2k6mbGXDt, ._3Z6i0FBUukKNYK.search-input-clicked ._1rJlkXCMSTe5X7 {
    display: flex;
    width: 32px;
    height: 32px;
    justify-content: center;
    align-items: center;
}
._3Z6i0FBUukKNYK.search-input-clicked ._1aTEN2k6mbGXDt {
    max-width: 20px;
}
._2_Q6rrYCFblD3M {
    display: flex;
    line-height: 1;
}
.jKipYA {
    color: rgb(66, 82, 110);
    display: inline-block;
    fill: inherit;
    flex-shrink: 0;
    line-height: 1;
}
._3Dk1GPoKnJxuep svg {
    height: 20px;
    width: 20px;
    line-height: 20px;
}
.jKipYA > svg {
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
    pointer-events: none;
    vertical-align: bottom;
}
._3Z6i0FBUukKNYK.search-input-clicked ._1aTEN2k6mbGXDt, ._3Z6i0FBUukKNYK.search-input-clicked ._1rJlkXCMSTe5X7 {
    display: flex;
    width: 32px;
    height: 32px;
    justify-content: center;
    align-items: center;
}
._3Z6i0FBUukKNYK.search-input-clicked ._2baX9YmlCebcUG {
    color: rgba(0,0,0,.4);
    display: flex;
}
._2baX9YmlCebcUG {
    color: #fff;
    position: absolute;
    right: 2px;
}
.jKipYA {
    color: rgb(66, 82, 110);
    display: inline-block;
    fill: inherit;
    flex-shrink: 0;
    line-height: 1;
}
._2baX9YmlCebcUG {
    color: #fff;
    position: absolute;
    right: 2px;
}
._3Z6i0FBUukKNYK.search-input-clicked ._2baX9YmlCebcUG {
    color: rgba(0,0,0,.4);
    display: flex;
}
._3Dk1GPoKnJxuep svg {
    height: 20px;
    width: 20px;
    line-height: 20px;
}
.jKipYA > svg {
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
    pointer-events: none;
    vertical-align: bottom;
}
._3Z6i0FBUukKNYK.search-input-clicked ._1CyMivLdH2a8dA:hover {
    background-color: #fff;
}
._3Z6i0FBUukKNYK.search-input-clicked ._1CyMivLdH2a8dA {
    background-color: #fff;
    color: #172b4d;
    border: none;
    box-shadow: none;
    padding-right: 54px;
    width: 180px;
}
@media only screen and (max-width: 1280px) and (min-width: 901px){
  ._3Z6i0FBUukKNYK.search-input-clicked ._1CyMivLdH2a8dA {
      width: 280px;
  }
}
@media only screen and (min-width: 1281px){
  ._3Z6i0FBUukKNYK.search-input-clicked ._1CyMivLdH2a8dA {
      width: 380px;
  }
}
</style>
