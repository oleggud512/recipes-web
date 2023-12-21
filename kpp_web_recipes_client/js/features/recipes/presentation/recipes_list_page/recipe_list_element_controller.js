const recipeListState = require("./recipe_list_element_state");
const { recipeRepository } = require("../../domain/repositories/recipe_repository");
const { ReduxObservable } = require("../../../../utils/redux");

class RecipeListElementController extends ReduxObservable {
  
  constructor() {
    super(recipeListState.recipeReducer, recipeListState.initState)

    this.refresh()
  }

  async refresh() {
    const recipes = await recipeRepository.findRecipesByName(this._store.getState().query)
    console.log(recipes)
    this.dispatch({
      type: recipeListState.actions.setRecipes,
      recipes: recipes
    })
  }

  async clearQuery() {
    this._store.dispatch({ type: recipeListState.actions.clearQuery })
    await this.refresh()
  }

  updateQuery(newQuery) {
    this.dispatch({ 
      type: recipeListState.actions.updateQuery,
      query: newQuery 
    })
  }
}

module.exports = { RecipeListElementController }