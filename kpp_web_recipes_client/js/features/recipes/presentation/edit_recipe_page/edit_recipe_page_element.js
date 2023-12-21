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
        <h4>Name</h4>
        <input type="text" id="nameInput" class="text-field">
        
        <h4>Description</h4>
        <div contenteditable id="descriptionInput" class="text-field"></div>
        
        <h4>Image</h4>
        <div id="imageContainer">
          <img id="image" class="recipe-image">
          <input type="file" id="imageInput" accept="image/*">
          <button id="deleteImageBtn">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>

          <h4>Recipe</h4>
          <div contenteditable id="recipeInput" class="text-field"></div>

        <div class="dual-groceries">
          <div id="availableGroceries">
            <h4>Available groceries</h4>
            <div id="allGroceries"></div>
          </div>
          <div id="recipeGroceries">
            <h4>Recipe groceries</h4>
            <div id="groceryList"></div>
          </div>
        </div>

        <div class="save-delete">
          <button id="deleteBtn" class="delete">Delete</button>
          <button id="saveBtn">Save</button>
        </div>

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
      this.$image.src = state.recipe?.photoUrl ?? Constants.recipePlaceholder
    }

    // initialize grocery list
    if (this.$groceryList.childElementCount == 0 && 
      state.recipe?.groceries != null
    ) {
      const rendered = mustache.render(groceryListTemplate, {
        groceries: state.recipe.groceries,
        photo: () => Constants.orGroceryPlaceholder(this.photoUrl)
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
        
        const renderedGrocery = mustache.render(Templates.groceryAmountEdit, {
          ...groceryToAdd,
          photo: () => Constants.orGroceryPlaceholder(this.photoUrl)
        })
  
        this.$groceryList.insertAdjacentHTML('beforeEnd', renderedGrocery)
        const groceryElement = this.$groceryList.querySelector(`#grocery_${groceryToAdd.id}`)
        this.setupGroceryListeners(groceryElement, groceryToAdd)
        this.scrollToGroceryElement(groceryElement)

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

  scrollToGroceryElement(element) {
    this.mainTopPosition ??= document.body.querySelector('main').getBoundingClientRect().top
    if (element.getBoundingClientRect().bottom < this.mainTopPosition) {
      element.scrollIntoView({
        behavior: "smooth"
      })
    }
  }
}

customElements.define('edit-recipe-page-element', EditRecipePageElement)