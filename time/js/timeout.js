// Elements? Where we're going, we definitely need elements.
const timeoutSection = document.querySelector('section#timeout')
const pruneButton = document.querySelector('button#timeout-start')

let timeoutStartTime = null

function startTimeout() {
  timeoutStartTime = Date.now()
  setTimeout(showLoki, 500)
}

function showLoki() {
  const loki = document.createElement('img')
  loki.classList.add('variant-loki')

  timeoutSection.appendChild(loki)
  // I do not recommend styling things directly in JS like this
  loki.style.top = Math.random() * timeoutSection.clientHeight + 'px'
  loki.style.left = Math.random() * timeoutSection.clientWidth + 'px'
  loki.src = './loki-tva.png'

  loki.addEventListener('click', function () {
    loki.classList.add('pruning')
    // Wait for the 0.5s animation before removing Loki from the DOM
    setTimeout(() => timeoutSection.removeChild(loki), 500)
    // Wait 1s before showing another Loki
    setTimeout(showLoki, 1000)
  })
}

pruneButton.addEventListener('click', startTimeout)
