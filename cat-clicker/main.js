const CAT_NAMES = ["Agus", "Budi"]
document.addEventListener("DOMContentLoaded", function() {
  const catElms = document.querySelectorAll(".cat")
  const state = {
    cats: [{ name: CAT_NAMES[0], clicks: 0 }, { name: CAT_NAMES[1], clicks: 0 }]
  }

  catElms.forEach((cat, index) => {
    const nameElm = cat.querySelector(".cat-name")
    const clickElm = cat.querySelector(".clicks")
    const catState = state.cats[index]
    nameElm.innerHTML = catState.name
    clickElm.innerHTML = catState.clicks

    cat.addEventListener("click", function() {
      catState.clicks++
      clickElm.innerHTML = catState.clicks
    })
  })
})
