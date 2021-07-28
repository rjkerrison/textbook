const showDoorTime = 400
const doorIntervalTime = 20 // 50 fps
const steps = showDoorTime / doorIntervalTime

const openDoorInSteps = (context, showLokiImage, attachClickEvent) => {
  openDoorStep(1, context, showLokiImage, attachClickEvent)
}

const openDoorStep = (
  currentStep,
  context,
  showLokiImage,
  attachClickEvent
) => {
  if (currentStep > steps) {
    showLokiImage()
    attachClickEvent()
    return
  }
  drawDoor(currentStep / steps, context)
  setTimeout(() => {
    openDoorStep(currentStep + 1, context, showLokiImage, attachClickEvent)
  }, doorIntervalTime)
}

const closeDoorInSteps = (context, stepCallback) => {
  closeDoorStep(1, context, stepCallback)
}

const closeDoorStep = (currentStep, context, stepCallback) => {
  if (currentStep > steps) {
    return
  }
  drawDoor((steps - currentStep) / steps, context, stepCallback)
  setTimeout(() => {
    closeDoorStep(currentStep + 1, context, stepCallback)
  }, doorIntervalTime)
}

function drawDoor(heightRatio, ctx, callback) {
  // We always execute visible changes to the canvas as part of requestAnimationFrame
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

// All we need here is:
// - a 2D Canvas context,
// - and the instructions (functions) for:
//   - showing a Loki,
//   - and attaching the click handler (for pruning when the player clicks)
function showDoor(context, showLokiImage, attachClickEvent) {
  openDoorInSteps(context, showLokiImage, attachClickEvent)
  const closeDoorInStepsWithContext = () => {
    closeDoorInSteps(context, showLokiImage)
  }
  setTimeout(closeDoorInStepsWithContext, showDoorTime * 2)
}
