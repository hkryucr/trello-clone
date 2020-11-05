<template>
  <div class="signup-page">
    <router-link to="/">
      <img alt="Trello" class="trello-main-logo" src="../assets/trello-logo-blue.svg">
    </router-link>
    <div class="form-container-signup">
      <form @submit.prevent="handleSubmit">
        <div :class="[errors.length ? 'quick-switch' : '', 'errors']">
          <div class="error-message" v-for="(error, $index) in errors.slice(0, 2)" :key="$index">{{error}}</div>
        </div>
        <h1 class="signup-header">Sign up for your account</h1>
        <input class="signup-input" type="email" name="email" autocorrect="off" spellcheck="false" autocapitalize="off" autofocus="autofocus" placeholder="Enter email" v-on:input="updateInput($event, 'email')" :value="email" autocomplete="username" inputmode="email">
        <input class="signup-input" type="text" name="name" autocorrect="off" spellcheck="false" autocapitalize="off" autofocus="autofocus" placeholder="Enter full name" v-on:input="updateInput($event, 'fullName')" :value="fullName" autocomplete="username" inputmode="email">
        <input class="signup-input" type="password" name="password" autocorrect="off" spellcheck="false" autocapitalize="off" autofocus="autofocus" placeholder="Create password" v-on:input="updateInput($event, 'password')" :value="password" autocomplete="username" inputmode="email">
        <p class="signup-policy" style="text-align: start">
          By signing up, you confirm that you've read and accepted our
          <a class="policy-link">Terms of Service</a>
          and
          <a class="policy-link">Privacy Policy</a>
          .
        </p>
        <input :class="(this.checkForm) ? 'hello':''" type="submit" class="signup-submit-button" value="Sign Up"/>
      </form>
      <div class="signup-or">OR</div>
      <div class="signup-link-container">
        <div class="">
          <!-- <span id="google-icon"></span> -->
          <span class="signup-submit-button demo-login-button" @click.prevent="login">Log in with Demo account</span>
        </div>
      </div>
      <router-link class="login-link" to="/login">Already have an account? Log In</router-link>
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
  data () {
    return {
      email: '',
      fullName: '',
      password: '',
      password2: '',
      errors: [],
      validated: false
    }
  },
  mounted () {
    if (this.$router) this.email = this.$router.history.current.params.email
  },
  methods: {
    updateInput (e, target) {
      this.errors = []
      if (target === 'email') {
        this.email = e.target.value
      } else if (target === 'password') {
        this.password = e.target.value
      } else if (target === 'fullName') {
        this.fullName = e.target.value
      }
    },
    async handleSubmit () {
      const credentials = {
        email: this.email,
        password: this.password,
        password2: this.password,
        fullName: this.fullName,
        initials: this.getInitials(this.fullName),
        bio: ''
      }

      await this.$store.dispatch('signup', credentials)
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
    getInitials (fullName) {
      let initials = fullName.match(/\b\w/g) || []
      initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
      return initials
    },
    checkForm: function () {
      if (this.email && this.fullName && this.password) {
        return true
      }
      this.errors = []
      if (!this.email) {
        this.errors.push('Email field is required')
      }
      if (!this.fullName) {
        this.errors.push('Full name field is required')
      }
      if (!this.password) {
        this.errors.push('Password field is required')
      }
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
.form-container-signup .error-message {
  background: #eb5a46;
  color: #fbedeb;
  font-size: 14px;
  line-height: 1.333;
  border-radius: 4px;
  border: 1px solid #EB5A46;
  padding: .5em 1em;
  display: inline-block;
  white-space: nowrap;
  margin-bottom: 5px;
}
.quick-switch {
  display: flex;
}
.hello{
  border: 2px solid red;
}
.trello-main-logo {
  display: block;
  height: 43px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  margin-bottom: 40px;
}
.form-container-signup {
  background-color: #FFFFFF;
  border-radius: 3px;
  padding: 25px 40px 16px 40px;
  box-shadow: rgba(0,0,0,0.1) 0 0 10px;
  width: 400px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.signup-page{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}
.signup-input{
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
.signup-link-container{
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  border-bottom: 1px solid lightgrey;
}
.signup-link{
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
.signup-header{
  text-align: center;
  color: #5E6C84;
  font-size: 17px;
  letter-spacing: -0.01em;
  line-height: 28px;
  margin-top: 10px;
  margin-bottom: 25px;
  font-weight: bold;
}
.signup-policy{
  text-align: start;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 12px;
  line-height: 16px;
  color: #5E6C84;
  font-weight: 349;
  font-family: "-apple-system",BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
}

.signup-submit-button{
  background: rgb(0, 82, 204);
  border-radius: .3em;
  color:white;
  display: inline-block;
  font-weight: bold;
  margin-bottom: .8em;
  padding: .6em 1.3em !important;
  position: relative;
  text-decoration: none;
  border: 0px;
  width: 100%;
  cursor: default;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}
.signup-submit-button:hover{
  background: rgb(0, 101, 255);
}
.signup-or{
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

.signup-link-text{
  font-size: 14px;
  font-family: inherit;
  font-weight: bold;
  color: #505f79;
  padding-left: .5em;
  height: 32px;
  line-height: 32px;
}

.login-link{
  display: block;
  padding: 20px;
  text-decoration: none;
  color: #0052cc;
  cursor: pointer;
  font-size: 14px;
}

.policy-link{
  text-decoration: none;
  color: #0052cc;
}

.login-link:hover, .policy-link:hover{
  text-decoration: underline;
}
</style>
