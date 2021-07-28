window.addEventListener('DOMContentLoaded', () => {
  const now = new Date()
  const oneMinute = 60
  const oneHour = 3600

  const seconds = now.getSeconds()
  const minutes = now.getMinutes() * oneMinute
  const hours = (now.getHours() % 12) * oneHour

  setTime(seconds, '.second')
  setTime(minutes, '.minute')
  setTime(hours, '.hour')

  function setTime(time, selector) {
    document.querySelector(selector).style['animation-delay'] = `${-time}s`
  }
})
