const io = require('socket.io-client')
const socket = io('http://localhost:5000')

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
