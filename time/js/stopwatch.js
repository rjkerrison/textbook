// grab the container
const display = document.querySelector('#stopwatch-display')
const startButton = document.querySelector('button#stopwatch-start')
const stopButton = document.querySelector('button#stopwatch-stop')

let stopwatchStartTime = null
let interval = null

function startStopwatch() {
  // We only want to start the stopwatch when the interval is null
  if (interval === null) {
    stopwatchStartTime = Date.now()
    interval = setInterval(updateDisplay, 10)
    // We should disable the button if it can't be used
    startButton.setAttribute('disabled', true)
  }
}

function stopStopwatch() {
  // Stopping the stopwatch is easy: we just stop the interval!
  clearInterval(interval)
  // We enable the start button again
  startButton.removeAttribute('disabled')
  // We reset the interval to null
  interval = null
}

function updateDisplay() {
  // We take the difference between now and the start time, and we turn that into a date
  const elapsedTime = new Date(Date.now() - stopwatchStartTime)
  const minutes = elapsedTime.getMinutes().toString().padStart(2, '0')
  const seconds = elapsedTime.getSeconds().toString().padStart(2, '0')
  const milliseconds = elapsedTime.getMilliseconds().toString().padStart(3, '0')

  display.textContent = `${minutes}:${seconds}.${milliseconds}`
}

startButton.addEventListener('click', startStopwatch)
stopButton.addEventListener('click', stopStopwatch)
