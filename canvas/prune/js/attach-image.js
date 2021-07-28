const attachLoadedImageToCanvas = (image, context) => {
  const ratio = Math.max(
    image.width / context.canvas.width,
    image.height / context.canvas.height
  )

  context.drawImage(
    image,
    0,
    0,
    Math.floor(image.width / ratio),
    Math.floor(image.height / ratio)
  )
}

function attachImageToCanvas(chosenImage, context) {
  const callback = () => attachLoadedImageToCanvas(chosenImage, context)
  if (chosenImage.complete) {
    callback()
  } else {
    chosenImage.addEventListener('load', callback)
  }
}
