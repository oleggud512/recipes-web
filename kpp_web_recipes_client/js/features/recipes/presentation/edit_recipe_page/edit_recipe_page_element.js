const mustache = require("mustache");
const { ObserverHTMLElement } = require("../../../../utils/observable");
const { EditRecipePageElementController } = require("./edit_recipe_page_element_controller");
const { Templates } = require("../../../../shared/templates/templates");
const { Constants } = require("../../../../utils/utils");

class EditRecipePageElement extends ObserverHTMLElement {

  constructor() {
    super(new EditRecipePageElementController())
  }


  onChangeName(newName) {
    this._observable.changeName(newName)
  }

  onChangeDescription(newDescription) {
    this._observable.changeDescription(newDescription)
  }

  onChangeRecipe(newRecipe) {
    this._observable.changeRecipe(newRecipe)
  }

  onChangeImage(newImage) {
    this._observable.changeImage(newImage)
  }

  onDeleteImage() {
    this._observable.deleteImage()
  }

  onAddGrocery(grocery) {
    this._observable.addGrocery(grocery)
  }

  onRemoveGrocery(grocery) {
    this._observable.removeGrocery(grocery)
  }

  onChangeAmount(groceryId, newAmount) {
    this._observable.changeAmount(groceryId, newAmount)
  }

  async save() {
    console.log('element.save()')
    await this._observable.save()
  }

  async delete() {
    console.log('element.delete()')
    if (confirm('Are you sure you want to delete this recipe?')) {
      await this._observable.delete()
    }
  }

  connectedCallback() {
    const template = `
      <div class="container">
        <div class="input-with-hint">
          <p>Name</p>
          <input type="text" id="nameInput" class="text-field">
        </div>
        
        <div class="input-with-hint">
          <p>Description</p>
          <div contenteditable id="descriptionInput" class="text-field"></div>
        </div>
        
        <div class="input-with-hint" id="imageContainer">
          <p>Image</p>
          <img id="image" class="recipe-image">
          <input type="file" id="imageInput" accept="image/*">
          <button id="deleteImageBtn">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>

        <div class="input-with-hint">
          <p>Recipe</p>
          <div contenteditable id="recipeInput" class="text-field"></div>
        </div>

        <p>Groceries</p>
        <div id="groceryList" class="item-grid-3"></div>

        <p>All groceries</p>
        <div id="allGroceries" class="item-grid-3"></div>

        <button id="saveBtn">Save</button>
        <button id="deleteBtn" class="delete">Delete</button>
      </div>
    `
    this.innerHTML = template

    this.$nameInput = this.querySelector('#nameInput')
    this.$descriptionInput = this.querySelector('#descriptionInput')
    this.$recipeInput = this.querySelector('#recipeInput')
    this.$imageInput = this.querySelector('#imageInput')

    this.$image = this.querySelector('#image')
    this.$deleteImageBtn = this.querySelector('#deleteImageBtn')
    
    this.$groceryList = this.querySelector('#groceryList')
    this.$allGroceries = this.querySelector('#allGroceries')

    this.$saveBtn = this.querySelector('#saveBtn')
    this.$deleteBtn = this.querySelector('#deleteBtn')


    this.$nameInput.addEventListener('input', ev => {
      this.onChangeName(ev.target.value)
    })
    this.$descriptionInput.addEventListener('input', ev => {
      this.onChangeDescription(ev.target.innerText)
    })
    this.$recipeInput.addEventListener('input', ev => {
      this.onChangeRecipe(ev.target.innerText)
    })
    this.$imageInput.addEventListener('change', ev => {
      const image = ev.target.files[0]
      console.log('change', image)
      this.onChangeImage(image)
    })
    this.$image.addEventListener('click', () => {
      this.$imageInput.click()
    })
    this.$deleteImageBtn.addEventListener('click', () => {
      this.onDeleteImage()
    })

    this.$saveBtn.addEventListener('click', () => {
      this.save()
    })
    this.$deleteBtn.addEventListener('click', () => {
      this.delete()
    })


    super.connectedCallback()
  }

  onStateChange(state) {
    this.render(state)
  }

  setupGroceryListeners($groceryElement, grocery) {
    const $removeBtn = $groceryElement.querySelector(`#remove_grocery_${grocery.id}_btn`)
    const $input = $groceryElement.querySelector(`#grocery_${grocery.id}_amount_input`)
    $removeBtn.addEventListener('click', () => {
      this.onRemoveGrocery(grocery)
    })
    $input.addEventListener('input', (ev) => {
      this.onChangeAmount(grocery.id, Number(ev.target.value))
    })
  }

  render(state) {
    const groceryListTemplate = `
      {{#groceries}}
        ${Templates.groceryAmountEdit}
      {{/groceries}}
    `
    console.log({mes: 'render(state)', state})

    // update fields
    this.$nameInput.value = state.recipe?.name ?? ''
    this.$descriptionInput.innerText = state.recipe?.description ?? ''
    this.$recipeInput.innerText = state.recipe?.recipe ?? ''
    if (this.$image.src != state.recipe?.photoUrl) {
      this.$image.src = state.recipe?.photoUrl ?? 'https://placehold.co/400x400/lightgrey/grey?text=No+image'
    }

    // initialize grocery list
    if (this.$groceryList.childElementCount == 0 && 
      state.recipe?.groceries != null
    ) {
      const rendered = mustache.render(groceryListTemplate, {
        groceries: state.recipe.groceries,
        photo: () => {
          return this.photoUrl ?? Constants.groceryPlaceholder
        }
      })

      this.$groceryList.innerHTML = rendered

      for (const grocery of state.recipe.groceries) {
        const $groceryElement = this.$groceryList.querySelector(`#grocery_${grocery.id}`)
        this.setupGroceryListeners($groceryElement, grocery)
      }
    }

    // initialize all groceries
    if (this.$allGroceries.childElementCount == 0 &&
      state.groceries != null
    ) {
      const allGroceriesTemplate = `
        {{#groceries}}
          ${Templates.groceryAdd}
        {{/groceries}}
      `

      const rendered = mustache.render(allGroceriesTemplate, {
        groceries: state.groceries,
        photo: () => {
          return this.photoUrl ?? Constants.groceryPlaceholder
        }
      })

      this.$allGroceries.innerHTML = rendered

      for (const grocery of state.groceries) {
        const $addBtn = this.$allGroceries.querySelector(`#add_grocery_${grocery.id}_btn`)
        $addBtn.addEventListener('click', () => {
          // TODO: probably this should not be here...
          if (this._observable.state.recipe.groceries.find(g => g.id == grocery.id)) {
            alert('This grocery is already in the list')
            return
          }
          this.onAddGrocery(grocery)
        })
      }
    }

    // update grocery list
    if (state.recipe?.groceries != null) {
      if (state.recipe.groceries.length > this.$groceryList.childElementCount) {
        // add grocery
        const groceryToAdd = state.recipe.groceries.find(
          g => this.$groceryList.querySelector(`#grocery_${g.id}`) == null)
        
        const renderedGrocery = mustache.render(Templates.groceryAmountEdit, groceryToAdd)
  
        this.$groceryList.insertAdjacentHTML('beforeEnd', renderedGrocery)
        const groceryElement = this.$groceryList.querySelector(`#grocery_${groceryToAdd.id}`)
        this.setupGroceryListeners(groceryElement, groceryToAdd)

      } else if (state.recipe.groceries.length < this.$groceryList.childElementCount) {
        // remove grocery
        const groceryElements = [...this.$groceryList.children]
        const elementToDelete = groceryElements.find(groceryElement => 
          state.recipe.groceries.find(grocery => 
              groceryElement.id == `grocery_${grocery.id}`) == null)

        this.$groceryList.removeChild(elementToDelete)
      }
    }

  }
}

customElements.define('edit-recipe-page-element', EditRecipePageElement)