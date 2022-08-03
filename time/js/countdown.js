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

function updateCountdownWithMonthsAndDays(startTime, endTime, hms) {
  // First we need to get the months between these dates
  const months = getMonthsBetween(startTime, endTime)
  // And now we can move our startTime forward by that many months
  const startTimePlusMonths = new Date(startTime)
  startTimePlusMonths.setMonth(startTime.getMonth() + months)

  // We've handled the months, and so can now check how many days are left
  const remainingTime = new Date(endTime - startTimePlusMonths)
  const days = remainingTime.getDate() - 1
  countdownMonthsDisplay.textContent = `${months} months, ${days} days, ${hms}`
}

function getMonthsBetween(startDate, endDate) {
  // It takes a bit of work to calculate how many full months are between two dates
  const monthDiff = endDate.getMonth() - startDate.getMonth()
  const yearDiff = endDate.getFullYear() - startDate.getFullYear()

  return monthDiff + yearDiff * 12 - 1
}

function updateCountdownDisplays() {
  // We take the difference between the target time and now
  const millisecondsToGo = endOfYear - Date.now()
  // And we turn that into a date
  const remainingTime = new Date(millisecondsToGo)
  // A handy string for all the little bits smaller than a day
  const hms = getHms(remainingTime)

  updateCountdownWithDays(millisecondsToGo, hms)
  updateCountdownWithMonthsAndDays(new Date(), endOfYear, hms)
}

// setInterval again! What did you expect?
setInterval(updateCountdownDisplays, 1000)
