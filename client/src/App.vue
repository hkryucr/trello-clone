<template>
  <div id="app" @click="closeModal">
    <router-view/>
  </div>
</template>
<script>
export default {
  methods: {
    closeModal () {
      if (this.$store.state.ui.modal !== 'empty') {
        this.$store.commit('CLOSE_MODAL')
      }
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
   /* margin-left: 15px; */
}

ol ol, ul ol {
   list-style-type: lower-latin;
   list-style-position: inside;
   /* margin-left: 15px; */
}

textarea:focus, input:focus{
    outline: none;
}

.container {
  @apply mx-auto;
}
</style>
