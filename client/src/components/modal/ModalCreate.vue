<template>
  <div class='modal-create'>
    <div class='modal-create-header-container'>
        <div class='modal-create-header'>Create</div>
        <div class='modal-create-close'>X</div>
    </div>
    <div>
      <section>
        <div>Switch To</div>
        <div>
          <font-awesome-icon :icon="home"></font-awesome-icon>
        </div>
      </section>
      <section>
        <div>Discover</div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </section>
    </div>
  </div>
</template>

<style lang="css">
.modal-create {
  display: flex;
  flex-direction: column;
  width: 370px;
}
.modal-create-header-container {
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  vertical-align: middle;
  border-bottom: 1px solid rgba(9,30,66,.13);

}
.modal-create-header {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  font-size: 14px;
  font-weight: 400;
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
}
</style>
