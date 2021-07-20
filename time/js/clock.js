// grab the display element
const clockDisplay = document.querySelector('#clock-display')

function updateClockDisplay() {
  // We take the current time
  const currentTime = new Date()
  // We break it down
  const hours = currentTime.getHours().toString().padStart(2, '0')
  const minutes = currentTime.getMinutes().toString().padStart(2, '0')
  const seconds = currentTime.getSeconds().toString().padStart(2, '0')

  // We show it
  clockDisplay.textContent = `${hours}:${minutes}:${seconds}`
}

// We set up the loop to update the time every 1000 milliseconds
setInterval(updateClockDisplay, 1000)
