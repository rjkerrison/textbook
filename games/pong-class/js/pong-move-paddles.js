function isLeftKey(event) {
  // this log statement is helpful to see what the codes are for each key on the keyboard
  // console.log(event.code)
  return event.code === 'ArrowLeft'
}

function isRightKey(event) {
  return event.code === 'ArrowRight'
}

class PongMovePaddles extends PongMovingBall {
  isMovingLeft = false
  isMovingRight = false
  resolution = 5

  constructor(canvas) {
    super(canvas)
    // now we have to listen for the user's left key, right key events
    document.addEventListener('keydown', (event) => {
      if (isLeftKey(event)) {
        this.isMovingLeft = true
      }
      if (isRightKey(event)) {
        this.isMovingRight = true
      }
    })

    document.addEventListener('keyup', (event) => {
      if (isLeftKey(event)) {
        this.isMovingLeft = false
      }
      if (isRightKey(event)) {
        this.isMovingRight = false
      }
    })
  }

  movePlayerPaddle() {
    if (this.isMovingLeft) {
      this.playerPaddle.moveLeft()
    }
    if (this.isMovingRight) {
      this.playerPaddle.moveRight()
    }
  }

  nextStep() {
    this.movePlayerPaddle()
    super.nextStep()
  }
}

;(function () {
  const pong = new PongMovePaddles(
    document.querySelector('canvas#pong-move-paddles')
  )

  pong.nextStep()
})()
