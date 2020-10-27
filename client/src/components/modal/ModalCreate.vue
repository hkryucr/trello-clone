<template>
  <div class='modal-create'>
    <div class='modal-create-header-container'>
        <div class='modal-create-header'>Create</div>
        <div class='modal-create-close' v-on:click.prevent="closeModal"><img src="../../assets/exit.svg" alt=""></div>
    </div>
    <section class='create-body-container'>
      <div class='create-body-link-container'>
        <div class='create-link-header-container'>
          <div class='create-link-icon-container'>
            <img src="../../assets/modal-create/create-board.svg" alt="create">
          </div>
          <div class='create-link-header-text'>Create Board</div>
        </div>
        <div class='create-link-paragraph'>A board is made up of cards ordered on lists.  Use it to manage projects, track information, or orgainize anything.</div>
      </div>
      <div class='create-body-link-container'>
        <div class='create-link-header-container'>
          <div class='create-link-icon-container'>
            <img src="../../assets/modal-create/template.svg" alt="create">
          </div>
          <div class='create-link-header-text'>Start with a template</div>
          <div class='create-link-new'>New</div>
        </div>
        <div class='create-link-paragraph'>Get started faster with a board template.</div>
      </div>
      <div class='create-body-link-container'>
        <div class='create-link-header-container'>
          <div class='create-link-icon-container'>
            <img src="../../assets/modal-create/team.svg" alt="create">
          </div>
          <div class='create-link-header-text'>Create team</div>
        </div>
        <div class='create-link-paragraph'>A team is group of boards and people.  Use it to orgainize your company, side hustle, family, or friends.</div>
      </div>
      <div class='create-body-link-container'>
        <div class='create-link-header-container'>
          <div class='create-link-icon-container'>
            <img src="../../assets/modal-create/business.svg" alt="create">
          </div>
          <div class='create-link-header-text'>Create business team</div>
        </div>
        <div class='create-link-paragraph'>With Business Class your team has more security, administrative controls, and unlimited Power-Ups.</div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  props: {
    closeModal: {
      type: Function
    }
  }
}
</script>
<style lang="css">
.modal-create {
  display: flex;
  flex-direction: column;
  width: 304px;
  font-size: 14px;
  font-weight: 400;
}
.modal-create-header-container {
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  vertical-align: middle;
  border-bottom: 1px solid rgba(9,30,66,.13);
  margin-bottom: 8px;
}
.modal-create-header {
  color: #5e6c84;
  line-height: 40px;
  margin: 0;
  grid-column: 3;
  grid-row: 1;
}
.modal-create-close {
  grid-column: 5;
  grid-row: 1;
  line-height: 40px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  width: 10px;
  height: auto;
  margin-left: 30px;
}
.create-link-header-container {
  width: 100%;
  display: flex;
  padding: 5px;
  padding-bottom: 0;
}
.create-body-link-container {
  display: block;
  padding: 6px 12px;
  text-align: left;
}
.create-body-link-container:hover {
  background-color: rgb(244, 245, 246);
  cursor: pointer;
}
.create-link-icon-container {
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
}
.create-link-header-text {
  font-weight: 500;
  padding-left: 5px;
}
.create-link-paragraph {
  color: #5e6c84;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  padding: 5px;
}
.create-link-new {
  background-color: #61bd4f;
  border-radius: 20px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  padding: 1px 10px;
  text-align: center;
  margin-left: 8px;
  margin-top: -3px;
}
.create-body-container {
  padding-bottom: 12px;
  box-shadow: 0 8px 16px -4px rgba(9,30,66,.25);
}
</style>
