document.addEventListener("DOMContentLoaded", function() {
  const catElm = document.querySelector("#cat")
  const clicksElm = document.querySelector("#clicks")
  const state = { clicks: 0 }

  clicksElm.innerHTML = state.clicks

  catElm.addEventListener("click", function() {
    state.clicks++
    clicksElm.innerHTML = state.clicks
  })
})
