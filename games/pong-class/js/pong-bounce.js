class PongBounce extends PongMovePaddles {
  ball = {
    position: {
      x: null,
      y: null,
    },
    // the angle from the horizontal, in radians
    // positive means above the horizontal
    angle: null,
    colour: '#22af84',
    velocity: 1,
  }

  moveBall() {
    const { x, y } = this.ball.position
    const newPosition = {
      x: x + Math.cos(this.ball.angle) * this.resolution * this.ball.velocity,
      y: y + Math.sin(this.ball.angle) * this.resolution * this.ball.velocity,
    }
    this.ball.position = newPosition
  }

  detectSideCollisions() {
    if (this.ball.position.x < 0) {
      this.ball.angle = Math.PI - this.ball.angle
    }
    if (this.ball.position.x > this.gameWidth) {
      this.ball.angle = Math.PI - this.ball.angle
    }
  }
  detectCollisions() {
    this.detectSideCollisions()
    this.detectPlayerPaddleCollision()
    this.detectComputerPaddleCollision()
  }
  detectPlayerPaddleCollision() {
    // TODO check that we have hit the paddle — for now, let's just always bounce
    if (this.ball.position.y > this.playerPaddle.position.y) {
      // Flip it!
      this.ball.angle = -this.ball.angle
    }
  }
  detectComputerPaddleCollision() {
    // for now we just bounce
    if (this.ball.position.y < this.computerPaddle.position.y) {
      this.ball.angle = -this.ball.angle
    }
  }

  drawCircle({ colour, position: { x, y } }) {
    this.context.beginPath()
    this.context.arc(x, y, this.resolution, 0, 2 * Math.PI)
    this.context.fillStyle = colour
    this.context.fill()
    this.context.closePath()
  }
  drawBall() {
    this.drawCircle(this.ball)
  }
  setBallInitialPosition() {
    // start ball between first and third x
    const xRandomisation = Math.random() * 2
    this.ball.position = {
      x: ((xRandomisation + 1) * this.gameWidth) / 4,
      y: this.gameHeight / 4,
    }
    // ball starts left-to-right or right-to-left
    this.ball.angle = ((Math.random() > 0.5 ? 1 : 2) * Math.PI) / 3
    this.ball.velocity = 1
  }

  nextStep() {
    this.detectCollisions()
    super.nextStep()
  }
}

;(function () {
  const pong = new PongBounce(document.querySelector('canvas#pong-bounce'))

  pong.setBallInitialPosition()
  pong.nextStep()
})()
