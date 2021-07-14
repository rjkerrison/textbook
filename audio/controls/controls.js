console.log(
  'You just need to add the "controls" attribute to get visible controls!'
)

const podcast = document.querySelector('audio#podcast')
const playPodcastFrom = (timeInSeconds) => {
  podcast.currentTime = timeInSeconds
  podcast.play()
}
const setupButton = (button) =>
  button.addEventListener('click', () => playPodcastFrom(button.dataset.time))

const buttons = document.querySelectorAll('button[data-time]')
buttons.forEach(setupButton)

const raptor = new Audio('../raptors/raptor-call.wav')
const listenButton = document.querySelector('button#js-only-button')
listenButton.addEventListener('click', () => {
  raptor.play()
})
