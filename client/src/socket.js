import config from './config'
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

socket.on('received', (data) => {
  console.log('received')
})

socket.on('new column', (data) => {
  console.log('column has been created', data)
})

export default socket
