class PongPlayable extends PongBounce {
  score = { computer: 0, player: 0 }

  // now we need the ball to move by bouncing off the paddles
  detectPaddleCollision(paddle, opponent, isBallBeyondPaddle) {
    if (isBallBeyondPaddle(this.ball, paddle)) {
      if (paddle.isOnPaddle(this.ball.position.x)) {
        // TODO make the bounce non-linear
        // bounces near the edge should result in an angle nearer the horizontal
        this.ball.angle = -this.ball.angle
        // let's speed it up too!
        this.ball.velocity += 0.025
      } else {
        this.score[opponent]++
        this.setBallInitialPosition()
      }
    }
  }

  detectPlayerPaddleCollision() {
    this.detectPaddleCollision(
      this.playerPaddle,
      'computer',
      (ball, paddle) => ball.position.y > paddle.position.y
    )
  }
  detectComputerPaddleCollision() {
    this.detectPaddleCollision(
      this.computerPaddle,
      'player',
      (ball, paddle) => ball.position.y < paddle.position.y
    )
  }

  moveComputerPaddle() {
    if (!this.computerPaddle.isOnPaddle(this.ball.position.x)) {
      // This takes some fiddling
      // You don't want the computer to be too strong,
      // but you don't want it to lose too easily either

      if (Math.random() > 0.85) {
        // nerfing the computer
        // sometimes it won't move
        return
      }

      const isBallMovingDown = Math.sin(this.ball.angle) > 0
      const doubleCentre =
        this.computerPaddle.rightSide() + this.computerPaddle.leftSide()

      if (isBallMovingDown) {
        // recentre if it's too far off
        if (doubleCentre > 1.02 * this.gameWidth) {
          this.computerPaddle.moveLeft()
        } else if (doubleCentre < 0.98 * this.gameWidth) {
          this.computerPaddle.moveRight()
        }
      } else {
        // recentre if ball is too far off
        if (this.ball.position.x * 2 < doubleCentre * 0.98) {
          this.computerPaddle.moveLeft()
        } else if (this.ball.position.x * 2 > doubleCentre * 1.02) {
          this.computerPaddle.moveRight()
        }
      }
    }
  }
  nextStep() {
    this.moveComputerPaddle()
    super.nextStep()
    this.writeScores()
  }
  computerScoreElement = document.querySelector('#computer-score')
  playerScoreElement = document.querySelector('#player-score')

  writeScores() {
    this.computerScoreElement.innerText = this.score.computer
    this.playerScoreElement.innerText = this.score.player
  }
}

;(function () {
  const pong = new PongPlayable(document.querySelector('canvas#pong-playable'))

  pong.setBallInitialPosition()
  pong.nextStep()
})()
