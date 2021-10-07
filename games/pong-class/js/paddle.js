// We need a class for our two paddles
class Paddle {
  constructor(position, colour, gameWidth, resolution = 5, width = 20) {
    this.position = position
    this.colour = colour
    this.width = width
    this.resolution = resolution
    this.gameWidth = gameWidth
  }

  // we'll need to check whether an x-ordinate is within the range covered by the paddle…
  isOnPaddle(x) {
    return x >= this.leftSide() && x <= this.rightSide()
  }
  // …therefore we need to know where the left and right edges are
  leftSide() {
    return this.position.x
  }
  rightSide() {
    return this.position.x + this.width * this.resolution
  }
  // let's let the paddle take care of how it is drawn
  draw(context) {
    context.fillStyle = this.colour
    context.fillRect(
      this.position.x,
      this.position.y,
      this.resolution * this.width,
      this.resolution
    )
  }

  // we need to be able to move
  moveLeft() {
    console.log('moving left', this.position.x)
    this.position.x -= this.resolution
    console.log('moved left', this.position.x)

    const distancePastLeftEdge = 0 - this.leftSide()
    if (distancePastLeftEdge > 0) {
      this.position.x += distancePastLeftEdge
    }
  }
  moveRight() {
    console.log('moving right', this.position.x)
    this.position.x += this.resolution
    console.log('moved right', this.position.x)

    const distancePastRightEdge = this.rightSide() - this.gameWidth
    if (distancePastRightEdge > 0) {
      this.position.x -= distancePastRightEdge
      console.log('adjustedRight', this.position.x)
    }
  }
}

;(function () {
  const canvas = document.querySelector('canvas')
  const context = canvas.getContext('2d')
  const computerPaddle = new Paddle({ x: 20, y: 5 }, '#2f5384', canvas.width, 5)
  const playerPaddle = new Paddle(
    { x: 0, y: canvas.height - 10 },
    '#894178',
    canvas.width,
    5
  )

  computerPaddle.draw(context)
  playerPaddle.draw(context)
})()
