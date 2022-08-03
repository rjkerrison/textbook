// Elements! We'll be needing our display elements!
const countdownDisplay = document.querySelector('#countdown-display')
const countdownMonthsDisplay = document.querySelector(
  '#countdown-display-months'
)

// The countdown date
const endOfYear = new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0, 0)

// This is a big chunk of code that groups together nicely
function getHms(time) {
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  return `${hours} hours, ${minutes} minutes and ${seconds} seconds`
}

function updateCountdownWithDays(millisecondsToGo, hms) {
  const totalDays = Math.floor(millisecondsToGo / (1000 * 60 * 60 * 24))
  countdownDisplay.textContent = `${totalDays} days, ${hms}`
}

function updateCountdownWithMonthsAndDays(remainingTime, hms) {
  // Remember: time started on 1st January 1970 — hence the aesthetic of the TVA
  const years = remainingTime.getFullYear() - 1970
  const months = remainingTime.getMonth() + 12 * years
  const days = remainingTime.getDate() - 1
  countdownMonthsDisplay.textContent = `${months} months, ${days} days, ${hms}`
}

function updateCountdownDisplays() {
  // We take the difference between the target time and now
  const millisecondsToGo = endOfYear - Date.now()
  // And we turn that into a date
  const remainingTime = new Date(millisecondsToGo)
  // A handy string for all the little bits smaller than a day
  const hms = getHms(remainingTime)

  updateCountdownWithDays(millisecondsToGo, hms)
  updateCountdownWithMonthsAndDays(remainingTime, hms)
}

// setInterval again! What did you expect?
setInterval(updateCountdownDisplays, 1000)
