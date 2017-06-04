const express = require('express')
const socket = require('socket.io')

// app
const app = express()
const server = app.listen(4000, () => console.log('Listening to port 4000'))

// serve static
app.use(express.static('public'))

// socket setup
const io = socket(server)

io.on('connection', (socket) => {
  console.log(socket.id)
  socket.on('chat', (data) => {
    console.log('DATA: ', data)
    io.sockets.emit('chat', data)
  })
})
