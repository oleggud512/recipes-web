const { GroceryListElementController } = require("./grocery_list_element_controller")


class GroceryListElement extends HTMLElement {
  /**
   * @type {GroceryListElementController}
   */
  _controller
  _stateCallback

  $groceryList

  $searchInput
  $searchBtn
  $clearSearchBtn
  $addGroceryBtn


  constructor() {
    super()
  }


  connectedCallback() {
    // this.render()
    // TODO: replace with DI
    this._controller = new GroceryListElementController()
    this._stateCallback = this.onStateChange.bind(this)
    this._controller.subscribe(this._stateCallback)
  }

  disconnectedCallback() {
    this._controller.unsubscribe(this._stateCallback)
  }

  onStateChange(state) {
    console.log({mes: 'state changed', state})
    this.render(state)
  }

  _onQueryChanged(newQuery) {
    this._controller.changeQuery(newQuery)
  }

  async _onSearch() {
    await this._controller.refresh()
  }

  _onClearSearch() {
    this._controller.cleanQuery()
    this.$searchInput.value = ''
  }

  _onAddGrocery() {
    this._controller.addNewGrocery()
  }

  // если нужно будет изменять кнопки, то делать это по ссылкам на кнопки
  // (также, создаешь метод принимающий state)
  render(state) {
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

    this.$searchInput = this.querySelector('#searchInput')
    this.$searchInput.value = state.query
    this.$searchBtn = this.querySelector('#searchBtn')
    this.$clearSearchBtn = this.querySelector('#clearSearchBtn')
    this.$addGroceryBtn = this.querySelector('#addGroceryBtn')

    this.$groceryList = this.querySelector('#groceryList')
    
    this.renderGroceryElements(state)
    this._setupListeners()
  }


  renderGroceryElements(state) {
    const fragment = document.createDocumentFragment()

    const groceries = state.groceryToAdd
      ? [...state.groceries, state.groceryToAdd]
      : state.groceries

    for (const grocery of groceries) {
      const $grocery = document.createElement('grocery-item')
      $grocery.init({
        grocery: grocery,
        isEdit: this._controller.currentlyEdited == grocery.id,
        controller: this._controller
      })
      fragment.appendChild($grocery)
    }

    this.$groceryList.innerHTML = ''
    this.$groceryList.appendChild(fragment)
  }


  _setupListeners() {
    this.$searchInput.addEventListener('input', (ev) => {
      this._onQueryChanged(ev.target.value)
    })

    this.$searchBtn.addEventListener('click', () => {
      this._onSearch()
    })

    this.$clearSearchBtn.addEventListener('click', () => {
      this._onClearSearch()
    })

    this.$addGroceryBtn.addEventListener('click', () => {
      this._onAddGrocery()
    })
  }
}


customElements.define('grocery-list', GroceryListElement)