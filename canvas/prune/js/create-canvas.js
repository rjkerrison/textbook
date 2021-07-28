function createCanvas(container, width, height) {
  // Create a canvas
  const element = document.createElement('canvas')
  element.classList.add('variant-loki')
  container.appendChild(element)

  const { height: maxHeight, width: maxWidth } = getMaximumCanvasSize()

  if (height > maxHeight) {
    const ratio = height / maxHeight
    height = Math.floor(height / ratio)
    width = Math.floor(width / ratio)
  }
  if (width > maxWidth) {
    const ratio = width / maxWidth
    height = Math.floor(height / ratio)
    width = Math.floor(width / ratio)
  }

  element.width = width
  element.height = height
  const gridHeight = window.innerHeight - element.height
  const gridWidth = window.innerWidth - element.width
  const left = Math.floor(Math.random() * gridWidth)
  const top = Math.floor(Math.random() * gridHeight)
  element.style.top = `${top}px`
  element.style.left = `${left}px`
  const context = element.getContext('2d')

  return {
    element,
    context,
    left,
    top,
    remove: () => container.removeChild(element),
  }
}
