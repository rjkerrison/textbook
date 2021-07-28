document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-src]').forEach((element) => {
    const path = element.dataset.src
    fetch(path)
      .then((response) => {
        return response.text()
      })
      .then((text) => {
        element.innerHTML = hljs.highlightAuto(text).value
      })
  })

  hljs.highlightAll()
})
