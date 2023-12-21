/* eslint-disable */
const { Constants } = require('../../../../../utils/utils')
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

  init({ 
    controller, 
    grocery, 
    isEdit, 
    isEditable=true 
  }) {
    this._controller = controller
    this.groceryId = grocery.id
    this.isEditable = isEditable
    this.render(grocery, isEdit)
  }

  async _changePhoto(newPhoto) {
    this._controller.changePhoto(this.groceryId, newPhoto)
  }

  async _deletePhoto() {
    this._controller.deletePhoto(this.groceryId)
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
        
        <div class="photo-container">
          <img src="{{photo}}" id="photo">
          {{#isEdit}}
            <button class="delete-photo-btn">
              <span class="material-symbols-outlined">
                close
              </span>
            </button>
          {{/isEdit}}
          <input type="file" class="image-input" accept="image/*">
        </div>

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
      isEdit: isEdit,
      photo: function () {
        return this.grocery.photoUrl ?? Constants.groceryPlaceholder
      }
    })

    this.innerHTML = rendered
    // console.log(`grocery with id ${this._grocery.id} rendered`)
    this.setupListeners()
  }

  
  setupListeners() {
    const $photo = this.querySelector("#photo")
    const $deletePhotoBtn = this.querySelector(".delete-photo-btn")
    const $imageInput = this.querySelector(".image-input")
    const $editBtn = this.querySelector(".edit-btn")
    const $deleteBtn = this.querySelector(".delete-btn")
    const $saveBtn = this.querySelector(".save-btn")
    const $nameInput = this.querySelector("input[name='name']")
    
    $photo?.addEventListener('click', () => {
      $imageInput.click()
    })
    $deletePhotoBtn?.addEventListener('click', () => {
      this._deletePhoto()
    })
    $imageInput?.addEventListener('change', (ev) => {
      if (!this._controller.currentlyEdited == this.groceryId) return;

      const fileInput = ev.target
      const file = fileInput.files[0]
      this._changePhoto(file)
    })

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