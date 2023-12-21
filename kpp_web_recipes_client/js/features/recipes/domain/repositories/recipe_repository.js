const { client } = require("./../../../../utils/client")

class RecipeRepository {
  client

  constructor() {
    this.client = client
  }

  async findRecipesByName(name = '') {
    const res = await client.get('recipe', {
      params: { name }
    })
    return res.data
  }

  async findRecipeById(id) {
    const res = await client.get(`recipe/${id}`)
    return res.data
  }

  async addNewRecipe(recipe) {
    const res = await client.post('recipe', recipe)
    return res.data
  }

  async updateRecipe(recipe) {
    const res = await client.put(`recipe/${recipe.id}`, recipe)
    return res.data
  }

  async deleteRecipe(id) {
    await client.delete(`recipe/${id}`)
  }
}

const recipeRepository = new RecipeRepository()

module.exports = { recipeRepository }