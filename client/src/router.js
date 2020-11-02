import Vue from 'vue'
import Router from 'vue-router'
import Board from './views/Board.vue'
import Splash from './views/Splash.vue'
import Task from './views/Task.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Boards from './views/Boards.vue'
import MalformedURL from './views/MalformedURL.vue'
import store from './store/index'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'splash',
    component: Splash,
    beforeEnter: (to, from, next) => {
      if (store.state.session.isLoggedIn) {
        next({
          name: 'boards'
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    beforeEnter: (to, from, next) => {
      if (store.state.session.isLoggedIn) {
        next({
          name: 'boards'
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.state.session.isLoggedIn) {
        next({
          name: 'boards'
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/boards',
    name: 'boards',
    component: Boards,
    beforeEnter: (to, from, next) => {
      if (!store.state.session.isLoggedIn) {
        next({ name: 'login' })
      } else {
        next()
      }
    }
  },
  {
    path: '/malformedURL',
    name: 'malformedURL',
    component: MalformedURL,
    beforeEnter: (to, from, next) => {
      if (store.state.session.isLoggedIn) {
        next({
          name: 'login'
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/board/:id',
    name: 'board',
    component: Board,
    children: [
      {
        path: 'task/:taskId',
        name: 'task',
        component: Task
      }
    ],
    beforeEnter: (to, from, next) => {
      if (!store.state.session.isLoggedIn) {
        next({ name: 'login' })
      } else {
        next()
      }
    }
  },
  {
    path: '*',
    redirect: '/malformedURL'
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
