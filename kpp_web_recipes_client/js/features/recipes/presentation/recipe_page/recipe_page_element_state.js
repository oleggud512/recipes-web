const initialState = {
  recipe: null
}

const actions = {
  updateRecipe: 'UPDATE_RECIPE'
}

class RecipePageAction {
  static updateRecipe = 'UPDATE_RECIPE'

  static createUpdateRecipeAction(newRecipe) {
    return {
      type: this.updateRecipe,
      recipe: newRecipe
    }
  }
}

function recipeListElementReducer(state, action) {
  switch (action.type) {
    case actions.updateRecipe:
      return {
        ...state,
        recipe: action.recipe
      }
    default: 
      return state
  }
}


module.exports = {
  initialState,
  RecipePageAction,
  recipeListElementReducer
}