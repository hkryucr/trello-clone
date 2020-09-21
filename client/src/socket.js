// import config from './config'
const io = require('socket.io-client')

// console.log(process.env.PORT)
// console.log(process.env)
// let socket = io(config[process.env.NODE_ENV].endpoint)

const port = process.env.VUE_APP_SOCKET_SERVER_URL
let socket = io(port)

// if (process.env.NODE_ENV == "production") {
//   console.log("production")
// } else if (process.env.NODE_ENV == "development") {
//   // socket = io(`/`);
//   console.log(process.env)
// }

socket.on('connect', () => {
  socket.send('Hello!')
  console.log('connected')
})

// socket.on('message', data => {
//   console.log(data)
// })

// socket.on('greetings', (elem1, elem2, elem3) => {
//   console.log(elem1, elem2)
// })

socket.on('received', (data) => {
  console.log('received')
})

socket.on('newColumn', (data) => {
  console.log('column has been created', data)
})

export default socket
