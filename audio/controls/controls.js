console.log(
  'You just need to add the "controls" attribute to get visible controls!'
)

const raptor = new Audio('../raptors/raptor-call.wav')
const listenButton = document.querySelector('button#js-only-button')
listenButton.addEventListener('click', () => {
  raptor.play()
})
