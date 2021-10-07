function drawPaddles(context) {
  context.fillRect(2, 2, 100, 5)
  context.fillRect(120, 298, 100, 5)
}

const ballSize = 5
function drawBall(context, position) {
  context.fillRect(position.x, position.y, ballSize, ballSize)
}

;(function () {
  const canvas = document.querySelector('canvas#pong-static')

  const context = canvas.getContext('2d')
  context.fillStyle = 'green'

  drawPaddles(context)
  drawBall(context, { x: 12, y: 16 })
})()
