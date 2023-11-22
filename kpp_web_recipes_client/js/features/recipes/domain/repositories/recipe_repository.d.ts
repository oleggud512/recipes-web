export type Grocery = {
  id: number
  name: string
  photoUrl: string
}

export type BaseRecipe<GroceryType = Grocery | number> = {
  id: number
  name: string
  recipe: string
  description: string
  photoUrl: string
  groceries: GroceryType[]
}

// TODO: (1) may be, change names?
export type DisplayRecipe = BaseRecipe<Grocery>
export type AddRecipe = BaseRecipe<number>

