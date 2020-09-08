import Vue from 'vue'
import Router from 'vue-router'
import Board from './views/Board.vue'
import Splash from './views/Splash.vue'
import Task from './views/Task.vue'
import Register from './views/Register.vue'

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
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/board',
      name: 'board',
      component: Board,
      children: [
        {
          path: 'task/:id',
          name: 'task',
          component: Task
        }
      ]
    }
  ]
})
