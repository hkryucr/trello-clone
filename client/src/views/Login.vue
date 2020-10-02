<template>
  <div>
    <img alt="Trello" class="trello-main-logo" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg">
    <section class="inner-section">
      <div class="section-wrapper">
        <div class="account-form">
          <h1>Log in to Trello</h1>
          <div class="login-password-container">
            <form v-on:submit.prevent="handleLogin">
              <div class="login-password-email-container">
                <div class="email-password">
                  <div class="input-container">
                    <input type="text" name="user" class="form-field" autocorrect="off" spellcheck="false" autocapitalize="off" autofocus="autofocus" placeholder="Enter email" v-model="email" autocomplete="username" inputmode="email">
                    <div class="show-when-password">
                      <input type="password" name="password" v-model="password" class="form-field" placeholder="Enter password" autocomplete="current-password">
                    </div>
                  </div>
                  <input type="submit" class="button account-button button-green btn btn-success" value="Log in">
                </div>
              </div>
            </form>
            <div class="login-methods">
              <div class="login-methods-separtor">OR</div>
              <div class="login-oauth-container">
                <div class="google-button oauth-button" tabindex="0">
                  <span class="icon"></span>
                  <span class="label" data-analytics-button="loginWithGmailButton">Continue with Google</span>
                </div>
              </div>
              <ul class="bottom-form-link">
                <li>
                  <a class="forgot-password-link" href="">Can't log in?</a>
                </li>
                <li>
                  ::before
                  <a class="register-link" href="/signup">Sign up for an account</a>
                </li>
              </ul>
            </div>
            <ul class="smaller-links">
              <li>
                <a href="">Privacy Policy</a>
              </li>
              <li>
                ::before
                <a href="">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    </div>
</template>

<script>
import { fetchUser } from '../utils/UserApiUtil'
export default {
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    async handleLogin () {
      const credentials = { email: this.email, password: this.password }
      await this.$store.dispatch('login', credentials)
        .then(async (res) => {
          await this.$store.commit('SET_TOKEN', res.data.token)
          fetchUser(res.data.user.id)
            .then(user => this.$store.commit('SET_USER', user.data))
        })
        .catch(err => {
          console.log(err.response, 'login error')
        })
    }
  }
}
</script>

<style lang="css">
.trello-main-logo {
    display: block;
    height: 43px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    margin-bottom: 40px;
}

.trello-main-logo {
    display: block;
    height: 43px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    margin-bottom: 40px;
}

.inner-section .section-wrapper {
    max-width: 400px;
}

.inner-section {
    width: 100%;
    padding: 0px;
    overflow: visible;
    margin-bottom: 30px;
}

.section-wrapper {
    max-width: 540px;
    margin: 0 auto;
}

.section-wrapper {
    max-width: 540px;
    margin: 0 auto;
}

.inner-section .account-form {
    background-color: #FFFFFF;
    border-radius: 3px;
    padding: 25px 40px;
    box-shadow: rgba(0,0,0,0.1) 0 0 10px;
}
.inner-section .account-form input[type="text"] {
    width: 100%;
}

.inner-section > input[type="text"] {
    background: #EDEFF0;
    border-radius: 4px;
    border: 1px solid #CDD2D4;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: .5em;
    max-width: 400px;
    width: 100%;
}
.inner-section .form-field {
    font-size: 14px;
    background-color: #FAFBFC;
    border: 2px solid #DFE1E6;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 3px;
    height: 44px;
    -webkit-transition: background-color .2s ease-in-out 0s,border-color .2s ease-in-out 0s;
    transition: background-color .2s ease-in-out 0s,border-color .2s ease-in-out 0s;
}
.inner-section .account-form .button-green:not(:disabled) {
    background: #5AAC44;
}

.inner-section .account-form input[type="submit"] {
    width: 100%;
}

.inner-section .account-form .button-green {
    box-shadow: none;
}

.inner-section .account-button {
    margin-bottom: 0.8em;
}
.button-green {
    background: #61BD4F;
    background: -webkit-gradient(linear, left top, left bottom, from(#61BD4F), to(#5AAC44));
    background: linear-gradient(to bottom, #61BD4F 0%, #5AAC44 100%);
    box-shadow: 0 2px 0 #3F6F21;
    color: #fff;
}

.button {
    background: #CDD2D4;
    background: -webkit-gradient(linear, left top, left bottom, from(#CDD2D4), to(#C4C9CC));
    background: linear-gradient(to bottom, #CDD2D4 0%, #C4C9CC 100%);
    border-radius: .3em;
    box-shadow: 0 2px 0 hsl(0,0%,30%);
    /* color: hsl(0,0%,30%); */
    display: inline-block;
    font-weight: bold;
    margin-bottom: .8em;
    padding: .6em 1.3em;
    position: relative;
    text-decoration: none;
    border: 0px;
}
.inner-section .account-form .login-method-separator {
    text-align: center;
    font-size: 12px;
    margin-top: 16px;
    margin-bottom: 16px;
}

.inner-section .account-form .oauth-button {
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
}

.bottom-form-link-container {
    font-size: 14px;
    display: flex;
}

.inner-section .bottom-form-link {
    width: 100%;
    margin: 0 auto;
}

.bottom-form-link {
    flex-direction: row;
}

.inner-section a {
    text-decoration: none;
    color: #0052CC;
}
.inner-section .bottom-form-link div:not(:first-child)::before {
    content: "\2022";
    margin: 0 8px 0px 4px;
}
</style>
