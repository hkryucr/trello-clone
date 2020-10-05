<template>
  <div class='modal-account'>
    <div class='modal-account-header-container'>
        <div class='modal-account-header'>Account</div>
        <div class='modal-account-close'>X</div>
    </div>
    <div>
        <div class="modal-account-user-container">
            <div class='modal-account-initials'>RL</div>
            <div class='modal-account-user-information'>
              <div class='modal-account-user-name'>Ryan Leung</div>
              <div class='modal-account-user-email'>ryanleung726@gmail.com</div>
            </div>
        </div>
        <div>Add Another Account</div>
    </div>
    <div>
        <div>Profile and Visibility</div>
        <div>Activity</div>
        <div>Cards</div>
        <div>Settings</div>
    </div>
    <div>
        <div>Help</div>
        <div>Shortcuts</div>
    </div>
    <div>
        <div>Logout</div>
    </div>
  </div>
</template>

<style lang="css" >
.modal-account {
  display: flex;
  flex-direction: column;
  width: 304px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  font-size: 14px;
  font-weight: 400;
}
.modal-account-header-container {
  margin-bottom: 8px;
  padding: 0 12px;
  position: relative;
  text-align: center;
  display: grid;
  grid-template-columns: 12px 1fr 12px;
  border-bottom: 1px solid rgba(9,30,66,.13);
}
.modal-account-header {
  color: #5e6c84;
  line-height: 40px;
  margin: 0;
  grid-column: 1/span3;
  grid-row: 1;
}
.modal-account-close {
  grid-column: 3;
  grid-row: 1;
  line-height: 40px;
  font-size: 14px;
  font-weight: 400;
}
.modal-account-initials {
  border-radius: 50%;
  font-weight: 800;
  font-size: 18px;
  color: #404650;
  background-color: rgb(235, 236, 240);
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-account-user-container {
  display: flex;
  padding: 4px 12px;
}
.modal-account-user-name {
  text-align: left;
  padding-left: 8px;
  font-weight: 500;
  padding-bottom: 5px;
}
.modal-account-user-email {
  text-align: left;
  padding-left: 8px;
  font-size: 11px;
  color: rgb(173, 173, 173);
}
</style>
