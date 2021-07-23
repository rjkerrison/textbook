const podcast = document.querySelector('audio#podcast')
const playPodcastFrom = (timeInSeconds) => {
  podcast.currentTime = timeInSeconds
  podcast.play()
}
const setupButton = (button) =>
  button.addEventListener('click', () => playPodcastFrom(button.dataset.time))

const buttons = document.querySelectorAll('button[data-time]')
buttons.forEach(setupButton)
