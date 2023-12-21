class Recipe {
  constructor(
    id, 
    description = '', 
    recipe = '', 
    photoUrl = null, 
    groceries = []
  ) {
    this.id = id
    this.description = description
    this.recipe = recipe
    this.photoUrl = photoUrl
    this.groceries = groceries
  }
}

module.exports = {
  Recipe
}