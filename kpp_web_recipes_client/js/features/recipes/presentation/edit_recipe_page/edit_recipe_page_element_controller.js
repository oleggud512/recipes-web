const { ReduxObservable } = require("../../../../utils/redux");
const { Recipe } = require('../../domain/entities/recipe')
const { Constants, getPathSegments } = require("../../../../utils/utils");
const { groceryRepository } = require("../../../groceries/domain/repositories/grocery_repository");
const { recipeRepository } = require("../../domain/repositories/recipe_repository");
const { editRecipeReducer, initialState, EditRecipePageAction } = require("./edit_recipe_page_element_state");
const { globalRouter, appRoutes } = require("../../../../shared/router/router");
const { imageRepository } = require("../../../../shared/image_repository/image_repository");

class EditRecipePageElementController extends ReduxObservable {
  recipeId

  constructor() {
    super(editRecipeReducer, initialState)

    const segments = getPathSegments(window.location.href)
    const recipeId = segments[segments.length - 2]

    if (recipeId == 'new') {
      this.recipeId = recipeId
      this.dispatch(EditRecipePageAction.createUpdateRecipeAction(new Recipe('new')))
    } else {
      // TODO: why doesn't this work?
      this.recipeId == Number(recipeId)
      recipeRepository.findRecipeById(Number(recipeId)).then(recipe => {
        this.dispatch(EditRecipePageAction.createUpdateRecipeAction(recipe))
      })
    }
    groceryRepository.findAllGroceries().then(groceries => {
      this.dispatch(EditRecipePageAction.createUpdateGroceriesAction(groceries))
    })
  }

  changeName(newName) {
    this.dispatch(EditRecipePageAction.createChangeNameAction(newName))
  }

  changeDescription(newDescription) {
    this.dispatch(
      EditRecipePageAction.createChangeDescriptionAction(newDescription))
  }

  changeRecipe(newRecipe) {
    this.dispatch(EditRecipePageAction.createChangeRecipeAction(newRecipe))
  }

  changeImage(newImage) {
    this.dispatch(EditRecipePageAction.createChangeImageAction(
      newImage, 
      newImage ? URL.createObjectURL(newImage) : null
    ))
  }

  deleteImage() {
    this.dispatch(EditRecipePageAction.createDeleteImageAction())
  }

  addGrocery(newGrocery) {
    this.dispatch(EditRecipePageAction.createAddGroceryAction(newGrocery))
  }

  removeGrocery(grocery) {
    this.dispatch(EditRecipePageAction.createRemoveGroceryAction(grocery))
  }

  changeAmount(groceryId, newAmount) {
    this.dispatch(EditRecipePageAction.createUpdateGroceryAmountAction(
      groceryId, 
      newAmount
    ))
  }

  async save() {
    var recipe = this._state.recipe

    if (this._state.image != null) {
      const imageId = await imageRepository.uploadImage(this._state.image)
      const photoUrl = Constants.baseImageUrl + imageId
      recipe = {
        ...this._state.recipe,
        photoUrl: photoUrl
      }
      console.log({imageId})
    }
    
    console.log(recipe)
    const updatedRecipe = recipe.id == 'new'
      ? await recipeRepository.addNewRecipe(recipe)
      : await recipeRepository.updateRecipe(recipe)
    console.log(updatedRecipe)

    globalRouter.navigateTo(appRoutes.recipe, {
      pathParams: {
        id: updatedRecipe.id
      }
    })
  }

  async delete() {
    if (this._state.recipe.id == 'new') {
      alert('Can\'t delete this recipe')
      return 
    }
    await recipeRepository.deleteRecipe(this._state.recipe.id)
    globalRouter.navigateTo(appRoutes.recipes)
  }
}

module.exports = {
  EditRecipePageElementController
}