import config from './config'
const io = require('socket.io-client')
// console.log(process.env.PORT)
console.log(process.env)
let socket = io(config[process.env.NODE_ENV].endpoint)
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

socket.on('message', data => {
  console.log(data)
})

socket.on('greetings', (elem1, elem2, elem3) => {
  console.log(elem1, elem2)
})

// const createColumn = function (column) {
//   socket.emit('createColumn', column)
// 