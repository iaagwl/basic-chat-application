// socket connection
const socket = io.connect('http://localhost:4000')

// dom queries
const message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      output = document.getElementById('output'),
      input = document.getElementById('chat-input'),
      feedback = document.getElementById('feedback')

// emit events
input.addEventListener('submit', (e) => {
  e.preventDefault()
  if (message.value && handle.value){
    socket.emit('chat', {
      message: message.value,
      handle: handle.value
    })
    message.value = ''
  }
})

message.addEventListener('keyup', () => {
  if (message.value) {
    socket.emit('typing', handle.value)
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

socket.on('nottyping', () => {
  feedback.innerHTML = ''
})
