<template>
  <div id="app" @click="closeModal">
    <router-view/>
  </div>
</template>
<script>
import EventBus from './utils/eventBus'

export default {
  methods: {
    closeModal () {
      if (this.$store.state.ui.modal !== 'empty') {
        this.$store.commit('CLOSE_MODAL')
      }
      EventBus.$emit('closeSearchModal', 'close')
      EventBus.$emit('closeSideMenu')
    }
  }
}
</script>
<style>
@import 'fonts/font.css';
@import 'assets/styles/tailwind.postcss';

body, html {
  height: 100%;
}

#app {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
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

ul ul, ol ul {
   list-style-type: circle;
   list-style-position: inside;
}

ol ol, ul ol {
   list-style-type: lower-latin;
   list-style-position: inside;
   /* margin-left: 15px; */
}
li {
  list-style: none;
}

textarea:focus, input:focus, button:focus{
    outline: none;
}

.container {
  @apply mx-auto;
}
</style>
