const { Router, Route } = require("../../utils/router")
const { Constants } = require("../../utils/utils")

const appRoutes = {
  recipes: 'recipes',
  groceries: 'groceries',
  recipe: 'recipe',
  editRecipe: 'editRecipe'
}

const globalRouter = new Router([
  new Route({
    name: appRoutes.recipes,
    displayName: 'Recipes',
    href: Constants.baseUrl + '/recipes'
  }),
  new Route({
    name: appRoutes.groceries,
    displayName: 'Groceries',
    href: Constants.baseUrl + '/groceries'
  }),
  new Route({
    name: appRoutes.recipe,
    href: Constants.baseUrl + '/recipes/:id'
  }),
  new Route({
    name: appRoutes.editRecipe,
    href: Constants.baseUrl + '/recipes/:id/edit'
  })
])

module.exports = {
  appRoutes,
  globalRouter
}