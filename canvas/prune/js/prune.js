const container = document.querySelector('main')
const pruneButton = document.querySelector('button#prune-start')

function loadImage(src) {
  const image = new Image()
  image.src = src
  return image
}

const lokiImages = [
  loadImage('./loki-tva.png'),
  loadImage('./loki-tva-2.png'),
  loadImage('./kid-loki.png'),
  loadImage('./boastful-loki.png'),
  loadImage('./sylvie.png'),
  loadImage('./alligator-loki.png'),
  loadImage('./croki.jpg'),
]

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

function createCanvas(width, height) {
  // Create a canvas
  const canvas = document.createElement('canvas')
  canvas.classList.add('variant-loki')
  container.appendChild(canvas)

  if (height > 500) {
    const ratio = height / 500
    height = Math.floor(height / ratio)
    width = Math.floor(width / ratio)
  }
  if (width > 500) {
    const ratio = width / 500
    height = Math.floor(height / ratio)
    width = Math.floor(width / ratio)
  }

  canvas.width = width
  canvas.height = height
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
    //element.removeEventListener(type, handlerWithRemoval)
  }
  element.addEventListener(type, handlerWithRemoval)
}

function showLoki() {
  const chosenImage = randomChoice(lokiImages)

  const { left, top, element } = createCanvas(
    chosenImage.width,
    chosenImage.height
  )
  const lokiContext = element.getContext('2d')
  const doorContext = element.getContext('2d')

  const showLokiImage = () => attachImageToCanvas(chosenImage, lokiContext)

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
    closeDoorInSteps(context, callback, () => {})
  }
  completeCallback()
  setTimeout(closeDoorInStepsWithContext, showDoorTime * 2)
}
const attachLoadedImageToCanvas = (image, context) => {
  const ratio = Math.max(
    image.width / context.canvas.width,
    image.height / context.canvas.height
  )

  context.drawImage(
    image,
    0,
    0,
    Math.floor(image.width / ratio),
    Math.floor(image.height / ratio)
  )
}

function attachImageToCanvas(chosenImage, context) {
  const callback = () => attachLoadedImageToCanvas(chosenImage, context)
  if (chosenImage.complete) {
    callback()
  } else {
    chosenImage.addEventListener('load', callback)
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

function drawDoor(heightRatio, ctx, callback) {
  window.requestAnimationFrame(() =>
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  )
  const height = ctx.canvas.height * heightRatio
  const top = (ctx.canvas.height * (1 - heightRatio)) / 2
  const fillStyle = `rgba(238,177,85,0.7)`
  window.requestAnimationFrame(() => {
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = fillStyle
    ctx.fillRect(0, top, ctx.canvas.width, height)
    if (callback) {
      callback()
    }
  })
}

const fillStyles = (opacity) => [
  `rgba(158,157,15,${opacity})`,
  `rgba(128,97,185,${opacity})`,
  `rgba(28,197,85,${opacity})`,
  `rgba(128,207,185,${opacity})`,
  `rgba(108,47,215,${opacity})`,
]

const randomChoice = (arr) => arr[Math.floor(arr.length * Math.random())]

function drawPruningEffect(x, y, radius, ctx) {
  const opacity = Math.min(0.7, 0.1 + radius / (ctx.canvas.width * 4))

  ctx.fillStyle = randomChoice(fillStyles(opacity))

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

const getNextCoordinates = ({ x, y }, r) => {
  return {
    x: x + (Math.random() - 0.5) * r,
    y: y + (Math.random() - 0.5) * r,
  }
}

const startPruningAnimation = (initialCoordinate, initialRadius, context) => {
  let isAnimating = true
  const startTime = Date.now()
  const millisecondsBetweenStages = 70
  const coordinatesList = [initialCoordinate]

  const addNextCoordinates = (radius) => {
    const randomCoordinates =
      coordinatesList[Math.floor(Math.random() * coordinatesList.length)]
    coordinatesList.push(getNextCoordinates(randomCoordinates, radius))
  }

  const animatePruningStep = () => {
    const elapsedMilliseconds = Date.now() - startTime
    const elapsedStages = Math.floor(
      elapsedMilliseconds / millisecondsBetweenStages
    )

    if (!isAnimating) {
      console.log('animation was cancelled')
      return
    }
    if (elapsedStages > 35) {
      console.log('limit reached: ' + coordinatesList.length)
      return
    }

    const oldRadius =
      initialRadius *
      Math.pow(1.16, elapsedMilliseconds / millisecondsBetweenStages - 3)
    const newRadius =
      initialRadius *
      Math.pow(1.16, elapsedMilliseconds / millisecondsBetweenStages)

    while (elapsedStages > coordinatesList.length) {
      gainScore(elapsedStages * 5)
      addNextCoordinates(newRadius)
    }

    coordinatesList.forEach(({ x, y }) => {
      context.globalCompositeOperation = 'source-atop'
      drawPruningEffect(x, y, Math.floor(newRadius), context)
      clipInsideCircle(x, y, Math.floor(oldRadius), context)
    })

    setTimeout(
      () => window.requestAnimationFrame(animatePruningStep),
      millisecondsBetweenStages / 5
    )
  }

  const cancelAnimation = () => {
    console.log('cancelling animation')
    isAnimating = false
  }

  console.log('starting animation')
  window.requestAnimationFrame(animatePruningStep)

  return {
    cancelAnimation,
  }
}

function getPruneClickListener({ left, top, removeCanvas, nextStep, context }) {
  let isFirstClick = true

  const pruneClickListener = ({ clientX, clientY }) => {
    let x = clientX - left
    let y = clientY - top
    const initialRadius = 5

    const { cancelAnimation } = startPruningAnimation(
      { x, y },
      initialRadius,
      context
    )

    const shouldRemoveCanvas = isFirstClick
    setTimeout(() => {
      if (shouldRemoveCanvas) {
        removeCanvas()
      }
      cancelAnimation()
    }, pruneTime)
    if (isFirstClick) {
      setTimeout(nextStep, nextStepTimeout)
    }
    isFirstClick = false
  }
  return pruneClickListener
}

pruneButton.addEventListener('click', togglePruning)
