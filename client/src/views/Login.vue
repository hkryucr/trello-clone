<template>
    <div>
        <img alt="Trello" class="trello-main-logo" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg">

        <section>
            <div class="section-wrapper">
                <div class="account-form">
                    <h1>Log in to Trello</h1>
                    <div class="login-password-container">
                        <form id="login-form" method="POST">
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

                            </div>
                        </div>
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