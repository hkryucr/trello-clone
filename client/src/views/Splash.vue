<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      loggedIn: false,
      email: '',
      scrollPosition: null,
      splashHeaderFixed: false
    }
  },
  methods: {
    handleClick: function (target) {
      switch (target) {
        case 'email-signup':
          this.$router.push({ name: 'signup', params: { 'email': this.email } })
          break
        case 'demo-login':
          const credentials = { email: 'achong@amazon.com', password: 'anson chong' }
          this.$store.dispatch('login', credentials)
            .then(async (res) => {
              await this.$store.commit('SET_TOKEN', res.data.token)
              await this.$store.commit('SET_USER', res.data.user)
            })
          break
      }
    },
    updateScroll () {
      this.scrollPosition = window.scrollY
      if (this.scrollPosition > 40) {
        this.splashHeaderFixed = true
      } else {
        this.splashHeaderFixed = false
      }
    }
  },
  computed: {
    ...mapState(['board'])
  },
  mounted () {
    window.addEventListener('scroll', this.updateScroll)
  }
}
</script>

<template>
  <div class="splash">
    <header class="splash-header" :class="splashHeaderFixed ? 'splash-header-fixed' : ''">
      <nav class="splash-header-nav">
        <router-link to="/">
          <svg class="d-block" width="130" height="40" viewBox="0 0 885 272" alt="Trello">
            <g fill="#fff" fill-rule="evenodd">
              <path d="M723.294 178.59c-12.77 5.203-22.85 23.18-38.176 33.4-.95.632-1.9.95-2.534.95-1.267 0-2.85-1.268-2.85-6.97 0-19.642 6.335-29.146 11.72-43.085 18.692-48.47 50.688-89.97 79.2-135.274 2.218-3.484 3.485-7.285 3.485-11.404 0-3.484-1.268-6.336-2.852-9.82C770.02 3.534 764.318 1 757.982 1c-3.484 0-6.652.317-10.77.317-14.89 0-18.058 21.86-21.543 27.56-23.76 40.235-51.006 89.973-64.945 125.137-3.057 7.883-6.36 15.767-8.868 23.857-13.775 3.99-24.095 23.358-40.236 34.12-.95.632-1.9.95-2.534.95-1.267 0-2.85-1.268-2.85-6.97 0-19.642 6.335-29.146 11.72-43.085 18.692-48.47 50.69-89.97 79.2-135.274 2.218-3.484 3.486-7.285 3.486-11.404 0-3.484-1.268-6.336-2.852-9.82C696.523 3.534 690.82 1 684.485 1c-3.485 0-6.653.317-10.77.317-14.89 0-18.06 21.86-21.544 27.56-23.76 40.235-51.004 89.973-64.943 125.137-1.108 2.858-2.248 5.716-3.372 8.584-.346.185-.7.386-1.063.604-16.157 9.504-29.78 26.294-49.42 37.7-3.802 2.216-15.524 10.453-25.028 10.453-2.218 0-4.118-.633-6.02-1.584-2.85-1.266-5.702-7.285-5.702-9.186 0-1.584.317-1.9 3.485-3.802 27.88-16.79 50.688-40.867 70.33-64.944 7.286-8.87 16.79-26.294 16.79-38.966 0-8.237-2.85-17.74-12.672-21.226-6.97-2.534-14.89-3.8-21.225-3.8-16.79 0-29.146 7.602-36.116 14.888-7.095 7.575-13.958 15.353-20.335 23.405-6.663-5.753-16.06-8.2-24.968-8.2-10.454 0-30.096 12.99-40.234 20.593-1.584 1.267-2.534 1.9-3.168 1.9-.316 0-.633-.316-.633-.95 0-.317.633-3.168.633-8.237 0-4.435-.95-10.137-5.068-17.107-.95-1.585-6.653-5.07-13.623-5.07-8.554 0-16.474 4.12-16.474 8.554 0 3.168 2.85 4.435 2.85 7.286 0 1.584-1.266 8.87-3.167 15.84-5.387 20.276-12.04 40.234-19.01 60.192-3.8 11.088-16.473 20.91-16.473 32.948 0 3.8 2.535 8.87 6.02 12.672 5.702 6.336 9.187 8.553 14.255 8.553 2.218 0 4.752-.633 6.97-2.534 4.752-4.118 7.286-8.236 8.554-13.938 8.236-37.383 31.996-62.727 58.29-79.517 8.87-5.703 20.91-11.722 22.494-11.722 1.624 0 4.164.75 6.724 1.48-7.35 11.99-13.306 24.632-17.18 38.12-1.266 4.435-1.9 8.554-1.9 12.99 0 7.285 1.584 14.89 4.12 22.175 3.484 10.138 9.186 19.008 17.106 23.126 14.573 7.604 25.027 11.722 34.53 11.722 5.387 0 9.505-.95 13.94-3.485 20.823-11.78 33.59-20.718 42.807-28.656.253 8.05 1.84 12.508 7.565 18.52 5.702 6.02 14.572 11.404 26.294 13.94 1.9.316 3.802.632 5.702.632 13.41 0 26.318-10.9 36.27-21.706 1.152 2.358 2.827 4.61 5.23 7.134 5.704 6.02 14.574 11.404 26.296 13.94 1.9.316 3.8.632 5.702.632 15.71 0 30.727-14.957 41.114-27.2 3.462 7.162 13.137 14.24 24.78 19.914 3.168 1.584 6.97 2.534 10.455 2.534 13.622 0 23.443-11.088 31.046-19.324 19.643-21.543 30.414-48.154 38.65-81.735.634-2.534 1.585-3.485 2.852-3.485 3.168 0 7.286 0 11.722-.633 8.553-1.267 15.206-4.12 23.126-5.386 4.752-.95 4.118-2.533 8.554-4.117 3.168-1.267 5.702-2.535 5.702-5.703 0-5.385-9.82-11.088-24.71-11.088-11.722 0-18.692.95-23.444.95-7.286 0-9.187-2.217-13.94-14.572 0 0 4.753 12.355 0 0-.95-2.534-1.9-3.802-4.75-6.336-6.654-5.702-14.89-7.603-21.543-7.603-15.84 0-29.464 16.158-38.968 29.78-2.217 3.168-5.385 5.702-7.603 9.187-13.05 19.575-25.545 41.65-27.086 65.443zM318.264 70.696c7.92 0 12.355-.634 13.306-.634.95 0 1.584.317 1.584 1.268 0 .633-.317 1.584-2.535 6.336-19.326 41.5-32.63 83.635-44.353 130.204-.317 1.268-1.267 6.02-1.267 10.772 0 4.435 1.267 9.187 5.702 11.72 8.554 5.07 15.524 7.288 20.276 7.288 6.97 0 10.454-4.436 10.454-11.722 0-6.336.317-12.99 1.267-18.058 8.87-46.57 22.175-83 42.767-121.017 9.82-18.058 11.088-19.008 11.088-20.592 0-.633-.317-1.583-.95-2.534 12.672-2.85 27.878-4.752 41.817-4.752 1.584 0 7.92 2.218 8.87 3.168 2.218 2.218 4.436 4.436 8.238 4.436 3.168 0 8.553-2.218 10.454-3.485 4.435-3.168 6.653-6.653 6.653-12.355 0-5.386-19.96-18.692-33.898-18.692-17.108 0-32.63 2.218-47.204 5.07-6.336 1.266-29.146 4.75-45.62 4.75-15.84 0-14.89-2.216-21.542-2.216-3.8 0-5.702 1.9-7.286 3.484-1.584 1.584-2.534 7.92-2.534 13.623 0 2.85 0 5.07 1.584 6.97 4.752 5.702 13.94 6.97 23.126 6.97 0 0-9.187 0 0 0zm234.75 25.66c0 2.852-.952 4.753-4.753 10.772-3.8 6.02-2.217 6.02-6.97 12.355-9.186 12.355-20.59 24.71-35.48 38.333-4.12 3.802-4.752 3.802-5.386 3.802-.317 0-.95-.317-.95-.95 0-.95.316-2.218 3.484-8.87 9.82-20.593 21.86-34.216 35.165-47.52 7.287-7.288 11.722-9.822 13.306-9.822.95 0 1.583.317 1.583 1.9 0 0 0-1.583 0 0zm243.618 8.238c.317 0 .634.316.95.95.317.95.95 1.9 2.535 3.168 1.267.95 1.267 5.386 1.267 8.87 0 30.73-17.424 56.074-34.53 81.735-3.803 5.702-6.02 6.653-7.92 6.653-1.585 0-4.12-4.12-5.07-6.653-1.267-3.485-1.584-7.603-1.584-9.187 0-24.71 23.443-61.46 38.966-81.735 2.535-3.485 4.436-3.8 5.386-3.8 0 0-.95 0 0 0z">
              </path>
              <path d="M75 36c-13.807 0-25 11.2-25 25v150c0 13.806 11.2 25 25 25h150c13.806 0 25-11.2 25-25V61c0-13.807-11.2-25-25-25H75zm99.997 26C168.37 62 163 67.372 163 74.006v63.988c0 6.63 5.373 12.006 11.997 12.006h37.006c6.626 0 11.997-5.372 11.997-12.006V74.006C224 67.376 218.627 62 212.003 62h-37.006zm-87 0C81.37 62 76 67.367 76 74.005v113.99C76 194.625 81.373 200 87.997 200h37.006c6.626 0 11.997-5.367 11.997-12.005V74.005C137 67.375 131.627 62 125.003 62H87.997z"></path>
            </g>
          </svg>
        </router-link>
        <div>
          <router-link data-testid="login" to="/login" class="login btn-sm text-white">
            Log In
          </router-link>
          <router-link data-testid="signup" to="/signup" class="signup btn-sm text-trello bg-white">
            Sign Up
          </router-link>
        </div>
      </nav>
    </header>
    <section class="hero">
      <div class="container pt-7 pb-6 text-white">
        <div class="flex flex-wrap flex-row items-center text-center text-md-left">
          <div class="col-lg-6">
            <h1 style="font-weight: 600">Trello helps teams work more collaboratively and get more done.</h1>
            <p class="lead">Trello’s boards, lists, and cards enable teams to organize and prioritize projects in a fun, flexible, and rewarding way.</p>
          </div>
          <div class="col-lg-6">
            <img src="../assets/hero-a.svg" alt="">
          </div>
          <form data-testid="quick-signup-form" class="quick-signup flex-wrap" @submit.prevent="handleClick('email-signup')">
            <input data-testid="quick-signup-input" name="email" class="quick-signup-email" type="email" placeholder="Email" v-model="email">
            <button data-testid="quick-signup-button" type="submit" data-analytics-button="greenSignupHeroButton" class="quick-signup-email-btn btn btn-success px-4">Sign Up – It’s Free!</button>
            <button data-testid="demo-login" @click.prevent="handleClick('demo-login')" data-analytics-button="greenSignupHeroButton" class="quick-signup-email-btn btn btn-demo-user px-4">Log In as a Demo User</button>
          </form>
        </div>
      </div>
    </section>
    <section class="team">
      <div class="section-container" style="padding-top: 1rem">
        <div class="section-container-row">
          <div class="section-container-row-left">
            <h3>Work with any team</h3>
            <div>Whether it’s for work, a side project or even the next family vacation, Trello helps your team stay organized.</div>
            <router-link to="/signup" class="btn btn-secondary px-3 start-doing-btn" >
              <button>Start doing →</button>
            </router-link>
          </div>
          <div class="section-container-row-right">
            <img src="../assets/teamtask.png" alt="" style="max-width: 100%">
          </div>
        </div>
        <div class="section-container-row">
          <div class="section-container-row-left" id="image-disabled-smaller">
              <img src="../assets/card-back.svg" alt="">
          </div>
          <div class="section-container-row-right2">
            <h3>Information at a glance</h3>
            <div>Dive into the details by adding comments, attachments, due dates, and more directly to Trello cards. Collaborate on projects from beginning to end.</div>
          </div>
        </div>
        <div class="section-container-row">
          <div class="section-container-row-left section-container-row-left3">
            <h3>Built-In Workflow Automation With Butler</h3>
            <div>Let the robots do the work! Boost spanroductivity by unleashing the power of automation across your entire team with Butler, and remove tedious tasks from your to-do lists with:</div>
            <ul style="display: block;">
              <li>Rule-Based Triggers</li>
              <li>Custom Card & Board Buttons</li>
              <li>Calendar Commands</li>
              <li>Due Date Commands</li>
            </ul>
          </div>
          <div class="section-container-row-right3">
            <img src="../assets/butler.png" alt="" style="max-width: 95%">
          </div>
        </div>
      </div>
    </section>
    <div class="bottom-gradient">
      <section class="work-smarter">
        <div class="work-smarter-container">
          <div class="inner py-12 px-20 text-center text-white">
            <h3>Work smarter with Trello</h3>
            <p>Companies of all shapes and sizes use Trello.</p>
            <div class="row flex justify-center mt-12">
              <div class="mb-12 flex items-center" v-for="(num, $index) in [0, 1, 2, 3, 4, 5, 6]" :key="$index">
                <img :src="require(`../assets/company-${num}.svg`)" alt="" style="width: 168px;max-height: 60px;">
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="get-started" class="get-started flex items-center my-4">
        <div class="get-started-container text-center py-6">
          <div class="row flex">
            <div class="col-md-8 offset-md-2 col-lg-6 offset-lg-3 px-lg-5 pt-4">
              <h3>Start Planning Today</h3>
              <p>Sign up and join over 1,000,000 teams worldwide who are using Trello to get more done.</p>
              <router-link to="/signup" class="btn btn-success px-3">Get Started – It’s Free!</router-link>
            </div>
          </div>
        </div>
      </section>
      <section class="splash-footer">
        <div class="global-footer-detail">
          <img class="atlassian-logo-small white" src="../assets/Log in to Trello-4.svg">
          <div>&nbsp;© Copyright 2020. All rights reserved.</div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="css">
#image-disabled-smaller {
  display: none;
}
@media (min-width: 576px) {
  #image-disabled-smaller {
    display: block;
  }
}
.splash-footer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 4em 1em;
}
.splash-footer > .global-footer-detail {
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
  line-height: 1.5;
  color: #172B4D;
}
.global-footer-detail > div {
  margin-bottom: 1rem;
}
.global-footer-detail > img {
  width: 150px;
  height: auto;
  display: block;
  margin: 0 auto 17px;
}
#get-started {
  background-image: url('../assets/trellians-splash-footer.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 1332px 393px;
  height: 393px;
  margin: 2.5rem 0;
}
.splash-header{
  position: fixed;
  top: 0;
  height: 72px;
  background-color: transparent;
  position: fixed;
  box-sizing:border-box;
  width: 100%;
  transition: background-color .9s;
  @apply p-4;
  z-index: 100;
}
.splash-header-fixed{
  height: 72px;
  background-color: #0079bf;
  position: fixed;
  box-sizing:border-box;
  width: 100%;
  transition: background-color .9s;
  @apply p-4;
}

.splash-header-nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-sm{
  padding: .25rem .5rem;
  font-size: 1.09375rem;
  line-height: 1.5;
  border-radius: .2rem;
  font-weight: bold;
  text-decoration: none;
  border: 1px solid transparent;
}
.text-white {
  color: #fff !important;
}
.login {
  margin-right: 3px;
}
.login:hover {
  text-decoration: underline;
}
.text-trello {
  color: #5067c5;
}
.bg-white {
    background-color: #fff !important;
}
.hero{
  background: linear-gradient(135deg, #0079bf, #5067c5);
}
.hero .container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 576px) {
  .hero .container {
      max-width: 576px;
  }
}

@media (min-width: 768px) {
  .hero .container {
      max-width: 720px;
  }
}

@media (min-width: 992px) {
  .hero .container {
      max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .hero .container {
      max-width: 1140px;
  }
}

.hero .pt-7, .hero .py-7 {
  padding-top: 7rem !important;
}
.hero .pb-6, .hero .py-6 {
  padding-bottom: 5rem !important;
}
.hero h1 {
  font-size: 3rem;
  margin-bottom: 8px
}
.hero .lead {
  font-size: 1.5625rem;
  font-weight: 300;
  margin-top: 0;
  margin-bottom: 1rem;
}
@media (min-width: 768px){
  .hero .text-md-left {
    text-align: left !important;
  }
}
.col-lg-6 {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}
@media (min-width: 992px){
  .col-lg-6 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 50%;
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 50%;
  }
}
.section-container {
  padding-top: 7rem;
  padding-bottom: 5rem;
  margin: 0 auto;
}
@media (min-width: 576px){
  .section-container, .work-smarter-container, .get-started-container{
    max-width: 576px;
  }
  .work-smarter-container > .inner > .row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 768px){
  .section-container, .work-smarter-container, .get-started-container {
    max-width: 768px;
  }
  .get-started-container > .row > div {
    padding-top: 1.5rem !important;
    flex: 0 0 66.66666667%;
    max-width: 66.66666667%;
  }
}
@media (min-width: 992px){
  .section-container, .work-smarter-container, .get-started-container {
    max-width: 900px;
  }
  .work-smarter-container > .inner > .row {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .get-started-container > .row > div {
      padding-top: 1.5rem !important;
  }
}
@media (min-width: 1200px){
  .section-container, .work-smarter-container, .get-started-container {
    max-width: 1140px;
  }
}
.get-started-container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.get-started-container > .row {
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  justify-content: center;
}
.get-started-container > .row h3 {
  font-size: 2.1875rem;
  margin-bottom: 1rem;
}

.get-started-container > .row p {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.5;
}
.get-started-container > .row a {
  color: #fff;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 6px;
  -webkit-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.work-smarter-container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.section-container-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center !important;
  margin-bottom: 48px;
  flex-direction: column;
}
.section-container-row-left, .section-container-row-right3 {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 90%;
  -ms-flex: 0 0 90%;
  flex: 0 0 90%;
  max-width: 90%;
  text-align: center;
}
.section-container-row-right, .section-container-row-right2, .section-container-row-left3{
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 90%;
  -ms-flex: 0 0 90%;
  flex: 0 0 90%;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
@media (min-width: 576px) {
  .section-container-row {
    flex-direction: row;
  }
  .section-container-row-left, .section-container-row-right3 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 41.66666666%;
    -ms-flex: 0 0 41.66666666%;
    flex: 0 0 41.66666666%;
    max-width: 41.66666666%;
    text-align: left;
    padding: 0 1rem;
  }
  .section-container-row-right, .section-container-row-right2, .section-container-row-left3{
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 58.33333333%;
    -ms-flex: 0 0 58.33333333%;
    flex: 0 0 58.33333333%;
    max-width: 58.33333333%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
  }
}
.main-section-container-row-left {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 50%;
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
  max-width: 50%;
  text-align: left;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.section-container-row-left2{
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 58.33333333%;
  -ms-flex: 0 0 58.33333333%;
  flex: 0 0 58.33333333%;
  max-width: 58.33333333%;
  padding: 0 1rem;
}
.section-container-row-left > h1, .section-container-row-right2>h1 {
  font-size: 3rem;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 1rem;
}
.section-container-row-left > h3, .section-container-row-right2 > h3 {
  font-size: 2.2rem;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 1rem;
}
.section-container-row-left > p, .section-container-row-right2 > p{
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
}
.section-container-row-left > div,.section-container-row-left > ul, .section-container-row-right2 > div, .section-container-row-right2 > ul {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1rem;
  text-align: start;
  display: flex;
}
.section-container-row-left li {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 0.2rem;
  display: list-item;
  text-align: -webkit-match-parent;
  list-style: disc;
  margin-left: 1.5rem;
}
.main-section-container-row-right {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 50%;
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
  max-width: 50%;
  display: flex;
}
.start-doing-btn {
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1.25rem;
  line-height: 1.5;
  background-color: #6D8EA2;
  border-color: #6D8EA2;
  cursor: pointer;
  border-radius: 6px;
}
.start-doing-btn button {
  color: #fff;
  font-weight: 500;
}
.quick-signup{
  display: flex;
  min-width: 0;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  padding: 16px 15px;
  padding-top: 48px;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.5;
}
.quick-signup button[type="submit"] {
  border-radius: .3rem;
}
.quick-signup-email {
  flex-grow: 5;
  min-width: 0;
  width: 376px;
  border-radius: .3rem;
  line-height: 43px;
  padding: 4px;
  padding-left: 16px;
  border-color: white;
  border-style: solid;
}
.btn-success{
  color: #fff;
  background-color: #61BD4F;
  border-color: #61BD4F;
}
.btn-demo-user{
  color: #fff;
  background-color: #6dc4fa;
  border-color: #6dc4fa;
}
.px-4 {
  padding-left: 1.5rem !important;
  padding-right: 1.5rem !important;
}
.btn {
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 6px;
  text-decoration: none;
  transition: color .15s ease-in-out, background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.quick-signup-email {
  margin-right: 9px;
  margin-bottom: 8px !important;
}
.quick-signup-email-btn{
  margin-right: 9px;
  margin-bottom: 8px;
}
.btn-success:hover{
  color: white;
  border-color: #32921f;
  background-color: #32921f;
}
.btn-demo-user:hover{
  border-color: #6c9cb9;
  background-color: #3c8abb;
}
.bottom-gradient {
  background: linear-gradient(to bottom, #fff 0%, #f7ecff 46%, #d2ecff 74%, #fff 100%);
}
.work-smarter-container .inner {
  background: linear-gradient(180deg, #42548e 0%, #6b668c 100%);
  border-radius: 12px;
  color: #fff !important;
}
.work-smarter-container > .inner > h3 {
  font-size: 2.2rem;
  margin-bottom: .5rem;
  font-weight: 500;
  line-height: 1.2;
}
.work-smarter-container > .inner > p{
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 1rem;
}
.work-smarter-container > .inner > .row {
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
</style>
