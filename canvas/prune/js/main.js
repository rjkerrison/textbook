function initialisePruningGame() {
  // This is the only place where we reference DOM elemenets created by our HTML
  // It's normal to do this, to keep most of our code independent and therefore
  // to keep the initialisation function small.
  const container = document.querySelector('main')
  const pruneButton = document.querySelector('button#prune-start')
  const scoreDisplay = document.querySelector('#score-display')

  let isPruning = false
  let game = null

  const originalPruneButtonContent = pruneButton.innerHTML
  function togglePruning() {
    isPruning = !isPruning
    if (isPruning) {
      pruneButton.classList.add('active')
      pruneButton.innerHTML = 'Stop'
        .split('')
        .map((x) => `<span>${x}</span>`)
        .join('')

      game = new Game(container, scoreDisplay)
      setTimeout(() => game.start(), 250)
    } else {
      game.end()
      game = null

      pruneButton.classList.remove('active')
      pruneButton.innerHTML = originalPruneButtonContent
    }
  }

  pruneButton.addEventListener('click', togglePruning)
}

window.addEventListener('DOMContentLoaded', initialisePruningGame)
