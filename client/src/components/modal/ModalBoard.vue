<template>
  <div class='modal-board'>
    <form class='modal-board-input-container'>
        <input class='modal-board-input' type="text" placeholder="Find boards by name…">
        <div class='modal-board-close'>X</div>
    </form>
    <div class='modal-boards-star-container'>
      <div class='modal-boards-star-header'>
        <div style="display: flex;">
          <div class='modal-star-container'>
            <img src="../../assets/star.svg" alt="star">
          </div>
          <div class='modal-star-text'>Starred Boards</div>
        </div>
        <div v-if='star'>-</div>
        <div v-else>+</div>
      </div>
      <div class='modal-boards-star-body'>
        Star your most important boards to keep them right at your fingertips.
      </div>
    </div>
    <div class='modal-boards-recent-container'>
      <div class='modal-boards-recent-header'>
        <div style="display: flex;">
          <div class='modal-recent-container'>
            <img src="../../assets/clock.svg" alt="star">
          </div>
          <div class='modal-recent-text'>Recent Boards</div>
        </div>
        <div v-if='star'>-</div>
        <div v-else>+</div>
      </div>
      <div class='modal-boards-star-body'>
        LI of recent boards
      </div>
    </div>
    <div class='modal-boards-personal-container'>
      <div class='modal-boards-personal-header'>
        <div style="display: flex;">
          <div class='modal-personal-container'>
            <img class='modal-boards-trello-icon' src="../../assets/modal-create/create-board.svg" alt="star">
          </div>
          <div class='modal-personal-text'>Personal Boards</div>
        </div>
        <div v-if='star'>-</div>
        <div v-else>+</div>
      </div>
      <div class='modal-boards-star-body'>
        LI of personal boards
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      star: true
    }
  }
}
</script>

<style lang="css" >
.modal-board {
  padding: 8px;
  width: 280px;
  display: flex;
  flex-direction: column;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  font-size: 14px;
  font-weight: 400;
  box-shadow: 0 8px 16px -4px rgba(9,30,66,.25);

}
.modal-board-input {
  border: 1px solid lightgray;
  padding: 8px 12px;
  width: 98%;
}
.modal-board-input-container {
  display: flex;
  align-items: center;
  font-weight: 500;
}
.modal-board-close {
  padding: 8px;
}
.modal-boards-star-container, .modal-boards-recent-container, .modal-boards-personal-container {
  display: flex;
  color: rgb(107, 119, 140);
  padding: 10px;
  font-weight: 600;
  font-size: 12px;
  flex-direction: column
}
.modal-star-container, .modal-recent-container, .modal-personal-container {
  width: 24px;
  height: 24px;
  padding: 4px;
}
.modal-star-text, .modal-recent-text, .modal-personal-text {
  padding: 4px;
  line-height: 15px;
  letter-spacing: .04em;
  text-transform: uppercase;

}
.modal-boards-star-header, .modal-boards-recent-header, .modal-boards-personal-header {
  display: flex;
  justify-content: space-between;
}
.modal-boards-star-body {
  color: #7a869a;
  margin: 16px 30px 10px 31px;
  position: relative;
  text-align: left;
  font-size: 14px;
  font-weight: 450;
  line-height: 20px;
}
.modal-boards-trello-icon {
  fill: #7a869a
}
</style>
