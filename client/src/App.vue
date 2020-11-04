<template>
  <div id="app" @click="closeModal">
    <router-view/>
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
<style lang="scss">
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";
@import "../node_modules/bootstrap/scss/modal";
@import "../node_modules/bootstrap-vue/src/components/modal/index";
</style>

<style lang="css">
@import 'fonts/font.css';
@import 'assets/styles/tailwind.postcss';
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";
@import "../node_modules/bootstrap/scss/modal";
@import "../node_modules/bootstrap-vue/src/components/modal/index";

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

.container {
  @apply mx-auto;
}

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
  /* margin-left: 15px; */
}

li {
  list-style: none;
}

textarea:focus,
input:focus,
button:focus {
  outline: none;
}
</style>
