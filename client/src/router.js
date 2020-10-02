import Vue from 'vue'
import Router from 'vue-router'
import Board from './views/Board.vue'
import Splash from './views/Splash.vue'
import Task from './views/Task.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Boards from './views/Boards.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'splash',
      component: Splash
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/boards',
      name: 'boards',
      component: Boards
    },
    {
      path: '/board/:id',
      name: 'board',
      component: Board,
      children: [
        {
          path: '/:id',
          name: 'task',
          component: Task
        }
      ]
    }
  ]
})
