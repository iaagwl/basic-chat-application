const express = require('express')
const socket = require('socket.io')

let users = [],
    connections = []

// app
const app = express()
const server = app.listen(4000, () => console.log('Listening to port 4000'))

// serve static
app.use(express.static('public'))

// socket setup
const io = socket(server)

io.on('connection', (socket) => {

  // connections
  connections.push(socket)
  console.log('Connected: %s sockets connected', connections.length, 'users: ', users)

  // disconnects
  socket.on('disconnect', (data) => {
    if (socket.username) {
      users.splice(users.indexOf(socket.username), 1)
      updateUsernames()
    }
    connections.splice(connections.indexOf(socket), 1)
    console.log('Disconnected: %s sockets connected', connections.length, 'users: ', users)
  })

  socket.on('chat', (data) => {
    io.sockets.emit('chat', { message: data.message, handle: socket.username})
  })

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', socket.username)
  })

  // new user
  socket.on('new user', (data, callback) => {
    if (data) {
      callback(data)
      socket.username = data
      users.push(socket.username)
      updateUsernames()
    } else {
      callback(false)
    }
  })

  function updateUsernames(){
    io.sockets.emit('get users', users)
  }
})
