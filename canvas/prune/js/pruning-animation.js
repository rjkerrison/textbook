function clipInsideCircle(x, y, radius, ctx) {
  // save context for clipping
  ctx.save()

  // create path
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.closePath()

  // set clipping mask based on shape
  ctx.clip()

  // clear anything inside it
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  // remove clipping mask
  ctx.restore()
}

const fillStyles = (opacity) => [
  `rgba(158,157,15,${opacity})`,
  `rgba(128,97,185,${opacity})`,
  `rgba(28,197,85,${opacity})`,
  `rgba(128,207,185,${opacity})`,
  `rgba(108,47,215,${opacity})`,
]

function drawPruningEffect(x, y, radius, ctx) {
  const opacity = Math.min(0.7, 0.1 + radius / (ctx.canvas.width * 4))

  ctx.fillStyle = randomChoice(fillStyles(opacity))

  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI, true)
  ctx.closePath()
  ctx.fill()
}

const getNextCoordinates = ({ x, y }, r) => {
  return {
    x: x + (Math.random() - 0.5) * r,
    y: y + (Math.random() - 0.5) * r,
  }
}

const startPruningAnimation = (initialCoordinate, context, gainScore) => {
  let isAnimating = true
  const startTime = Date.now()
  const millisecondsBetweenStages = 70
  const coordinatesList = [initialCoordinate]

  const addNextCoordinates = (radius) => {
    const randomCoordinates =
      coordinatesList[Math.floor(Math.random() * coordinatesList.length)]
    coordinatesList.push(getNextCoordinates(randomCoordinates, radius))
  }

  const animatePruningStep = () => {
    const elapsedMilliseconds = Date.now() - startTime
    const elapsedStages = Math.floor(
      elapsedMilliseconds / millisecondsBetweenStages
    )

    if (!isAnimating) {
      return
    }
    if (elapsedStages > config.pruningEffect.stageLimit) {
      return
    }

    const earlierRadius =
      config.pruningEffect.initialRadius *
      Math.pow(1.16, elapsedMilliseconds / millisecondsBetweenStages - 3)
    const currentRadius =
      config.pruningEffect.initialRadius *
      Math.pow(1.16, elapsedMilliseconds / millisecondsBetweenStages)

    while (elapsedStages > coordinatesList.length) {
      gainScore(elapsedStages * 5)
      addNextCoordinates(currentRadius)
    }

    coordinatesList.forEach(({ x, y }) => {
      context.globalCompositeOperation = 'source-atop'
      drawPruningEffect(x, y, Math.floor(currentRadius), context)
      clipInsideCircle(x, y, Math.floor(earlierRadius), context)
    })

    setTimeout(
      () => window.requestAnimationFrame(animatePruningStep),
      millisecondsBetweenStages / 5
    )
  }

  const cancelAnimation = () => {
    isAnimating = false
  }

  window.requestAnimationFrame(animatePruningStep)

  return {
    cancelAnimation,
  }
}
