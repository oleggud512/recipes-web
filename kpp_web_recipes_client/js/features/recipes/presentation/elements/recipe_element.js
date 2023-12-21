const mustache = require("mustache")
const { globalRouter, appRoutes } = require("../../../../shared/router/router")

class RecipeElement extends HTMLElement {

  recipe

  render() {
    const template = `
      <div class="recipe-item">
        <img src="{{photo}}">
        <div class="recipe-content">
          <h4>{{recipe.name}}</h4>
          <span>{{recipe.description}}</span>
        </div>
      </div>
    `

    const rednered = mustache.render(template, { 
      recipe: this.recipe,
      photo: () => {
        return this.recipe.photoUrl ?? "https://placehold.co/400x400/lightgrey/grey?text=No+image"
      }
    })
    this.innerHTML = rednered

    this.setupListeners()
  }

  setupListeners() {
    this.addEventListener('click', () => {
      this.openRecipe()
    })
  }

  openRecipe() {
    globalRouter.navigateTo(appRoutes.recipe, {
      pathParams: {
        id: this.recipe.id
      }
    })
  }

  init(recipe) {
    this.recipe = recipe
    this.render()
  }
}

customElements.define('recipe-item', RecipeElement)