// socket connection
const socket = io.connect('http://localhost:4000')

// dom queries
const message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      output = document.getElementById('output'),
      input = document.getElementById('chat-input')

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

// listen for socket events
socket.on('chat', (data) => {
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>'
})
