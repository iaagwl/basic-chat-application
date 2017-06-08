const hoursEl = document.getElementById('hours'),
      minutesEl = document.getElementById('minutes'),
      startButton = document.getElementById('start-button'),
      chatContainer = document.getElementById('chat-container'),
      clockContainer = document.getElementById('clock-container')

let counting = true

function clock(){
  let time = new Date(),
      hours = time.getHours().toString(),
      minutes = time.getMinutes().toString()
      seconds = time.getSeconds().toString()

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
  clockContainer.classList.add('hide')
  startButton.classList.add('hide')
  chatContainer.classList.remove('hide')
  counting = false
})

clock()
setInterval(() => {
  if(counting) clock()
},1000)
