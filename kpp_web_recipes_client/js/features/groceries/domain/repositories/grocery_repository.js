const { client } = require("./../../../../utils/client")

class GroceryRepository {
  client

  constructor() {
    this.client = client
  }
  
  async findAllGroceries(name = '') {
    const res = await client.get('grocery', {
      params: { name },
    })
    return res.data
  }

  async addNewGrocery(grocery) {
    const res = await client.post('grocery', grocery)
    console.log(`addNewGrocery(new id = ${res.data.id})`)
    return res.data
  }

  async deleteGrocery(id) {
    await client.delete(`grocery/${id}`)
  }

  async updateGrocery(grocery) {
    const res = await client.put(`grocery/${grocery.id}`, grocery)
    return res.data
  }
}

const groceryRepository = new GroceryRepository()

module.exports = { groceryRepository }
