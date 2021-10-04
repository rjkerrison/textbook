function init() {
  // * Elements
  const btns = document.querySelectorAll('#player > div')

  // * Executions/Functions

  function playSound(e) {
    const audio = document.querySelector(`audio#${e.target.dataset.id}`)
    audio.play()
  }

  // * Event listeners
  btns.forEach((btn) => {
    btn.addEventListener('click', playSound)
  })
}

window.addEventListener('DOMContentLoaded', init)
