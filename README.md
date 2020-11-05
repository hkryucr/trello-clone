# Trello-Clone
 
Check out the live [app](https://trello2.herokuapp.com/).

Trello-Clone is a single-page full-stack web application modeled after Trello. Trello-Clone is built using Node.js, Express.js, MongoDB, Socket.io on the back-end, and Vue.js and Vuex on the front-end.  For image hosting, it utilizes Amazon Web Services. For instant data transfer, it uses socket.io to integrate Vue.js frontend with the rest of the node.js & express.js application.

<img src="/client/public/splash.gif" width="100%"/>

## Why trello clone?
Our dev team was inspired by beautiful and seamless frontend Trello's UIs. It is one of the most popular web-based Kanban-style list-making applications. Trello’s boards, lists, and cards enable users to organize and prioritize their projects and daily tasks in a fun, interactive, and rewarding way.

Trello has numerous technical details over the entire applications. One good example is the communications between frontend and backend, such as using socket.io and HTTP request calls selectively. Our team of four tried to implement this well polished application in two months time periods, and now release the beta version of the application.

## Technologies
- React / Redux
- Node.js
- Express.js
- MongoDB
- Socket.io
- Javascript
- Vue.js
- Tailwinds
- CSS
- Amazon Web Services

## Features

### User Authentication
- Users can sign up or log in with an existing account.
- Invalid login or signup attempts would trigger both front-end and back-end errors
- Logged in users can access boards and board page.
- Only logged out users can view the splash page. Logged in users are redirected to the boards page.

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

![TrelloBoards](/client/public/TrelloBoards.png)

![TrelloCreate](/client/public/TrelloCreate.png)

### Board
After user selects a board from home page they will be directed to the board page.  Here they will be able create/edit/delete all lists and tasks .  They'll also be able to change the background of their board and star it as well.  

![TrelloBoardDemo](https://user-images.githubusercontent.com/55060570/98197721-34a81080-1edc-11eb-86f8-65dbe3e5bce0.gif)


#### Back-end
Trello-Clone uses Node.js, Express.js, MongoDB, Socket.io on the back-end.

#### Database
Trello-Clone uses a MongoDB database to store its data to store.
 
#### Front-end
#### Vue.js 

### Future Plans
- Enable users to share their tasks with friends.

