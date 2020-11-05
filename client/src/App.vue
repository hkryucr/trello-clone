<template>
  <div id="app" @click="closeModal">
    <router-view/>
    <div class="modal fade show modal-dialog modal-md modal-content modal-header modal-title modal-body modal-footer modal-backdrop modal-open" style="display: none;"></div>
  </div>
</template>
<script>

import EventBus from './utils/eventBus'

export default {
  methods: {
    async closeModal () {
      await EventBus.$emit('closeDeleteWarningModal')
      if (this.$store.state.ui.modal !== 'empty') {
        await this.$store.commit('CLOSE_MODAL')
      }
      await EventBus.$emit('closeSearchModal', 'close')
      await EventBus.$emit('closeSideMenu')
      await EventBus.$emit('closeConfirmed')
    }
  }
}
</script>
<style lang="css">
.modal-header {
  display: flex;
  justify-content: center !important;
}
.modal-title {
  font-size: 18px;
}
.modal-header > button {
  display: none;
}
.modal-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.modal-body > p {
  margin-top: 0 !important;
}
.modal-body > img {
  border-radius: 5px;
}
.modal-footer {
  display: flex;
  justify-content: center;
}
.modal-footer > button:first-child {
  display: none;
}
.modal-footer > button:last-child {
  visibility: hidden;
  position: relative;
  font-size: 14px;
}
.modal-footer > button:last-child::after {
  visibility: visible;
  content: "Go back to the page";
  background-color: #026aa7;
  color: white;
  font-size: 1rem;
  border-radius: 5px;
  padding: .7rem 9rem 0.7rem 8rem;
  margin-right: 1rem;
}
.modal-footer > button:last-child::after:hover {
  background-color: rgb(0, 121, 191);
}

@import 'fonts/font.css';
@import 'assets/styles/tailwind.postcss';
body,
html {
  height: 100%;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  font-size: 16px;
  font-weight: 400;
}

* {
  box-sizing: border-box;
}

ul {
  list-style-type: disc;
  list-style-position: inside;
  padding: 0;
  margin: 0;
}

ol {
  list-style-type: decimal;
  list-style-position: inside;
}

ul ul,
ol ul {
  list-style-type: circle;
  list-style-position: inside;
}

ol ol,
ul ol {
  list-style-type: lower-latin;
  list-style-position: inside;
}

li {
  list-style: none;
}

textarea:focus,
input:focus,
button:focus {
  outline: none;
}
.container {
  @apply mx-auto;
}

.modal-backdrop {
  opacity: 0.5;
}
.modal-open {
  overflow: hidden;
}

.modal-open .modal {
  overflow-x: hidden;
  overflow-y: auto;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
}

.modal-dialog {
  position: relative;
  width: auto;
  margin: 0.5rem;
  pointer-events: none;
}

.modal.fade .modal-dialog {
  transition: -webkit-transform 0.3s ease-out;
  transition: transform 0.3s ease-out;
  transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
  -webkit-transform: translate(0, -50px);
  transform: translate(0, -50px);
}

@media (prefers-reduced-motion: reduce) {
  .modal.fade .modal-dialog {
    transition: none;
  }
}

.modal.show .modal-dialog {
  -webkit-transform: none;
  transform: none;
}

.modal.modal-static .modal-dialog {
  -webkit-transform: scale(1.02);
  transform: scale(1.02);
}

.modal-dialog-scrollable {
  display: -ms-flexbox;
  display: flex;
  max-height: calc(100% - 1rem);
}

.modal-dialog-scrollable .modal-content {
  max-height: calc(100vh - 1rem);
  overflow: hidden;
}

.modal-dialog-scrollable .modal-header,
.modal-dialog-scrollable .modal-footer {
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

.modal-dialog-scrollable .modal-body {
  overflow-y: auto;
}

.modal-dialog-centered {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  min-height: calc(100% - 1rem);
}

.modal-dialog-centered::before {
  display: block;
  height: calc(100vh - 1rem);
  height: -webkit-min-content;
  height: -moz-min-content;
  height: min-content;
  content: "";
}

.modal-dialog-centered.modal-dialog-scrollable {
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
  height: 100%;
}

.modal-dialog-centered.modal-dialog-scrollable .modal-content {
  max-height: none;
}

.modal-dialog-centered.modal-dialog-scrollable::before {
  content: none;
}

.modal-content {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
}

.modal-backdrop.fade {
  opacity: 0;
}

.modal-backdrop.show {
  opacity: 0.5;
}

.modal-header {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: start;
  align-items: flex-start;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
}

.modal-header .close {
  padding: 1rem 1rem;
  margin: -1rem -1rem -1rem auto;
}

.modal-title {
  margin-bottom: 0;
  line-height: 1.5;
}

.modal-body {
  position: relative;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1rem;
}

.modal-footer {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px);
}

.modal-footer > * {
  margin: 0.25rem;
}

.modal-scrollbar-measure {
  position: absolute;
  top: -9999px;
  width: 50px;
  height: 50px;
  overflow: scroll;
}

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 500px;
    margin: 1.75rem auto;
  }
  .modal-dialog-scrollable {
    max-height: calc(100% - 3.5rem);
  }
  .modal-dialog-scrollable .modal-content {
    max-height: calc(100vh - 3.5rem);
  }
  .modal-dialog-centered {
    min-height: calc(100% - 3.5rem);
  }
  .modal-dialog-centered::before {
    height: calc(100vh - 3.5rem);
    height: -webkit-min-content;
    height: -moz-min-content;
    height: min-content;
  }
  .modal-sm {
    max-width: 300px;
  }
}

@media (min-width: 992px) {
  .modal-lg,
  .modal-xl {
    max-width: 800px;
  }
}

@media (min-width: 1200px) {
  .modal-xl {
    max-width: 1140px;
  }
}
</style>
