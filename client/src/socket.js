// import config from './config'
import pkg from '../package.json'
const io = require('socket.io-client')

// let socket = io(config[process.env.NODE_ENV].endpoint)

const port = window.location.hostname
console.log(port, 'port from window')
let socket

if (process.env.NODE_ENV === 'production') {
  socket = io(port)
} else if (process.env.NODE_ENV === 'development') {
  socket = io(pkg.porxy)
}

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
