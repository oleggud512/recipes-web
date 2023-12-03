class RecipeListElement extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = "<h3>empty recipe-list element...</h3>"
  }

}

customElements.define('recipe-list', RecipeListElement)

module.exports = { RecipeListElement }