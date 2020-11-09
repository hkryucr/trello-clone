<template>
  <div class="login-page">
    <router-link to="/">
      <img alt="Trello" class="trello-main-logo" src="../assets/trello-logo-blue.svg">
    </router-link>
    <div class="form-container">
      <form @submit.prevent="handleLogin($event)">
        <div :class="[errors.length ? 'quick-switch' : '', 'errors']">
          <div class="error-message" v-for="(error, $index) in errors" :key="$index">{{error}}</div>
        </div>
        <h1 class="login-header">Log in to Trello</h1>
        <input class="login-input" type="email" name="email" v-on:input="updateInput($event, 'email')" :value="email" autocorrect="off" spellcheck="false" autocapitalize="off" autofocus="autofocus" placeholder="Enter email" autocomplete="username" inputmode="email">
        <input class="login-input" type="password" v-on:input="updateInput($event, 'password')" :value="password" name="password" placeholder="Enter Password" autocomplete="current-password">
        <input type="submit" class="login-submit-button" value="Log in">
      </form>
      <div class="login-or">OR</div>
      <div class="login-link-container">
        <div class="">
          <!-- <span id="google-icon"></span> -->
          <span class="login-submit-button demo-login-button" @click.prevent="login">Log in with Demo account</span>
        </div>
      </div>
      <div class="bottom-form-links">
        <div class="forgot-password">
          <a class="forgot-password-link" href="">Can't log in?</a>
        </div>
        <div class="register-account">
          <router-link class="register-link" to="/signup">Sign up for an account</router-link>
        </div>
      </div>
    </div>
    <div class="space-holder"></div>
    <splashBottom></splashBottom>
    <background></background>
  </div>
</template>

<script>
import Background from '../components/Background'
import SplashBottom from '@/views/SplashBottom'

export default {
  components: {
    Background,
    SplashBottom
  },
  data: () => ({
    email: '',
    password: '',
    errors: []
  }),
  methods: {
    updateInput (e, target) {
      this.errors = []
      if (target === 'email') {
        this.email = e.target.value
      } else if (target === 'password') {
        this.password = e.target.value
      }
    },
    async handleLogin (e) {
      if (this.email.length === 0) {
        this.errors.push('Missing email')
        return
      }
      const credentials = { email: this.email, password: this.password }
      await this.$store.dispatch('login', credentials)
        .then(async (res) => {
          await this.$store.commit('SET_TOKEN', res.data.token)
          await this.$store.commit('SET_USER', res.data.user)
        })
        .catch(err => {
          this.errors = []
          for (let key in err.response.data) {
            this.errors.push(err.response.data[key])
          }
        })
    },
    login () {
      const credentials = { email: 'achong@amazon.com', password: 'anson chong' }
      this.$store.dispatch('login', credentials)
        .then(async (res) => {
          await this.$store.commit('SET_TOKEN', res.data.token)
          await this.$store.commit('SET_USER', res.data.user)
        })
    }
  }
}
</script>
<style lang="css">
.space-holder {
  flex-grow: 100
}
.errors{
  display: none;
  margin: 1em 0 1.2em 0;
  flex-direction: column;
  align-items: flex-start;
}
.form-container .error-message {
  background: #eb5a46;
  color: #fbedeb;
  font-size: 14px;
  line-height: 1.333;
  border-radius: 4px;
  border: 1px solid #EB5A46;
  /* padding: .5em 1em; */
  display: inline-block;
  white-space: nowrap;
  margin-bottom: 5px;
}
.quick-switch {
  display: flex;
}
.trello-main-logo {
  display: block;
  height: 43px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  margin-bottom: 40px;
}
.form-container {
  background-color: #FFFFFF;
  border-radius: 3px;
  padding: 25px 40px 32px 40px;
  box-shadow: rgba(0,0,0,0.1) 0 0 10px;
  max-width: 400px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}
.login-input {
  font-weight: 500;
  font-size: 14px;
  width: 100%;
  background-color: #FAFBFC;
  border: 2px solid #DFE1E6;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 3px;
  height: 44px;
  padding: 7px;
  -webkit-transition: background-color .2s ease-in-out 0s,border-color .2s ease-in-out 0s;
  transition: background-color .2s ease-in-out 0s,border-color .2s ease-in-out 0s;
  margin: 0 0 1.2em;
}
.login-link-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-bottom: 10px;
  border-bottom: 1px solid lightgrey;
}
.login-method {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: rgba(0,0,0,0.54);
  box-shadow: rgba(0,0,0,0.2) 1px 1px 5px 0;
  border-color: transparent;
  text-align: center;
  border-radius: 3px;
  width: 99%;
  height: 39px;
  padding-top: 0;
  margin-bottom: 12px;
  -webkit-transition: background-color .2s ease-in-out 0s,border-color .2s ease-in-out 0s;
  transition: background-color .2s ease-in-out 0s,border-color .2s ease-in-out 0s;
  cursor: pointer;
}
.login-method:hover {
  background-color: #F9FAFC;
}
.login-method-text {
  font-size: 14px;
  font-family: inherit;
  font-weight: bold;
  color: #505f79;
  padding-left: .5em;
  height: 32px;
  line-height: 32px;
}
.login-header {
  text-align: center;
  color: #5E6C84;
  font-size: 17px;
  letter-spacing: -0.01em;
  line-height: 28px;
  margin-top: 10px;
  margin-bottom: 25px;
  font-weight: bold;
}
.login-submit-button {
  background: #5AAC44;
  border-radius: .3em;
  color: #fff;
  display: inline-block;
  font-weight: bold;
  margin-bottom: .8em;
  padding: .6em 1.3em !important;
  position: relative;
  text-decoration: none;
  border: 0px;
  width: 100%;
  cursor: pointer;
  font-family: Arial, Helvetica, sans-serif;
}
.login-submit-button:hover {
  background-color: #61BD4F;
}
.demo-login-button {
  color: #fff;
  background-color: #0081cb;
}
.demo-login-button:hover {
  background-color: rgba(0, 129, 203, .8);
}
.login-or {
  text-align: center;
  font-size: 12px;
  margin-top: 16px;
  margin-bottom: 16px;
}
#google-icon{
  background: url('../assets/google.png');
  display: inline-block;
  border-radius: 1px;
  width: 18px;
  height: 18px;
  vertical-align: middle;
}
#microsoft-icon{
  background: url('../assets/microsoft.png');
  display: inline-block;
  border-radius: 1px;
  width: 18px;
  height: 18px;
  vertical-align: middle;
}
#apple-icon{
  background: url('../assets/apple.png');
  display: inline-block;
  border-radius: 1px;
  width: 18px;
  height: 18px;
  vertical-align: middle;
}
.sso-link-container {
  display: block;
  text-align: center;
  line-height: 1.333;
  margin-bottom: 14px;
}
.sso-login {
  text-decoration: none;
  color: #0052CC;
  font-size: 14px;
}
.bottom-form-links {
  text-align: center;
  font-size: 14px;
  display: flex;
  padding: 0;
  justify-content: center;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
.forgot-password-link {
  text-decoration: none;
  color: #0052CC;
}
.register-link {
  text-decoration: none;
  color: #0052CC;
}
.register-link::before {
  content: "\2022";
  margin: 0 8px 0px 8px;
}
.bottom-form-smaller-links {
  display: flex;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
.privacy-policy {
  text-decoration: none;
  color: #0052CC;
  font-size: 12px;
}
.terms-of-service {
  text-decoration: none;
  color: #0052CC;
  font-size: 12px;
}
.terms-of-service::before {
  content: "\2022";
  margin: 0 8px 0px 8px;
}
</style>
