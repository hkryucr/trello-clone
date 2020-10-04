<template>
  <div>
    <div class='modal-create-header'>
        <div>Create</div>
        <div>X</div>
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
.modal-create-header {
    margin-bottom: 8px;
    padding: 0 12px;
    position: relative;
    text-align: center;
    display: grid;
    grid-template-columns: 12px 1fr 12px;
}
</style>
