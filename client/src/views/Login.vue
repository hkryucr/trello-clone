<template>
  <div>
    <img alt="Trello" class="trello-main-logo" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg">
    <section class="inner-section">
      <div class="section-wrapper">
        <div class="account-form">
          <h1>Log in to Trello</h1>
          <div class="login-password-container">
            <form id="login-form">
              <div class="login-password-email-container">
                <div class="email-password">
                  <div class="input-container">
                    <input type="text" name="user" id="user" class="form-field" autocorrect="off" spellcheck="false" autocapitalize="off" autofocus="autofocus" placeholder="Enter email" value="" autocomplete="username" inputmode="email">
                    <div id="password-entry" class="show-when-password">
                      <input type="password" name="password" id="password" class="form-field" placeholder="Enter password" autocomplete="current-password">
                    </div>
                  </div>
                  <input id="login" type="submit" class="button account-button button-green btn btn-success" value="Log in">
                </div>
              </div>
            </form>
            <div class="login-methods">
              <div class="login-methods-separtor">OR</div>
              <div class="login-oauth-container">
                <div id="googleButton" class="google-button oauth-button" tabindex="0">
                  <span id="google-icon" class="icon"></span>
                  <span class="label" data-analytics-button="loginWithGmailButton">Continue with Google</span>
                </div>
              </div>
              <div class="bottom-form-link">
                <div>
                  <a class="forgot-password-link" href="">Can't log in?</a>
                </div>
                <div>
                  <a class="register-link" href="/signup">Sign up for an account</a>
                </div>
              </div>
            </div>
            <ul class="smaller-links">
              <li>
                <a href="">Privacy Policy</a>
              </li>
              <li>
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
export default {

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

    h1 {
        font-size: 1.777em;
        line-height: 1.2em;
        margin-top: 1.6em;
    }

    h1 {
        margin: 0.67em 0;
    }

    h1 {
        display: block;
        font-size: 2em;
        margin-block-start: 0.67em;
        margin-block-end: 0.67em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
    }

    div {
        display: block;
    }

    form {
        display: block;
        margin-top: 0em;
    }

    .inner-section .account-form input[type="text"] {
        width: 100%;
    }

    input[type="text"] {
        background: #EDEFF0;
        border-radius: 4px;
        border: 1px solid #CDD2D4;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: .5em;
        max-width: 400px;
        width: 100%;
    }

    input {
        display: block;
        margin: 0 0 1.2em;
        line-height: normal;
        color: inherit;
        font: inherit;
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

    * {
        border-width: 0;
        border-style: solid;
        border-color: #dae1e7;
    }

    input[type="password"] {
        background: #EDEFF0;
        border-radius: 4px;
        border: 1px solid #CDD2D4;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: .5em;
        max-width: 400px;
        width: 100%;
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

    input[type="submit"] {
        cursor: pointer;
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

    input[type="submit" i] {
        appearance: push-button;
        user-select: none;
        white-space: pre;
        align-items: flex-start;
        text-align: center;
        color: -internal-light-dark(buttontext, rgb(170, 170, 170));
        background-color: -internal-light-dark(rgb(239, 239, 239), rgb(74, 74, 74));
        box-sizing: border-box;
        padding: 1px 6px;
        border-width: 2px;
        border-style: outset;
        border-color: -internal-light-dark(rgb(118, 118, 118), rgb(195, 195, 195));
        border-image: initial;
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

    a {
        background: transparent;
        cursor: pointer;
    }

    .inner-section .bottom-form-link div:not(:first-child)::before {
        content: "\2022";
        margin: 0 8px 0px 4px;
    }

    #google-icon{
      background: url('../assets/google.png');
      display: inline-block;
      border-radius: 1px;
      width: 18px;
      height: 18px;
      vertical-align: middle;
    }

</style>
