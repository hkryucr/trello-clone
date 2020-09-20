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
                            <ul class="bottom-form-link">
                                <li>
                                    <a class="forgot-password-link" href="">Can't log in?</a>
                                </li>
                                <li>
                                    ::before
                                    <a class="register-link" href="/register">Sign up for an account</a>
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

// import SplashBottom from '@views/SplashBottom'

// export default {
//     components: {
//         SplashBottom
//     }
// }
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

    .inner-section .account-form {
        background-color: #FFFFFF;
        border-radius: 3px;
        padding: 25px 40px;
        box-shadow: rgba(0,0,0,0.1) 0 0 10px;
    }

    .inner-section h1 {
        text-align: center;
        color: #5E6C84;
        font-size: 16px;
        letter-spacing: -0.01em;
        line-height: 28px;
        margin-top: 10px;
        margin-bottom: 25px;
    }

</style>