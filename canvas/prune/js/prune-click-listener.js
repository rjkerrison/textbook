function getPruneClickListener({
  canvas: { left, top, remove: removeCanvas, context },
  nextStep,
  gainScore,
}) {
  let isFirstClick = true

  const pruneClickListener = ({ clientX, clientY }) => {
    let x = clientX - left
    let y = clientY - top

    const { cancelAnimation } = startPruningAnimation(
      { x, y },
      context,
      gainScore
    )

    const shouldRemoveCanvas = isFirstClick
    setTimeout(() => {
      if (shouldRemoveCanvas) {
        removeCanvas()
      }
      cancelAnimation()
    }, config.pruningEffect.removeTimeoutInMs)
    if (isFirstClick) {
      setTimeout(nextStep, config.nextStepTimeoutInMs)
    }
    isFirstClick = false
  }
  return pruneClickListener
}
