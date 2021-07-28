function loadImage(src) {
  const image = new Image()
  image.src = src
  return image
}

// Our high-level game is responsible for choosing among these images
const lokiImages = [
  loadImage('./images/loki-tva.png'),
  loadImage('./images/loki-tva-2.png'),
  loadImage('./images/kid-loki.png'),
  loadImage('./images/boastful-loki.png'),
  loadImage('./images/sylvie.png'),
  loadImage('./images/alligator-loki.png'),
  loadImage('./images/croki.jpg'),
]

class Game {
  constructor(container, scoreDisplay) {
    this.container = container
    this.scoreDisplay = scoreDisplay
  }

  displayScore() {
    // We don't want to update the score more often than the framerate
    window.requestAnimationFrame(() => {
      this.scoreDisplay.textContent = this.score.toString().padStart(6, '0')
    })
  }

  gainScore(increase) {
    this.score += increase
    this.displayScore()
  }

  end() {
    this.container.querySelectorAll('.variant-loki').forEach((x) => {
      this.container.removeChild(x)
    })
  }

  start() {
    this.score = 0
    this.displayScore()
    this.nextGameStep()
  }

  nextGameStep() {
    // It's not a necessary abstraction to have both nextGameStep and spawnLoki right now,
    // but the abstraction is likely to be useful in later versions
    // of the game where the steps are more complex
    this.spawnLoki()
  }

  spawnLoki() {
    // The game is responsible for choosing the image
    const chosenImage = randomChoice(lokiImages)

    // We need to know how big the image is in order to create a matching canvas of that size
    const canvas = createCanvas(
      this.container,
      chosenImage.width,
      chosenImage.height
    )

    // We'll create a simple, parameter-less callback for drawing the image on the canvas
    const showLokiImage = () => attachImageToCanvas(chosenImage, canvas.context)

    // The prune click listener is complicated and takes in a few parameters
    // We've extracted it elsewhere to keep our Game class to only the highest level logic
    const pruneLokiCanvas = getPruneClickListener({
      canvas,
      nextStep: this.nextGameStep.bind(this),
      gainScore: this.gainScore.bind(this),
    })
    // We'll create a simple, parameter-less callback for attaching the click event to the canvas
    const attachClickEvent = () => {
      canvas.element.addEventListener('click', pruneLokiCanvas)
    }

    // We want to show the Loki image only when the door is opened
    // Similarly, we only attach the pruning event after the Loki has appeared
    // Only the `showDoor` function knows what these timings are, so we defer the responsibility
    // of executing these callbacks to `showDoor`. Note that we do not entrust `showDoor` with the mechanics of
    // *how* to show Loki or attach the event — it will execute our instructions *when* it is ready.
    showDoor(canvas.context, showLokiImage, attachClickEvent)
  }
}
