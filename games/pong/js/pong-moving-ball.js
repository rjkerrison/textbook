const steps = 150
function ballPositionForStep(step) {
  if (step > steps) {
    let reverseStep = steps * 2 - step
    return { x: reverseStep + 25, y: reverseStep * 2 }
  }
  return { x: step + 25, y: step * 2 }
}

;(function () {
  const canvas = document.querySelector('canvas#pong-moving-ball')

  const context = canvas.getContext('2d')
  context.fillStyle = 'green'

  let index = 0

  function nextStep() {
    context.clearRect(0, 8, 300, 290)
    drawPaddles(context)
    drawBall(context, ballPositionForStep(index))
    index = (index + 1) % (steps * 2)
    setTimeout(nextStep, 25)
  }

  nextStep()
})()
