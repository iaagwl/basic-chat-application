const hoursEl = document.getElementById('hours'),
      minutesEl = document.getElementById('minutes'),
      startButton = document.getElementById('start-button'),
      chatContainer = document.getElementById('chat-container'),
      clockContainer = document.getElementById('clock-container'),
      clockBody = document.getElementById('clock-body')


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

startButton.addEventListener('click', () => {
  clockContainer.classList.add('clock-animation')
  chatContainer.classList.add('chat-animation')
  startButton.classList.add('hide')
  clockBody.classList.add('unhide')
})

clock()
setInterval(clock, 1000)
