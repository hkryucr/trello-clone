import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'
import AppButton from './components/AppButton'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

export const socket = socketio(process.env.VUE_APP_SOCKET_SERVER_URL)
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: socketio(process.env.VUE_APP_SOCKET_SERVER_URL),
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  })
)

Vue.component('AppButton', AppButton)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
