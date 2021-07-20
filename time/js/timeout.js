// Elements? Where we're going, we definitely need elements.
const timeoutSection = document.querySelector('section#timeout')
const pruneButton = document.querySelector('button#timeout-start')

let timeoutStartTime = null

function startTimeout() {
  timeoutStartTime = Date.now()
  setTimeout(showLoki, 500)
}

function showLoki() {
  // Create a loki variant
  const loki = document.createElement('img')
  loki.classList.add('variant-loki')
  loki.src = './loki-tva.png'
  // Append him to the document
  timeoutSection.appendChild(loki)
  // We want to place Loki randomly in the viewport
  const gridHeight = window.innerHeight - loki.clientHeight
  const gridWidth = window.innerWidth - loki.clientWidth
  // I do not recommend styling things directly in JS like this
  loki.style.top = `${Math.random() * gridHeight}px`
  loki.style.left = `${Math.random() * gridWidth}px`

  loki.addEventListener('click', function () {
    loki.classList.add('pruning')
    // Wait for the 0.5s animation before removing Loki from the DOM
    setTimeout(() => timeoutSection.removeChild(loki), 500)
    // Wait 1s before showing another Loki
    setTimeout(showLoki, 1000)
  })
}

pruneButton.addEventListener('click', startTimeout)
