import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import store from './store/index'
import AppButton from './components/AppButton'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
// import Axios from 'axios'

var SocketInstance = socketio(process.env.VUE_APP_SOCKET_SERVER_URL)

// Vue.use(VueSocketIO, SocketInstance)

// export const socket = socketio(process.env.VUE_APP_SOCKET_SERVER_URL)
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

Vue.component('AppButton', AppButton)

Vue.config.productionTip = false

// set auth header
// Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
