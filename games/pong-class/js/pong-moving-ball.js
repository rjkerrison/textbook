class PongMovingBall extends PongStatic {
  steps = 150
  index = 0
  ball = { position: { x: null, y: null } }

  ballPositionForStep(step) {
    if (step > this.steps) {
      let reverseStep = this.steps * 2 - step
      return { x: reverseStep + 25, y: reverseStep * 2 }
    }
    return { x: step + 25, y: step * 2 }
  }

  moveBall() {
    this.ball.position = this.ballPositionForStep(this.index)
    this.index = (this.index + 1) % (this.steps * 2)
  }

  nextStep() {
    this.context.clearRect(0, 0, this.gameWidth, this.gameHeight)
    this.drawPaddles()
    this.moveBall()
    this.drawBall()
    setTimeout(this.nextStep.bind(this), 15)
  }
}

;(function () {
  const pong = new PongMovingBall(
    document.querySelector('canvas#pong-moving-ball')
  )

  pong.nextStep()
})()
