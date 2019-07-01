var DEFAULT_CATS = ["Apple", "Bailey", "Choco", "Drumsticks", "Eclaire", "Fritter" ]

var model = {
  init: function() {
    if (!localStorage.cats) {
      var cats = DEFAULT_CATS.map( (name, index) => ({id: index, name, clicks: 0}))
      localStorage.cats = JSON.stringify(cats)
    }
    if (!localStorage.selectedCatId) {
      localStorage.selectedCatId = "0"
    }
  },
  selectCat: function(id) {
    localStorage.selectedCatId = id.toString()
  },
  incrementCatClicks: function() {
    var data = JSON.parse(localStorage.cats)
    var current = data[localStorage.selectedCatId]
    current.clicks += 1
    localStorage.cats = JSON.stringify(data)
  },
  getSelectedCatId: function() {
    return localStorage.selectedCatId
  },
  getAllCats: function() {
    return JSON.parse(localStorage.cats)
  }
}

var octopus = {
  init: function() {
    localStorage.clear()
    model.init()
    view.init()
  },
  getCats: function() {
    return model.getAllCats()
  },
  clickCat: function() {
    model.incrementCatClicks()
    catsView.renderClickUpdate()
  },
  selectCat: function(id) {
    model.selectCat(id)
    view.render()
  },
  getCurrentCat: function() {
    return model.getAllCats()[model.getSelectedCatId()]
  }
}

var view = {
  init: function() {
    menuView.init()
    catsView.init()
  },
  render: function() {
    menuView.render()
    catsView.render()
  }
}

  var menuView = {
    init: function() {
      this.menu = document.querySelector(".menu")
      menuView.render()
    },
    handleMenuItemClick: function(e) {
      e.preventDefault()
      var item = e.target
      octopus.selectCat(item.attributes["cat-id"].value)
    },
    catMenuItemElement: function({id, name}) {
      var menuItem = document.createElement("div")
      menuItem.setAttribute("cat-id", id)
      menuItem.classList.add("cat-menu-item")
      menuItem.appendChild(document.createTextNode(name))
      return menuItem
    },
    render: function() {
      while(this.menu.hasChildNodes()) { this.menu.removeChild(this.menu.firstChild) }
      octopus.getCats().forEach( ((context) => (cat) => {
        const menuItem = menuView.catMenuItemElement(cat)
        menuItem.addEventListener("click", menuView.handleMenuItemClick)
        if (cat.id === octopus.getCurrentCat().id) {
          menuItem.classList.add("selected")
        }
        context.menu.appendChild(menuItem)
      })(this))
    }
  }

  var catsView = {
    init: function() {
      this.cats = document.querySelector(".cats")
      catsView.render()
    },
    handleCatClick: function(e) {
      e.preventDefault()
      octopus.clickCat()
    },
    createCatElement: function({id, name, clicks}) {
      const nameElm = document.createElement("div")
      nameElm.classList.add("cat-name")
      nameElm.appendChild(document.createTextNode(name))

      const clicksElm = document.createElement("div")
      clicksElm.classList.add("clicks")
      clicksElm.appendChild(document.createTextNode(clicks))

      const imageElm = document.createElement("img")
      imageElm.setAttribute("src", "cat.png")

      const cat = document.createElement("div")
      cat.setAttribute("cat-id", id)
      cat.classList.add("cat")
      cat.appendChild(nameElm)
      cat.appendChild(imageElm)
      cat.appendChild(clicksElm)
      cat.addEventListener("click", catsView.handleCatClick)

      return cat
    },
    render: function() {
      var cat = octopus.getCurrentCat()
      var catView = catsView.createCatElement(cat)
      while (this.cats.hasChildNodes()) { this.cats.removeChild(this.cats.firstChild) }
      this.cats.appendChild(catView)
    },
    renderClickUpdate: function() {
      var cat = octopus.getCurrentCat()
      var clickElm = this.cats.firstChild.querySelector(".clicks")
      clickElm.removeChild(clickElm.firstChild)
      clickElm.appendChild(document.createTextNode(cat.clicks))
    }
  }

document.addEventListener("DOMContentLoaded", function() {
  octopus.init()
})
