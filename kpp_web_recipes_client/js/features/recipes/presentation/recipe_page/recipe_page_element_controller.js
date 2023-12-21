const { ReduxObservable } = require("../../../../utils/redux");
const { recipeListElementReducer, RecipePageAction, initialState } = require("./recipe_page_element_state")
const { recipeRepository } = require("./../../domain/repositories/recipe_repository");

class RecipePageElementController extends ReduxObservable {
  
  recipeId

  constructor() {
    super(recipeListElementReducer, initialState)
    const segments = new URL(window.location.href).pathname.split('/')
    this.recipeId = Number(segments[segments.length - 1])
    recipeRepository.findRecipeById(this.recipeId).then(recipe => {
      console.log({mes:"recipe found", recipe})
      this.dispatch(RecipePageAction.createUpdateRecipeAction(recipe))
    })
  }

}

module.exports = { 
  RecipePageElementController
}