/* eslint-disable */
const { GroceryListElementController } = require('../grocery_list_element/grocery_list_element_controller')
const Mustache = require('mustache')

class GroceryElement extends HTMLElement {  
  /**
   * @type {GroceryListElementController}
  */
  _controller
  groceryId

  constructor() {
    super()
  }

  init({ controller, grocery, isEdit }) {
    this._controller = controller
    this.groceryId = grocery.id
    this.render(grocery, isEdit)
  }
  
  async _onDelete() {
    await this._controller.deleteGrocery(this.groceryId)
  }
  
  async _onSave() {
    await this._controller.saveGrocery(this.groceryId)
  }
  
  _onEdit() {
    this._controller.changeEditGrocery(this.groceryId)
  }

  _onNameChanged(newName) {
    this._controller.changeGroceryName(this.groceryId, newName)
  }

  render(grocery, isEdit) {
    const template = `
      <div class="grocery-item" id="grocery_{{grocery.id}}">
        <img src="https://placeholder.com/100x100">
        <div class="grocery-item-content">
          {{#isEdit}}
            <input type="text" value="{{grocery.name}}" name="name">
          {{/isEdit}}
          {{^isEdit}}
            <span>{{grocery.name}}</span>
          {{/isEdit}}
          <div class="buttons">
            {{#isEdit}}
              <button class="save-btn">Save</button>
              <button class="delete-btn">Delete</button>
            {{/isEdit}}
            {{^isEdit}}
              <button class="edit-btn">Edit</button>
            {{/isEdit}}
          </div>
        </div>
      </div>
    `
    
    const rendered = Mustache.render(template, { 
      grocery: grocery, 
      isEdit: isEdit 
    })

    this.innerHTML = rendered
    // console.log(`grocery with id ${this._grocery.id} rendered`)
    this.setupListeners()
  }

  
  setupListeners() {
    const $editBtn = this.querySelector(".edit-btn")
    const $deleteBtn = this.querySelector(".delete-btn")
    const $saveBtn = this.querySelector(".save-btn")
    const $nameInput = this.querySelector("input[name='name']")
    
    $editBtn?.addEventListener('click', () => {
      console.log('editBtn')
      this._onEdit()
    })
    $deleteBtn?.addEventListener('click', () => {
      console.log('deleteBtn')
      this._onDelete()
    })
    $saveBtn?.addEventListener('click', () => {
      console.log('saveBtn')
      this._onSave()
    })
    $nameInput?.addEventListener('input', (ev) => {
      this._onNameChanged(ev.target.value)
    })
  }
}

customElements.define('grocery-item', GroceryElement)