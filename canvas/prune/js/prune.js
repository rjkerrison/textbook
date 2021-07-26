const container = document.querySelector('main')
const pruneButton = document.querySelector('button#prune-start')

const lokiImage = new Image()
lokiImage.src = './loki-tva.png'

let isPruning = false

function togglePruning() {
  isPruning = !isPruning
  if (isPruning) {
    pruneButton.textContent = 'End'
    setTimeout(showLoki, 250)
  } else {
    document.querySelectorAll('.variant-loki').forEach((x) => {
      container.removeChild(x)
    })
    pruneButton.textContent = 'Start'
  }
}

function createCanvas() {
  // Create a canvas
  const canvas = document.createElement('canvas')
  canvas.classList.add('variant-loki')
  container.appendChild(canvas)

  canvas.width = 225
  canvas.height = 600
  const gridHeight = window.innerHeight - canvas.height
  const gridWidth = window.innerWidth - canvas.width
  const left = Math.floor(Math.random() * gridWidth)
  const top = Math.floor(Math.random() * gridHeight)
  canvas.style.top = `${top}px`
  canvas.style.left = `${left}px`

  const context = canvas.getContext('2d')
  return {
    element: canvas,
    context,
    left,
    top,
  }
}

const attachSingleFireEvent = (element, type, handler) => {
  const handlerWithRemoval = (e) => {
    handler(e)
    element.removeEventListener(type, handlerWithRemoval)
  }
  element.addEventListener(type, handlerWithRemoval)
}

function showLoki() {
  const { left, top, element } = createCanvas()
  const lokiContext = element.getContext('2d')
  const doorContext = element.getContext('2d')

  const showLokiImage = () => attachImageToCanvas(lokiContext)

  const removeCanvas = () => container.removeChild(element)
  const pruneLokiCanvas = getPruneClickListener({
    context: lokiContext,
    left,
    top,
    removeCanvas,
    nextStep: showLoki,
  })

  showDoor(doorContext, showLokiImage, () =>
    attachSingleFireEvent(element, 'click', pruneLokiCanvas)
  )
}

const showDoorTime = 400
const doorIntervalTime = 20 // 50 fps
const steps = showDoorTime / doorIntervalTime

const openDoorInSteps = (context, callback) => {
  openDoorStep(1, context, callback)
}

const openDoorStep = (currentStep, context, callback) => {
  if (currentStep > steps) {
    callback()
    return
  }
  drawDoor(currentStep / steps, context)
  setTimeout(() => {
    openDoorStep(currentStep + 1, context, callback)
  }, doorIntervalTime)
}

const closeDoorInSteps = (context, stepCallback, completeCallback) => {
  closeDoorStep(1, context, stepCallback, completeCallback)
}

const closeDoorStep = (
  currentStep,
  context,
  stepCallback,
  completeCallback
) => {
  if (currentStep > steps) {
    completeCallback()
    return
  }
  drawDoor(
    (steps - currentStep) / steps,
    context,
    stepCallback,
    completeCallback
  )
  setTimeout(() => {
    closeDoorStep(currentStep + 1, context, stepCallback, completeCallback)
  }, doorIntervalTime)
}

function showDoor(context, callback, completeCallback) {
  openDoorInSteps(context, callback)
  const closeDoorInStepsWithContext = () => {
    closeDoorInSteps(context, callback, completeCallback)
  }
  setTimeout(closeDoorInStepsWithContext, showDoorTime * 2)
}
const attachLoadedImageToCanvas = (image, context) => {
  const ratio = Math.floor(
    Math.max(
      image.width / context.canvas.width,
      image.height / context.canvas.height
    )
  )
  context.drawImage(
    image,
    0,
    0,
    Math.floor(image.width / ratio),
    Math.floor(image.height / ratio)
  )
}

function attachImageToCanvas(context) {
  const callback = () => attachLoadedImageToCanvas(lokiImage, context)
  if (lokiImage.complete) {
    callback()
  } else {
    lokiImage.addEventListener('load', callback)
  }
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

function setClipContext(createClipPath, ctx) {
  let imagePath = new Path2D()
  createClipPath(imagePath)
  ctx.clip(imagePath)
}

function drawDoor(heightRatio, ctx, callback) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  const height = ctx.canvas.height * heightRatio
  const top = (ctx.canvas.height * (1 - heightRatio)) / 2
  const fillStyle = `rgba(238,177,85,0.7)`
  ctx.fillStyle = fillStyle
  ctx.fillRect(0, top, ctx.canvas.width, height)
  if (callback) {
    callback()
  }
}

let isYellow = false

function drawPruningEffect(x, y, radius, ctx) {
  isYellow = Math.random() > 0.1 ? isYellow : !isYellow
  const opacity = Math.min(1, 0.1 + radius / (ctx.canvas.width * 4))
  if (isYellow) {
    ctx.fillStyle = `rgba(158,157,15,${opacity})`
  } else {
    ctx.fillStyle = `rgba(128,97,185,${opacity})`
  }
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI, true)
  ctx.closePath()
  ctx.fill()
}

const pruneTime = 2500
const nextStepTimeout = 950

let score = 0
const scoreDisplay = document.querySelector('#score-display')
function gainScore(increase) {
  score += increase
  scoreDisplay.textContent = score.toString().padStart(6, '0')
}

const updatePrune = (x, y, initialRadius, context) => {
  const container = context.canvas.parentElement
  if (!container || !container.contains(context.canvas)) {
    return
  }
  if (x < 0 || x > context.canvas.width) {
    return
  }
  if (y < 0 || y > context.canvas.height) {
    return
  }
  const radius = Math.max(initialRadius * 1.05, initialRadius + 2)

  drawPruningEffect(x, y, Math.floor(radius), context)
  clipInsideCircle(
    x,
    y,
    Math.max(Math.floor(radius / 2), Math.floor(radius - 25), 1),
    context
  )

  let upX = x - Math.random() * radius
  let newY = y + (Math.random() - 0.5) * radius
  let upY = y - Math.random() * radius
  let newX = x + (Math.random() - 0.5) * radius
  setTimeout(() => {
    updatePrune(upX, newY, radius, context)
    updatePrune(newX, upY, radius, context)
  }, 30)
}

function getPruneClickListener({ left, top, removeCanvas, nextStep, context }) {
  const pruneClickListener = ({ clientX, clientY }) => {
    let x = clientX - left
    let y = clientY - top

    let radius = 2
    context.globalCompositeOperation = 'source-atop'
    const pruneInterval = setTimeout(() => {
      updatePrune(x, y, radius, context)
      radius += 4
      x += (Math.random() - 0.5) * radius
      y += (Math.random() - 0.5) * radius
      // context.globalCompositeOperation = 'source-over'
      // context.clearRect(0, 0, context.canvas.width, context.canvas.height)
      // attachImageToCanvas(context)
    }, 15)
    setTimeout(() => {
      clearInterval(pruneInterval)
      removeCanvas()
    }, pruneTime)
    setTimeout(nextStep, nextStepTimeout)
  }
  return pruneClickListener
}

pruneButton.addEventListener('click', togglePruning)
