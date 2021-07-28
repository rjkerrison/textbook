function loadImage(src) {
  const image = new Image()
  image.src = src
  return image
}

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
    this.scoreDisplay.textContent = this.score.toString().padStart(6, '0')
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
    const chosenImage = randomChoice(lokiImages)

    const canvas = createCanvas(
      this.container,
      chosenImage.width,
      chosenImage.height
    )

    const showLokiImage = () => attachImageToCanvas(chosenImage, canvas.context)
    const pruneLokiCanvas = getPruneClickListener({
      canvas,
      nextStep: this.nextGameStep.bind(this),
      gainScore: this.gainScore.bind(this),
    })
    const attachClickEvent = () => {
      canvas.element.addEventListener('click', pruneLokiCanvas)
    }

    showDoor(canvas.context, showLokiImage, attachClickEvent)
  }
}
