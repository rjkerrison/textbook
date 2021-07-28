const fontMeUp = (element) => {
  const text = element.textContent
  element.textContent = null
  text.split('').forEach((letter) => {
    const span = document.createElement('span')
    span.textContent = letter
    element.appendChild(span)
  })
}

const init = () => {
  const fontMeUpElements = document.querySelectorAll('.font-me-up')

  fontMeUpElements.forEach(fontMeUp)
}

window.addEventListener('DOMContentLoaded', init)
