const initState = {
  query: "",
  recipes: []
}

const actions = {
  setRecipes: "SET_RECIPES",
  clearQuery: "CLEAR_QUERY",
  updateQuery: "UPDATE_QUERY"
}

// TODO: change name
function recipeReducer(state, action) {
  switch (action.type) {
    case (actions.setRecipes):
      return {
        ...state,
        recipes: [...action.recipes]
      }
    case (actions.clearQuery):
      return {
        ...state,
        query: ""
      }
    case (actions.updateQuery):
      return {
        ...state,
        query: action.query
      }
    default: 
      return state
  }
}

module.exports = {
  initState, 
  actions,
  recipeReducer
}
// store должен создаваться внтури controller.  
// const store = createStore(recipeReducer, initState)
