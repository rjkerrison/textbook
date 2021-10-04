function init() {
  // * Elements
  const btns = document.querySelectorAll('#player > div')

  // * Executions/Functions

  function playSound(e) {
    const filepath = `./sounds/${e.target.dataset.id}.wav`
    const audio = new Audio(filepath)
    audio.play()
  }

  // * Event listeners
  btns.forEach((btn) => {
    btn.addEventListener('click', playSound)
  })
}

window.addEventListener('DOMContentLoaded', init)
