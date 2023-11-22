const { groceryRepository } = require("../../domain/repositories/grocery_repository")


class GroceryListElement extends HTMLElement {
  _groceries = []
  _query = ''
  _currentlyEdited = null
  _isNew = false // is it new grocery currently edited

  $groceryList

  $searchInput
  $searchBtn
  $clearSearchBtn
  $addGroceryBtn

  constructor() {
    super()
    // this.attachShadow({ mode: "open" })

    groceryRepository.findAllGroceries().then((groceries) => {
      this._groceries = groceries
      this.render()
    })
  }


  _onQueryChanged(newQuery) {
    this._query = newQuery
  }


  async onSearch() {
    const newGroceries = await groceryRepository.findAllGroceries(this._query)
    this._groceries = newGroceries
    this.render()
  }


  get currentlyEdited() {
    return this._currentlyEdited
  }


  set currentlyEdited(groceryId) {
    this._currentlyEdited = groceryId
  }


  async _refreshGroceries() {
    const newGroceries = await groceryRepository.findAllGroceries(this._query)
    this._groceries = newGroceries
    this.renderGroceryElements()
  }


  async _onClearSearch() {
    this.$searchInput.value = ''
    this._query = ''
    await this._refreshGroceries()
  }


  _onAddGrocery() {
    this._groceries.push({id: 0, name: '', photoUrl: ''})
    this._currentlyEdited = 0
    this._isNew = true
    this.renderGroceryElements()
  }

  async deleteGroceryElement(groceryId) {
    if (groceryId > 0) await groceryRepository.deleteGrocery(groceryId)

    const grocery = this.querySelector(`#grocery_${groceryId}`)
    grocery.parentElement.removeChild(grocery)
    this._groceries.splice(this._groceries.findIndex(g => g.id == groceryId), 1)
    this._currentlyEdited = null
    this._isNew = false
  }

  grocerySaved(groceryId, updatedGrocery) {
    const i = this._groceries.findIndex((groc) => groc.id == groceryId)
    this._groceries[i] = updatedGrocery
    this._currentlyEdited = null
    this._isNew = false
  }


  render() {
    const template = `
      <div class="controls">
        <input type="text" id="searchInput" placeholder="Type to search">
        <button id="searchBtn">Search</button>
        <button id="clearSearchBtn">Clear Search</button>
        <button id="addGroceryBtn">Add New Grocery</button>
      </div>

      <div class="grocery-list" id="groceryList"></div>
    `

    this.innerHTML = template
    
    this.renderGroceryElements()
    this._setupListeners()
  }


  renderGroceryElements() {
    this.$groceryList ??= this.querySelector('.grocery-list')
    this.$groceryList.innerHTML = ''

    for (const grocery of this._groceries) {
      const $grocery = document.createElement('grocery-item')
      $grocery.init({
        grocery: grocery,
        listElement: this
      })
      this.$groceryList.appendChild($grocery)
    }
  }


  _setupListeners() {
    this.$searchInput = this.querySelector('#searchInput')
    this.$searchBtn = this.querySelector('#searchBtn')
    this.$clearSearchBtn = this.querySelector('#clearSearchBtn')
    this.$addGroceryBtn = this.querySelector('#addGroceryBtn')

    this.$searchInput.addEventListener('input', (ev) => {
      this._onQueryChanged(ev.target.value)
    })

    this.$searchBtn.addEventListener('click', () => {
      this.onSearch() 
    })

    this.$clearSearchBtn.addEventListener('click', () => {
      this._onClearSearch()
    })

    this.$addGroceryBtn.addEventListener('click', () => {
      this._onAddGrocery()
    })
  }

}


// customElements.define('grocery-list', GroceryListElement)

module.exports = {
  GroceryListElement
}