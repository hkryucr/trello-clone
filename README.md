# Trello-Clone
 [![Generic badge](https://img.shields.io/badge/Vue.js-2.6-green)](https://shields.io/)
 [![Generic badge](https://img.shields.io/badge/express.js-4.7-green)](https://shields.io/)
 [![Generic badge](https://img.shields.io/badge/socket.io-2.3-green)](https://shields.io/)
 [![Generic badge](https://img.shields.io/badge/Release-11%2F22%2F2020-orange)](https://shields.io/)
 [![Generic badge](https://img.shields.io/badge/All%20Contributors-4-blue)](https://shields.io/)

 
Check out the live [app](https://trello2.herokuapp.com/).

Trello-Clone is a single-page full-stack web application modeled after Trello. Trello-Clone is built using Node.js, Express.js, MongoDB, Socket.io on the back-end, and Vue.js and Vuex on the front-end.  For image hosting, it utilizes Amazon Web Services. For instant data transfer, it uses socket.io to integrate Vue.js frontend with the rest of the node.js & express.js application.

<img src="/client/public/splash.gif" width="80%"/>

## Why trello clone?
Our dev team was inspired by beautiful and seamless frontend Trello's UIs. It is one of the most popular web-based Kanban-style list-making applications. Trello’s boards, lists, and cards enable users to organize and prioritize their projects and daily tasks in a fun, interactive, and rewarding way.

Trello has numerous technical details over the entire applications. One good example is the communications between frontend and backend, such as using socket.io and HTTP request calls selectively. Our team of four tried to implement this well polished application in two months time periods, and now release the beta version of the application.

## Technologies
- Node.js
- Express.js
- MongoDB
- Socket.io
- Javascript
- Vue.js
- Tailwinds
- CSS
- Amazon Web Services

## Key Features

### Easy, Drag-and-Drop & Inline Editing

One of the main features in Trello is the simplest drag-and-drop and inline editing feature. The lists are customizable, meaning that you can follow exclusively metrics that are of interest to you.

<img src="/client/public/board_interface.gif" width="80%"/>

### Well-Organized Board and Card System & Searchable database

Having a board assigned for each project, and a card for each task, there is little risk of confusion, as every assignments are in order. All boards and tasks for all assignments can be searched from the database, using regular expression. 

<img src="/client/public/search.gif" width="80%"/>

### Mobile Optimization

Trello is a mobile-friendly website that can be accessed from every device, including small size android and iOS devices, and big size desktop.

<img src="/client/public/board_mobile.gif" width="80%"/>

### User Authentication
- Users can sign up or log in with an existing account.
- Invalid login or signup attempts would trigger error messages.
- Only Logged in users can access boards and board page.
- Only logged out users can acess the splash page. Logged in users are redirected to the boards page.

```
// router.js
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'splash',
    component: Splash,
    beforeEnter: (to, from, next) => {
      if (store.state.session.isLoggedIn) {
        next({ name: 'boards' })
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
        next({ name: 'boards' })
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
        next({ name: 'boards' })
      } else {
        next()
      }
    }
  },
```


### Boards
After user logs in they will be directed to the home page where they will have access to all their boards.  Here they will be able to star boards of more importance as well as create a new board.

<img src="/client/public/board2.gif" width="80%"/>

### Board
After user selects a board from home page they will be directed to the board page.  Here they will be able create/edit/delete all lists and tasks .  They'll also be able to change the background of their board and star it as well.  

<img src="https://user-images.githubusercontent.com/55060570/98197721-34a81080-1edc-11eb-86f8-65dbe3e5bce0.gif" width="80%"/>


#### Back-end
Trello-Clone uses Node.js, Express.js, MongoDB, Socket.io on the back-end.

#### Database
Trello-Clone uses a MongoDB database to store its data to store.
 
#### Front-end
#### Vue.js 

### Future Plans
- Enable users to share their tasks with friends.

