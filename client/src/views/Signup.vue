<template>
  <div class="signup-page">
    <img alt="Trello" class="trello-main-logo" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg">
    <div class="form-container">
      <form>
        <h1>Sign up for your account</h1>
        <input class="signup-input" type="text" name="email" id="email" autocorrect="off" spellcheck="false" autocapitalize="off" autofocus="autofocus" placeholder="Enter email" value="" autocomplete="username" inputmode="email">
        <div>
          By signing up, you confirm that you've read and accepted our
          <a href="">Terms of Service</a>
          and
          <a href="">Privacy Policy</a>
          .
        </div>
        <button>Continue</button>
      </form>
      <div>OR</div>
      <div class="signup-links">
        <a class="signup-link" href="">Continue with Google</a>
        <a class="signup-link" href="">Continue with Microsoft</a>
        <a class="signup-link" href="">Continue with Apple</a>
      </div>
      <a href="">Already have an account? Log In</a>
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
        width: 385px;
        align-self: center;
    }
    .signup-page{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .signup-input{
      border: 2px solid #DFE1E6;
      width: 75%;
      padding: 7px;
    }
    .signup-links{
      display: flex;
      flex-direction: column;
    }
    .signup-link{
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
    }
  </style>
