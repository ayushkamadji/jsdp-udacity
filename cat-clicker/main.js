const CAT_NAMES = ["Apple", "Bailey", "Choco", "Drumsticks", "Eclaire", "Fritter" ]
document.addEventListener("DOMContentLoaded", function() {
  const cats = CAT_NAMES.map( name => new Cat(name) )
  const catsElm = document.querySelector(".cats")
  const menuElm = document.querySelector(".menu")
  let selectedCatElm = cats[0].dom
  selectedCatElm.menuItemElm.classList.add("selected")

  catsElm.innerHTML = ""
  catsElm.appendChild(cats[0].dom)

  menuElm.innerHTML = ""
  cats.forEach( cat => {
    menuElm.appendChild(cat.dom.menuItemElm)
    cat.dom.menuItemElm.addEventListener("click", function() {
      selectedCatElm.menuItemElm.classList.remove("selected")
      catsElm.innerHTML = ""
      catsElm.appendChild(cat.dom)
      selectedCatElm = cat.dom
      selectedCatElm.menuItemElm.classList.add("selected")
    })
  })
})

function Cat(name) {
  let clicks = 0
  this.name = name
  this.clicks = clicks
  this.dom = new CatDOM(this.name, this.clicks)
  this.dom.addEventListener("click", function() { 
    clicks++ 
    this.updateClicks(clicks)
  })

  return this
}

function CatDOM(name, clicks) {
  const menuELm = document.createElement("div")
  menuELm.classList.add("cat-menu-item")
  menuELm.appendChild(document.createTextNode(name))

  const nameElm = document.createElement("div")
  nameElm.classList.add("cat-name")
  nameElm.appendChild(document.createTextNode(name))

  const clicksElm = document.createElement("div")
  clicksElm.classList.add("clicks")
  clicksElm.appendChild(document.createTextNode(clicks))

  const imageElm = document.createElement("img")
  imageElm.setAttribute("src", "cat.png")

  const cat = document.createElement("div")
  cat.classList.add("cat")
  cat.appendChild(nameElm)
  cat.appendChild(imageElm)
  cat.appendChild(clicksElm)

  cat.updateClicks = function(value) {
    clicksElm.innerHTML = value
  }

  cat.menuItemElm = menuELm

  return cat
}
