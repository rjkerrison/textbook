const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

context.fillStyle = 'green'

const playerPaddle = { left: 0 }

function drawPaddles() {
  context.fillRect(2, 2, 100, 5)
  context.fillRect(playerPaddle.left * 5, 298, 100, 5)
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

let isMovingLeft = false
let isMovingRight = false

function movePlayerPaddle() {
  if (isMovingLeft) {
    playerPaddle.left--
  }
  if (isMovingRight) {
    playerPaddle.left++
  }
  if (playerPaddle.left > 40) {
    playerPaddle.left = 40
  }
  if (playerPaddle.left < 0) {
    playerPaddle.left = 0
  }
}

function nextStep() {
  context.clearRect(0, 0, 400, 400)
  movePlayerPaddle()
  drawPaddles()
  drawBall(ballPositionForStep(index))
  index = (index + 1) % (steps * 2)
  setTimeout(nextStep, 25)
}

nextStep()

// now we have to listen for the user's left key, right key events
document.addEventListener('keydown', (event) => {
  if (isLeftKey(event)) {
    isMovingLeft = true
  }
  if (isRightKey(event)) {
    isMovingRight = true
  }
})

document.addEventListener('keyup', (event) => {
  if (isLeftKey(event)) {
    isMovingLeft = false
  }
  if (isRightKey(event)) {
    isMovingRight = false
  }
})

function isLeftKey(event) {
  // this log statement is helpful to see what the codes are for each key on the keyboard
  // console.log(event.code)
  return event.code === 'ArrowLeft'
}

function isRightKey(event) {
  return event.code === 'ArrowRight'
}
