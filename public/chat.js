// socket connection
const socket = io.connect('http://localhost:4000')

// dom queries
const message = document.getElementById('message'),
      output = document.getElementById('output'),
      input = document.getElementById('chat-input'),
      feedback = document.getElementById('feedback'),
      usersList = document.getElementById('users-list')

// emit events
input.addEventListener('submit', (e) => {
  e.preventDefault()
  if (message.value && socket.username){
    socket.emit('chat', {
      message: message.value,
      handle: socket.username
    })
    message.value = ''
  }
})

message.addEventListener('keyup', () => {
  if (message.value) {
    socket.emit('typing', socket.username)
  } else {
    socket.emit('nottyping')
  }
})

// listen for events
socket.on('chat', (data) => {
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>'
  feedback.innerHTML = ''
})

socket.on('typing', (data) => {
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>'
})

socket.on('get users', (data) => {
  let html = data.map((user) => {
    return '<li class="online-user">'+user+'</li>'
  }).join('')
  usersList.innerHTML = html
})
