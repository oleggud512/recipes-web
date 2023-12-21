const { globalRouter, appRoutes } = require("../../../../shared/router/router")
const { Templates } = require("../../../../shared/templates/templates")
const { ObserverHTMLElement } = require("../../../../utils/observable")
const { RecipeListElementController } = require("./recipe_list_element_controller")

class RecipeListElement extends ObserverHTMLElement {


  $groceryList

  $searchInput
  $clearSearchBtn
  $addRecipeBtn

  constructor() {
    super(new RecipeListElementController())
  }

  connectedCallback() {
    console.log('recipe-list connected')
    this.innerHTML = `
      <div class="container">
        ${Templates.search}
        
        
        <div class="recipe-list item-grid" id="recipeList"></div>
        <button id="addRecipeBtn" class="fab icon-button">
          <span class="material-symbols-outlined">add</span>Add New Recipe
        </button>
      </div>
    `

    this.$searchInput = this.querySelector('#searchInput')
    this.$clearSearchBtn = this.querySelector('#clearSearchBtn')
    this.$addRecipeBtn = this.querySelector('#addRecipeBtn')
    this.$recipeList = this.querySelector('#recipeList')

    this.$searchInput.addEventListener('input', (ev) => {
      this._onQueryChanged(ev.target.value)
    })
    this.$searchInput.addEventListener('keyup', (ev) => {
      if (ev.key === 'Enter' || ev.keyCode === 13) {
        document.activeElement.blur()
        this._onSearch()
      }
    })
    this.$clearSearchBtn.addEventListener('click', () => {
      this._onClearSearch()
    })
    this.$addRecipeBtn.addEventListener('click', () => {
      this._onAddRecipe()
    })
    
    super.connectedCallback()
  }

  onStateChange(state) {
    console.log({mes: 'state changed', state})
    this.render(state)
  }

  _onQueryChanged(newQuery) {
    this._observable.updateQuery(newQuery)
  }

  async _onSearch() {
    await this._observable.refresh()
  }

  async _onClearSearch() {
    await this._observable.clearQuery()
    this.$searchInput.value = ''
  }

  _onAddRecipe() {
    globalRouter.navigateTo(appRoutes.editRecipe, { 
      pathParams: {
        id: 'new'
      }
    })
  }

  render(state) {
    this.$searchInput.value = state.query
    this.renderRecipeElements(state)
  }

  renderRecipeElements(state) {
    const fragment = document.createDocumentFragment()

    for (const recipe of state.recipes) {
      const $recipe = document.createElement('recipe-item')
      $recipe.init(recipe)
      fragment.appendChild($recipe)
    }

    this.$recipeList.innerHTML = ''
    this.$recipeList.appendChild(fragment)
  }

}

customElements.define('recipe-list', RecipeListElement)

module.exports = { RecipeListElement }