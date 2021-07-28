const randomChoice = (arr) => arr[Math.floor(arr.length * Math.random())]

const getMaximumCanvasSize = () => {
  const width = Math.min(Math.floor(window.innerWidth / 2), 500)
  const height = Math.min(Math.floor(window.innerHeight / 2), 500)

  return { height, width }
}
