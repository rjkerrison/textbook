class PongStatic {
  ballSize = 5
  resolution = 5
  ball = { position: { x: 12, y: 16 } }

  constructor(canvas) {
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.context.fillStyle = 'green'
    const { width, height } = this.canvas
    this.gameWidth = width
    this.gameHeight = height

    // we need to initialise our paddles
    this.computerPaddle = new Paddle(
      { x: 20, y: this.resolution },
      '#2f5384',
      this.gameWidth,
      this.resolution
    )
    this.playerPaddle = new Paddle(
      { x: 0, y: this.gameHeight - this.resolution * 2 },
      '#894178',
      this.gameWidth,
      this.resolution
    )
  }
  drawBall() {
    this.context.fillRect(
      this.ball.position.x,
      this.ball.position.y,
      this.ballSize * 2,
      this.ballSize * 2
    )
  }
  drawPaddles() {
    this.computerPaddle.draw(this.context)
    this.playerPaddle.draw(this.context)
  }
}

;(function () {
  const pong = new PongStatic(document.querySelector('canvas#pong-static'))

  pong.drawPaddles()
  pong.drawBall()
})()
