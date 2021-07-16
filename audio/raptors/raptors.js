const raptorPicture = document.querySelector('.raptor')
const raptorAudio = document.querySelector('audio')

const showRaptor = function () {
  raptorPicture.classList.remove('hiding')
  // We wait 0.75 seconds so that the raptor noise times well with the image appearing
  setTimeout(() => raptorAudio.play(), 750)
  setTimeout(() => raptorPicture.classList.add('hiding'), 3000)
}

const raptorButtons = document.querySelectorAll('.raptor-button')

raptorButtons.forEach((button) => button.addEventListener('click', showRaptor))
