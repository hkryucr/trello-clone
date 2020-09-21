<template>
  <div class="signup-page">
    <img alt="Trello" class="trello-main-logo" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg">
    <div class="form-container">
      <form>
        <h1 class="signup-header">Sign up for your account</h1>
        <input class="signup-input" type="text" name="email" id="email" autocorrect="off" spellcheck="false" autocapitalize="off" autofocus="autofocus" placeholder="Enter email" value="" autocomplete="username" inputmode="email">
        <p class="signup-policy" style="text-align: start">
          By signing up, you confirm that you've read and accepted our
          <a class="policy-link">Terms of Service</a>
          and
          <a class="policy-link">Privacy Policy</a>
          .
        </p>
        <input type="submit" class="signup-submit-button" value="Continue" disabled/>
      </form>
      <div class="signup-or">OR</div>
      <div class="signup-link-container">
        <div class="signup-link">
          <span id="google-icon"></span>
          <span class="signup-link-text">Continue with Google</span>
        </div>
        <div class="signup-link">
          <span id="microsoft-icon"></span>
          <span class="signup-link-text">Continue with Microsoft</span>
        </div>
        <div class="signup-link">
          <span id="apple-icon"></span>
          <span class="signup-link-text">Continue with Apple</span>
        </div>
      </div>
      <a class="login-link" href="/login">Already have an account? Log In</a>
    </div>
  </div>
</template>

<style lang="css">
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
        padding: 25px 40px;
        box-shadow: rgba(0,0,0,0.1) 0 0 10px;
        width: 400px;
        height: 538px;
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
      padding: .6em 1.3em;
      position: relative;
      text-decoration: none;
      border: 0px;
      width: 100%;
      cursor: default;
      font-family: Arial, Helvetica, sans-serif;
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
      color: blue;
    }

    .policy-link{
      text-decoration: none;
      color: blue;
    }

    .login-link:hover, .policy-link:hover{
      text-decoration: underline;
    }
  </style>
    <a href="">Already have an account? Log In</a>
  </div>
</template>
<script>
// const newUser = new User({
//   email: req.body.email,
//   password: req.body.password,
//   initials: req.body.initials,
//   fullName: req.body.fullName,
//   bio: req.body.bio
// })
import axios from 'axios'
import * as io from 'socket.io-client'

export default {
  components: {
    // BoardColumn
  },
  data () {
    return {
      socket: io('http://localhost:5000')
    }
  },
  mounted () {
    axios.get(`/api/users/`)
      .then(response => {
        // this.chats = response.data
        console.log(response)
      })
      .catch(e => {
        // this.errors.push(e)
        console.log(e)
      })

    console.log('this is between axios and socket')

    this.socket.on('connect', function () {
      console.log('connected')
    })
    // this.socket.on('create column', function (data) {

    // }
  }
}

</script>
<style lang="css">
</style>
