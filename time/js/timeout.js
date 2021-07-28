// Elements? Where we're going, we definitely need elements.
const timeoutSection = document.querySelector('section#timeout')
const pruneButton = document.querySelector('button#timeout-start')

let isPruning = false

function togglePruning() {
  isPruning = !isPruning
  if (isPruning) {
    pruneButton.textContent = 'End pruning'
    setTimeout(showLoki, 500)
  } else {
    document.querySelectorAll('.variant-loki').forEach((x) => {
      timeoutSection.removeChild(x)
    })
    pruneButton.textContent = 'Start pruning Lokis'
  }
}

function createCanvas() {
  // Create a canvas
  const canvas = document.createElement('canvas')
  canvas.classList.add('variant-loki')
  timeoutSection.appendChild(canvas)

  canvas.width = 150
  canvas.height = 400
  const gridHeight = window.innerHeight - canvas.height
  const gridWidth = window.innerWidth - canvas.width
  const left = Math.floor(Math.random() * gridWidth)
  const top = Math.floor(Math.random() * gridHeight)
  canvas.style.top = `${top}px`
  canvas.style.left = `${left}px`

  const context = canvas.getContext('2d')
  return {
    width: canvas.width,
    height: canvas.height,
    element: canvas,
    context,
    left,
    top,
  }
}

function showLoki() {
  const { context, left, top, width, height, element } = createCanvas()

  const removeCanvas = () => timeoutSection.removeChild(element)
  const pruneLokiCanvas = getPruneClickListener({
    context,
    left,
    top,
    removeCanvas,
    nextStep: showLoki,
  })
  element.addEventListener('click', pruneLokiCanvas)
  attachImageToCanvas({ width, height, context }, './loki-tva.png')
}

function attachImageToCanvas({ width, height, context }, imagePath) {
  const image = new Image()
  image.addEventListener('load', () => {
    const ratio = Math.floor(
      Math.max(image.width / width, image.height / height)
    )
    context.drawImage(image, 0, 0, image.width / ratio, image.height / ratio)
  })
  image.src = imagePath
}

function clipInsideCircle(x, y, radius, ctx) {
  // save context for clipping
  ctx.save()

  // create path
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.closePath()

  // set clipping mask based on shape
  ctx.clip()

  // clear anything inside it
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  // remove clipping mask
  ctx.restore()
}

function getPruneClickListener({ left, top, removeCanvas, nextStep, context }) {
  const pruneClickListener = ({ clientX, clientY }) => {
    const x = clientX - left
    const y = clientY - top

    let radius = 2
    const pruneInterval = setInterval(() => {
      radius *= 1.25
      clipInsideCircle(x, y, radius, context)
    }, 30)
    setTimeout(() => {
      clearInterval(pruneInterval)
      removeCanvas()
      nextStep()
    }, 1000)
  }
  return pruneClickListener
}

pruneButton.addEventListener('click', togglePruning)
