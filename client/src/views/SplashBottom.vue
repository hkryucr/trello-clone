<template>
  <footer class="global-footer">
    <div class="global-footer-detail">
      <hr>
      <!-- <img class="atlassian-logo-small white" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/e4e8fa01ba058bce8e9f2bb7459516f9/atlassian-logo-white-small.svg" width="150"/> -->
      <img class="atlassian-logo-small" src="../assets/Log in to Trello-3.svg" width="150"/>
      <div>
        &nbsp;© Copyright 2020. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script>
export default {
}
</script>

<style lang="css">
.global-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 7.5rem;            /* Footer height */
}
.global-footer {
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 100%;
}
.global-footer hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid hsl(0,0%,80%);
    margin: 1em 0;
    padding: 0;
    max-width: 400px;
    margin: 25px auto;
}
.atlassian-logo-small {
  margin-bottom: 16px;
}
</style>
