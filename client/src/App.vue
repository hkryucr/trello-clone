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
<style lang="sass">
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";
@import "../node_modules/bootstrap/scss/modal";
@import "../node_modules/bootstrap-vue/src/components/modal/index";
</style>
<style>
@import 'fonts/font.css';
@import 'assets/styles/tailwind.postcss';
@import 'assets/styles/custom-bootstrap-modal.css';
@import 'assets/styles/reset.css';

.container {
  @apply mx-auto;
}
</style>
