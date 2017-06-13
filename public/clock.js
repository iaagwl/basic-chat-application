const hoursEl = document.getElementById('hours'),
      minutesEl = document.getElementById('minutes'),
      startButton = document.getElementById('start-button'),
      chatContainer = document.getElementById('chat-container'),
      clockContainer = document.getElementById('clock-container'),
      clockBody = document.getElementById('clock-body'),
      userInput = document.getElementById('user-input'),
      user = document.getElementById('user'),
      activeUser = document.getElementById('active-user'),
      onlineUsers = document.getElementById('online-users'),
      errorEl = document.getElementById('error-message')


function clock(){
  let time = new Date(),
      hours = time.getHours().toString(),
      minutes = time.getMinutes().toString()

  if (hours.length < 2) {
    hours = '0' + hours
  }
  if (minutes.length < 2) {
    minutes = '0' + minutes
  }

  hoursEl.textContent = hours
  minutesEl.textContent = minutes
}

function newUser() {
  socket.emit('new user', user.value, (data) => {
    if (data) {
      socket.username = data
      activeUser.textContent = socket.username
      clockContainer.classList.add('clock-animation')
      chatContainer.classList.add('chat-animation')
      onlineUsers.classList.add('online-animation')
      startButton.classList.add('hide')
      userInput.classList.add('hide')
      onlineUsers.classList.remove('hide')
      clockBody.classList.add('unhide')
    } else {
      // implement l8er
      console.log('Needs a username')
    }
  })
}

userInput.addEventListener('submit', (e) => {
  e.preventDefault()
  newUser()
})

startButton.addEventListener('click', () => {
  newUser()
})

clock()
setInterval(clock, 1000)
