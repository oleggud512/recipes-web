class RecipeListElement extends HTMLElement {
  constructor() {
    super()
  }
}

customElements.define('recipe-list', RecipeListElement)

module.exports = {
  RecipeListElement
}