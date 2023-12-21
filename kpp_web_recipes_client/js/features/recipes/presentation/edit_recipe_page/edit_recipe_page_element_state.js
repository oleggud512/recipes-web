const initialState = {
  recipe: null,
  groceries: null,
  image: null
}

class EditRecipePageAction {
  static changeName = 'CHANGE_NAME'
  static changeImage = 'CHANGE_IMAGE'
  static deleteImage = 'DELETE_IMAGE'
  static changeDescription = 'CHANGE_DESCRIPTION'
  static changeRecipe = 'CHANGE_RECIPE'

  static addGrocery = 'ADD_GROCERY'
  static removeGrocery = 'REMOVE_GROCERY'
  static updateGroceryAmount = 'UPDATE_GROCERY_AMOUNT'

  static updateRecipe = 'UPDATE_RECIPE'
  static updateGroceries = 'UPDATE_GROCERIES'

  static createChangeNameAction(newName) {
    return {
      type: this.changeName,
      name: newName
    }
  }

  static createChangeImageAction(newImage, newPhotoUrl) {
    return {
      type: this.changeImage,
      image: newImage,
      photoUrl: newPhotoUrl
    }
  }

  static createDeleteImageAction() {
    return {
      type: this.deleteImage
    }
  }

  static createChangeDescriptionAction(newDescription) {
    return {
      type: this.changeDescription,
      description: newDescription
    }
  }
  /**
   * *recipe property of recipe entity
   */
  static createChangeRecipeAction(newRecipe) {
    return {
      type: this.changeRecipe,
      recipe: newRecipe
    }
  }
  
  static createAddGroceryAction(newGrocery) {
    return {
      type: this.addGrocery,
      grocery: newGrocery
    }
  }

  static createRemoveGroceryAction(grocery) {
    return {
      type: this.removeGrocery,
      grocery: grocery
    }
  }

  static createUpdateGroceryAmountAction(groceryId, newAmount) {
    return {
      type: this.updateGroceryAmount,
      groceryId: groceryId,
      amount: newAmount
    }
  }
  /**
   * *recipe entity
   */
  static createUpdateRecipeAction(newRecipe) {
    return {
      type: this.updateRecipe,
      recipe: newRecipe
    }
  }

  static createUpdateGroceriesAction(newGroceries) {
    return {
      type: this.updateGroceries,
      groceries: newGroceries
    }
  }
}

function editRecipeReducer(state, action) {
  switch (action.type) {
    case EditRecipePageAction.changeName:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          name: action.name
        }
      }
    case EditRecipePageAction.changeImage:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          photoUrl: action.photoUrl,
        },
        image: action.image
      }
    case EditRecipePageAction.deleteImage:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          photoUrl: null,
        },
        image: null
      }
    case EditRecipePageAction.changeDescription:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          description: action.description
        },
      }
    case EditRecipePageAction.changeRecipe:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          recipe: action.recipe
        }
      }
    case EditRecipePageAction.addGrocery:
      var i = state.recipe.groceries.indexOf(action.grocery)
      if (i > -1) {
        return { ...state }
      }
      return {
        ...state,
        recipe: {
          ...state.recipe,
          groceries: [
            ...state.recipe.groceries, 
            // TODO: should I place this initialization somewhere else?
            {
              ...action.grocery, 
              amount: 0 
            }
          ]
        }
      }
    case EditRecipePageAction.removeGrocery:
      var newGroceries = [...state.recipe.groceries]
      newGroceries.splice(state.recipe.groceries.indexOf(action.grocery), 1)
      return {
        ...state,
        recipe: {
          ...state.recipe,
          groceries: newGroceries
        }
      }
    case EditRecipePageAction.updateGroceryAmount:
      return updateGroceryAmount(state, action)
    case EditRecipePageAction.updateRecipe: 
      return {
        ...state,
        recipe: action.recipe
      }
    case EditRecipePageAction.updateGroceries:
      return {
        ...state,
        groceries: action.groceries
      }
    default: 
      return state
  }
}

function updateGroceryAmount(state, action) {
  var newGroceries = [...state.recipe.groceries]
  var i = newGroceries.findIndex(g => g.id == action.groceryId)
  newGroceries[i] = {
    ...newGroceries[i],
    amount: action.amount
  }
  return {
    ...state,
    recipe: {
      ...state.recipe,
      groceries: newGroceries
    }
  }
}

module.exports = {
  initialState,
  EditRecipePageAction,
  editRecipeReducer
}