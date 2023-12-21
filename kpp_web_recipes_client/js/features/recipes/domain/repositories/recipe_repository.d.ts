export type Grocery = {
  id: number
  name: string
  photoUrl: string
}

export type RecipeGrocery = Grocery & { amount: number }

export type Recipe = {
  id: number
  name: string
  recipe: string
  description: string
  photoUrl: string
  groceries: RecipeGrocery[]
}

export type ListRecipe = Omit<Recipe, "groceries">


class RecipeRepository {
  async findRecipesByName(name: string = '') : Promise<Recipe[]>
  async findRecipeById(id: number) : Promise<Recipe>
  async addNewRecipe(recipe: Recipe) : Promise<Recipe>
  async updateRecipe(recipe: Recipe) : Promise<Recipe>
  async deleteRecipe(id: number) : Promise<void>
}

export const recipeRepository: RecipeRepository