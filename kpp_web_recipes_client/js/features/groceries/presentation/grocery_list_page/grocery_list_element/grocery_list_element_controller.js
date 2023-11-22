const { Observable } = require('../../../../../utils/observable')
const { Grocery } = require('../../../domain/entities/grocery')
const { groceryRepository } = require('../../../domain/repositories/grocery_repository')
const { GroceryListElementState } = require('./grocery_list_element_state')


class GroceryListElementController extends Observable {

  constructor() {
    super(new GroceryListElementState())
    groceryRepository.findAllGroceries().then(groceries => {
      this.emit({
        ...this.state,
        groceries: groceries,
      })
    })
  }

  /**
   * fetch new groceries
   */
  async refresh() {
    const newGroceries = await groceryRepository.findAllGroceries(this.state.query)
    this.emit({
      ...this.state,
      groceries: newGroceries
    })
  }

  /**
   * every time query changes
   */
  changeQuery(query) {
    this.state.query = query
  }


  addNewGrocery() {
    const groceryToAdd = new Grocery()
    this.emit({
      ...this.state,
      currentlyEdited: groceryToAdd.id,
      groceryToAdd,
    })
  }


  async cleanQuery() {
    this.emit({
      ...this.state,
      query: '',
      groceries: await groceryRepository.findAllGroceries(),
    })
  }


  async deleteGrocery(groceryId) {
    const g = this.state.groceries.find(g => g.id == groceryId)
    var newGroceries
    if (g) {
      await groceryRepository.deleteGrocery(groceryId)
      newGroceries = this.state.groceries.filter(g => g.id != groceryId) // TODO: .splice() deletes the first element...
    }
    
    this.emit({
      ...this.state,
      groceries: newGroceries ?? this.state.groceries,
      currentlyEdited: null,
      groceryToAdd: null
    })
  }


  async saveGrocery(groceryId) {
    const newGroceries = [...this.state.groceries]

    const grocery = groceryId == 0
      ? this.state.groceryToAdd
      : this.state.groceries.find(g => g.id == groceryId)
  
    const newGrocery = groceryId == 0
      ? await groceryRepository.addNewGrocery(grocery)
      : await groceryRepository.updateGrocery(grocery)
    // TODO: замечательно, но логика и данные смешаны.

    if (groceryId == 0) {
      newGroceries.push(newGrocery)
    } else {
      const i = newGroceries.indexOf(grocery)
      newGroceries[i] = newGrocery
    }

    this.emit({
      ...this.state,
      groceries: newGroceries,
      currentlyEdited: null,
      groceryToAdd: null
    })
  }


  changeEditGrocery(groceryId) {
    console.log({mes: 'trying to changeEditGrocery', of: groceryId})
    this.emit({
      ...this.state,
      currentlyEdited: groceryId 
    })
  }


  changeGroceryName(groceryId, newName) {
    if (groceryId == 0) {
      this.state.groceryToAdd.name = newName
      return
    }
    this.state.groceries.find(g => g.id == groceryId).name = newName
  }


  get currentlyEdited() {
    return this.state.currentlyEdited
  }

}

module.exports = {
  GroceryListElementController
}