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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

textarea:focus, input:focus{
    outline: none;
}

.container {
  @apply mx-auto;
}
</style>
