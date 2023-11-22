class GroceryListElementState {
  /**
   * @type {Grocery[]}
   */
  groceries
  query
  currentlyEdited
  /**
   * @type {Grocery}
   */
  groceryToAdd

  constructor(
    groceries = [],
    query = String(''),
    currentlyEdited = Number(null),
    groceryToAdd = null
  ) {
    this.groceries = groceries,
    this.query = query,
    this.currentlyEdited = currentlyEdited,
    this.groceryToAdd = groceryToAdd
  }
}

// const initState = {
//   groceries: [],
//   query: '',
//   currentlyEdited: Number(null),
//   groceryToAdd: null
// }



module.exports = {
  GroceryListElementState
}