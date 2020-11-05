import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import store from './store/index'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { initialState } from './utils/InitialState'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import pkg from '../package.json'
// import './assets/_custom.scss'
// client/node_modules/bootstrap/scss/_modal.scss

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const AUTH_TOKEN_KEY = 'authToken'

Vue.config.productionTip = false
const savedAuthToken = localStorage.getItem(AUTH_TOKEN_KEY)

if (savedAuthToken) {
  axios.defaults.headers.common['Authorization'] = savedAuthToken
  const decodedUser = jwtDecode(savedAuthToken)
  const preloadedState = initialState()
  preloadedState.session = {
    isLoggedIn: true,
    currentUser: decodedUser
  }
  store.replaceState(preloadedState)
  const currentTime = Date.now() / 1000
  if (decodedUser.exp < currentTime) {
    store.commit('RESET')
    window.location.href = '/'
  }
} else {
  axios.defaults.headers.common['Authorization'] = ''
}

const port = window.location.hostname

let socketURL
if (process.env.NODE_ENV === 'production') {
  socketURL = port
} else if (process.env.NODE_ENV === 'development') {
  socketURL = pkg.proxy
}
var SocketInstance = socketio(socketURL)

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketInstance,
    vuex: {
      store,
      // actionPrefix: 'socket_',
      mutationPrefix: 'SOCKET_'
    }
  })
)

// set auth header
// Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
