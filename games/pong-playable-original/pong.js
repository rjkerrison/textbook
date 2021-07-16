const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const { width: gameWidth, height: gameHeight } = canvas

context.fillStyle = 'yellow'

const resolution = 5
const computerPaddle = {
  position: { x: 20, y: resolution },
  colour: '#4ff4f4',
  width: 20,
  isOnPaddle(x) {
    return x >= this.leftSide() && x <= this.rightSide()
  },
  leftSide() {
    return this.position.x
  },
  rightSide() {
    return this.position.x + this.width * resolution
  },
}
const playerPaddle = {
  position: { x: 0, y: gameHeight - resolution * 2 },
  colour: '#42ff44',
  width: 20,
  isOnPaddle(x) {
    return x >= this.leftSide() && x <= this.rightSide()
  },
  leftSide() {
    return this.position.x
  },
  rightSide() {
    return this.position.x + this.width * resolution
  },
}

function drawPaddles() {
  drawRectangle(computerPaddle)
  drawRectangle(playerPaddle)
}
function drawRectangle({ colour, width, position: { x, y } }) {
  context.fillStyle = colour
  context.fillRect(x, y, resolution * width, resolution)
}
function drawCircle({ colour, position: { x, y } }) {
  context.beginPath()
  context.arc(x, y, resolution, 0, 2 * Math.PI)
  context.fillStyle = colour
  context.fill()
  context.closePath()
}

const ball = {
  position: {
    x: null,
    y: null,
  },
  // the angle from the horizontal, in radians
  // positive means above the horizontal
  angle: null,
  colour: '#f4fd7f',
}

function setBallInitialPosition() {
  ball.position = { x: gameWidth / 4, y: gameWidth / 4 }
  ball.angle = Math.PI / 3
}

function drawBall() {
  drawCircle(ball)
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
    playerPaddle.position.x--
  }
  if (isMovingRight) {
    playerPaddle.position.x++
  }
  if (playerPaddle.position.x > gameWidth) {
    playerPaddle.position.x = gameWidth
  }
  if (playerPaddle.position.x < 0) {
    playerPaddle.position.x = 0
  }
}
function moveComputerPaddle() {
  if (!computerPaddle.isOnPaddle(ball.position.x)) {
    if (ball.position.x < computerPaddle.position.x) {
      computerPaddle.position.x--
    } else {
      computerPaddle.position.x++
    }
  }
  if (computerPaddle.position.x > gameWidth) {
    computerPaddle.position.x = gameWidth
  }
  if (computerPaddle.position.x < 0) {
    computerPaddle.position.x = 0
  }
}

function moveBall() {
  const { x, y } = ball.position
  const newPosition = {
    x: x + 2 * Math.cos(ball.angle),
    y: y + 2 * Math.sin(ball.angle),
  }
  ball.position = newPosition
}

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

// now we need the ball to move by bouncing off the
// - player paddle
// - computer paddle
// - sides

// We can start with the player paddle, so long as we start the ball heading to the user paddle!

const score = { computer: 0, player: 0 }
const computerScoreElement = document.querySelector('#computer-score')
const playerScoreElement = document.querySelector('#player-score')

function writeScores() {
  computerScoreElement.innerText = score.computer
  playerScoreElement.innerText = score.player
}

function detectCollisions() {
  if (ball.position.y > playerPaddle.position.y) {
    if (playerPaddle.isOnPaddle(ball.position.x)) {
      // TODO make the bounce non-linear
      // bounces near the edge should result in an angle nearer the horizontal
      ball.angle = -ball.angle
    } else {
      score.computer++
      setBallInitialPosition()
      console.log(score)
    }
  }
  if (ball.position.y < computerPaddle.position.y) {
    if (computerPaddle.isOnPaddle(ball.position.x)) {
      // Flip it
      ball.angle = -ball.angle
    } else {
      score.player++
      setBallInitialPosition()
      console.log(score)
    }
  }
  if (ball.position.x < 0) {
    ball.angle = Math.PI - ball.angle
  }
  if (ball.position.x > gameWidth) {
    ball.angle = Math.PI - ball.angle
  }
}

function nextStep() {
  context.clearRect(0, 0, gameWidth, gameHeight)
  detectCollisions()
  movePlayerPaddle()
  moveComputerPaddle()
  drawPaddles()
  moveBall()
  drawBall()
  writeScores()
  index = (index + 1) % (steps * 2)
  setTimeout(nextStep, 10)
}

setBallInitialPosition()
nextStep()
