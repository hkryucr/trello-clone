<template>
  <div class="signup-page">
    <a href="/">
      <img alt="Trello" class="trello-main-logo" src="../assets/trello-logo-blue.svg">
    </a>
    <div class="form-container-signup">
      <form @submit.prevent="handleSubmit">
        <h1 class="signup-header">Sign up for your account</h1>
        <p v-if="errors.length">
          <ul>
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          </ul>
        </p>
        <input class="signup-input" type="email" name="email" autocorrect="off" spellcheck="false" autocapitalize="off" autofocus="autofocus" placeholder="Enter email" v-model="email" autocomplete="username" inputmode="email">
        <input class="signup-input" type="text" name="name" autocorrect="off" spellcheck="false" autocapitalize="off" autofocus="autofocus" placeholder="Enter full name" v-model="fullName" autocomplete="username" inputmode="email">
        <input class="signup-input" type="password" name="password" autocorrect="off" spellcheck="false" autocapitalize="off" autofocus="autofocus" placeholder="Create password" v-model="password" autocomplete="username" inputmode="email">
        <p class="signup-policy" style="text-align: start">
          By signing up, you confirm that you've read and accepted our
          <a class="policy-link">Terms of Service</a>
          and
          <a class="policy-link">Privacy Policy</a>
          .
        </p>
        <input :class="(this.checkForm) ? 'hello':''" type="submit" class="signup-submit-button" value="Sign Up">
      </form>
      <div class="signup-or">OR</div>
      <div class="signup-link-container">
        <div class="signup-link">
          <span id="google-icon"></span>
          <span class="signup-link-text">Continue with Google</span>
        </div>
        <!-- <div class="signup-link">
          <span id="microsoft-icon"></span>
          <span class="signup-link-text">Continue with Microsoft</span>
        </div>
        <div class="signup-link">
          <span id="apple-icon"></span>
          <span class="signup-link-text">Continue with Apple</span>
        </div> -->
      </div>
      <a class="login-link" href="/login">Already have an account? Log In</a>
    </div>
    <splashBottom></splashBottom>
    <background></background>
  </div>
</template>
<script>
import { fetchUser } from '../utils/UserApiUtil'
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
      errors: []
    }
  },
  mounted () {
    this.email = this.$router.history.current.params.email
  },
  methods: {
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
          fetchUser(res.data._id)
            .then((user) => {
              this.$store.commit('SET_USER', user.data)
            })
        })
        .catch(err => {
          console.log(err.response, 'login error')
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
    }
  }
}
</script>
<style lang="css">
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
}
.signup-input{
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
  font-size: 16px;
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
  background: #E2E4E6;
  border-radius: .3em;
  color: hsl(0,0%,55%);
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
