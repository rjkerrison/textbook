// We need a 2D rendering context, x and y coordinates and a radius, and we can define how to clear a circle from a canvas.
function clipInsideCircle(x, y, radius, context) {
  // Save the context so that we can restore it later
  context.save()

  // Create a circular path which we'll use for clipping
  context.beginPath()
  context.arc(x, y, radius, 0, 2 * Math.PI)
  context.closePath()

  // Set clipping mask based on the circle shape
  context.clip()

  // Clear anything inside the canvas
  // Note that the clipping mask means this only applies inside the circle!
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)

  // Remove the clipping mask so that future operations
  // aren't affected by the clipping mask
  context.restore()
}
