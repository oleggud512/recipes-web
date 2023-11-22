const Mustache = require("mustache")
const { groceryRepository } = require("../../domain/repositories/grocery_repository")


// задача Element - рендерить state из contorller. Котороый этот Element сам и 
// создаст... Это не хорошо. Как мне создавать 
/* eslint-disable */
class GroceryElement extends HTMLElement {
  /**
   * @type {GroceryListElement}
   */
  _listElement
  _grocery

  constructor() {
    super()
    // this.attachShadow({ mode: "open" })
  }
  // TODO: TEMPORARY!!! make it pass GroceryListElementCONTROLLER to GroceryElementCONTROLLER
  /**
   * @param {{grocery: any, listElement: GroceryListElement}}
   */
  init({ grocery, listElement }) {
    this._grocery = grocery
    this._listElement = listElement
    // console.log(`grocery with id ${grocery.id} initialized`)
  }


  _onEdit() {
    // controller.edit()
    this._listElement.currentlyEdited = this._grocery.id
    this.render()
  }

  async _onDelete() {
    // await controller.deleteThisGrocery()
    // this.selfDelete()
    await this._listElement.deleteGroceryElement(this._grocery.id)
  }

  async _onSave() {
    // await controller.save()
    // this.render()
    const updatedGrocery = this._grocery.id == 0 
      ? await groceryRepository.addNewGrocery(this._grocery) 
      : await groceryRepository.updateGrocery(this._grocery)
    
    // TODO: херня какя-то... из child передавать новое значение child в parent...
    this._listElement.grocerySaved(this._grocery.id, updatedGrocery)
    this._grocery = updatedGrocery
    this.render()
  }

  _onNameChanged(newName) {
    this._grocery.name = newName
  }

  connectedCallback() {
    // console.log(`grocery with id ${this._grocery.id} connected`)
    this.render()
  }

  render() {
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
      grocery: this._grocery,
      isEdit: this._listElement.currentlyEdited == this._grocery.id
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

// customElements.define('grocery-item', GroceryElement)