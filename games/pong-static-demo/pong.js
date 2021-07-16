const canvas = document.querySelector('canvas')

const context = canvas.getContext('2d')

context.fillStyle = 'green'

function drawPaddles() {
  context.fillRect(2, 2, 100, 5)
  context.fillRect(120, 298, 100, 5)
}

const ballSize = 5
function drawBall(position) {
  context.fillRect(position.x, position.y, ballSize, ballSize)
}

let steps = 150
let index = 0
function ballPositionForStep(step) {
  if (step > steps) {
    let reverseStep = steps * 2 - step
    return { x: reverseStep + 25, y: reverseStep * 2 }
  }
  return { x: step + 25, y: step * 2 }
}

drawPaddles()
drawBall({ x: 5, y: 6 })
