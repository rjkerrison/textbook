const getNextCoordinates = ({ x, y }, r) => {
  // We get a random new coordinate within a half-r radius of (x,y)
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

  // We need to be able to add new coordinates to coordinates list based on the current coordinates
  const addNextCoordinates = (radius) => {
    const randomCoordinates = randomChoice(coordinatesList)
    coordinatesList.push(getNextCoordinates(randomCoordinates, radius))
  }

  const animatePruningStep = () => {
    // We don't have full control over when we animate the next step
    // In order to have a smooth animation, we check to see how long has passed
    const elapsedMilliseconds = Date.now() - startTime
    // and we then calculate which stage we should be at
    const elapsedStages = Math.floor(
      elapsedMilliseconds / millisecondsBetweenStages
    )

    if (!isAnimating) {
      // When this has been set to false, we should stop
      return
    }
    if (elapsedStages > config.pruningEffect.stageLimit) {
      // We don't want to draw too many circles so we use a configured upper limit here, see config.js
      return
    }

    // All our circles grow together, so lets work out how big they should be at this stage
    const currentRadius =
      config.pruningEffect.initialRadius *
      Math.pow(1.16, elapsedMilliseconds / millisecondsBetweenStages)
    // For the clipping, we want to remove a circle that's a few steps behind the current coloured circle
    const earlierRadius =
      config.pruningEffect.initialRadius *
      Math.pow(1.16, elapsedMilliseconds / millisecondsBetweenStages - 3)

    while (elapsedStages > coordinatesList.length) {
      // This is a little out of place,
      // but essentially it's updating our score while we are pruning
      gainScore(elapsedStages * 5)
      // At every stage, we want to add a new coordinate from which we'll create the pruning effect
      // This builds up a complex shape just by overlapping circles
      addNextCoordinates(currentRadius)
    }

    coordinatesList.forEach(({ x, y }) => {
      // This line prevents us from drawing the pruning effect outside the
      // currently visible Loki shape
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
