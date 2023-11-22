import { Grocery } from "./recipe_repository";

class GroceryRepository {
  async findAllGroceries(name: string = '') : Promise<Grocery[]>
  async addNewGrocery(grocery: Grocery) : Promise<Grocery>
  async deleteGrocery(id: number) : Promise<void>
  async updateGrocery(grocery: Grocery) : Promise<Grocery>
}

const groceryRepository: GroceryRepository