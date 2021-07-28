// Generating some colours based on a given opacity
const fillStyles = (opacity) => [
  `rgba(158,157,15,${opacity})`,
  `rgba(128,97,185,${opacity})`,
  `rgba(28,197,85,${opacity})`,
  `rgba(128,207,185,${opacity})`,
  `rgba(108,47,215,${opacity})`,
]

// As usual, we want to create an effect that's reusable, so we parametrise the following:
// - x coordinate
// - y coordinate
// - radius
// - context, the canvas 2D context where it will operate
function drawPruningEffect(x, y, radius, context) {
  // We throw in a bit of varying opacity — as the size gets bigger, the opacity of the colours grows
  const opacity = Math.min(0.7, 0.1 + radius / (context.canvas.width * 4))

  // Pick one of the eerie colours
  context.fillStyle = randomChoice(fillStyles(opacity))

  // Classic canvas circle creation
  context.beginPath()
  context.arc(x, y, radius, 0, 2 * Math.PI, true)
  context.closePath()
  context.fill()
}
