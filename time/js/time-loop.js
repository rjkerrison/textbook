// grab the container
const target = document.querySelector('#time-loop')
// find all the pictures given in HTML
const pictures = Array.from(target.children).filter(
  (el) => el.tagName.toLowerCase() === 'picture'
)

// define how to cycle through the pictures
function cyclePictures() {
  // find the picture which isn't hidden
  const currentlyShownIndex = pictures.findIndex(
    (x) => !x.classList.contains('hidden')
  )
  // hide every picture
  pictures.forEach((el) => el.classList.add(`hidden`))
  // work out which picture to show next
  const indexToShow = (currentlyShownIndex + 1) % pictures.length
  // show that next picture
  pictures[indexToShow].classList.remove('hidden')
}

// execute the cycle function every 2.5 seconds
setInterval(cyclePictures, 2500)
