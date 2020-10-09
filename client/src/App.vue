<template>
  <div id="app" v-on:click.prevent="closeModal()">
    <router-view/>
  </div>
</template>
<script>
export default {
  methods: {
    closeModal () {
      this.$store.commit('CLOSE_MODAL')
    }
  }
}
</script>
<style>
@import 'assets/styles/tailwind.postcss';
@import 'fonts/font.css';

body, html {
  height: 100%;
}

#app {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  font-size: 16px;
  font-weight: 400;
}
* {
  box-sizing: border-box;
}
textarea:focus, input:focus{
    outline: none;
}

.container {
  @apply mx-auto;
}
</style>
