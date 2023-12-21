const mustache = require("mustache")
const { ObserverHTMLElement } = require("../../../../utils/observable")
const { RecipePageElementController } = require("./recipe_page_element_controller")
const { Constants } = require("../../../../utils/utils")
const { Templates } = require("../../../../shared/templates/templates")
const { globalRouter, appRoutes } = require("../../../../shared/router/router")

class RecipePageElement extends ObserverHTMLElement {

  constructor() {
    super(new RecipePageElementController())
  }

  /**
   * @override
   */
  onStateChange(state) {
    console.log(state)
    this.render(state)
  }

  render(state) {
    const recipe = state.recipe
    if (!recipe) {
      this.innerHTML = 'LOADING'
    }
    const template = `
      <div class="container">
        <h1 id="recipeName" class="recipe-name">{{recipe.name}}</h1>
        
        <p>{{recipe.description}}</p>
        
        <img src="{{recipePhoto}}" id="recipeImg" class="recipe-image"/>
        
        <h2>Groceries</h2>
        <div id="groceryList" class="item-grid-3">
          {{#recipe.groceries}}
            ${Templates.groceryAmount}
          {{/recipe.groceries}}
        </div>

        <h2>Recipe</h2>
        <p>{{recipe.recipe}}</p>

        <button id="editBtn" class="fab icon-button">
          <span class="material-symbols-outlined">edit</span>Edit
        </button>
      </div>
    `
    const rendered = mustache.render(template, {
      ...state,
      recipePhoto: () => {
        return state.recipe?.photoUrl ?? Constants.recipePlaceholder
      },
      photo: () => {
        return this.photoUrl ?? Constants.groceryPlaceholder
      }
    })
    this.innerHTML = rendered

    const $editBtn = this.querySelector('#editBtn')
    $editBtn.addEventListener('click', () => {
      globalRouter.navigateTo(appRoutes.editRecipe, {
        pathParams: {
          id: recipe.id
        }
      })
    })
  }
}

customElements.define('recipe-page-element', RecipePageElement)