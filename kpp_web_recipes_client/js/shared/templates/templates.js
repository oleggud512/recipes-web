const { Constants } = require("../../utils/utils")

class Templates {
  static ifNull(variableName, valueIfNull) {
    return `{{#${variableName}}}{{${variableName}}}{{/${variableName}}}{{^${variableName}}}${valueIfNull}{{/${variableName}}}`
  }

  static groceryListItem = `
    <div class="grocery-item" id="grocery_{{id}}">
          
      <div class="photo-container">
        <img src="${this.ifNull('photoUrl', Constants.groceryPlaceholder)}" id="photo">
      </div>

      <div class="grocery-item-content">
        <span>{{name}}</span>
        <div class="buttons">
          <button class="edit-btn">Edit</button>
        </div>
      </div>
    </div>
  `

  static groceryListItemEdit = `
    <div class="grocery-item" id="grocery_{{grocery.id}}">
    
      <div class="photo-container">
        <img src="${this.ifNull('photoUrl', Constants.groceryPlaceholder)}" id="photo">
        <button class="delete-photo-btn">
          <span class="material-symbols-outlined">
            close
          </span>
        </button>
        <input type="file" class="image-input" accept="image/*">
      </div>

      <div class="grocery-item-content">
        <input type="text" value="{{grocery.name}}" name="name">
        <div class="buttons">
          <button class="save-btn">Save</button>
          <button class="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  `

  static groceryAdd = `
    <div class="grocery-item" id="grocery_{{id}}">
            
      <div class="photo-container">
        <img src="${this.ifNull('photoUrl', Constants.groceryPlaceholder)}" id="photo">
      </div>

      <div class="grocery-item-content">
        <span>{{name}}</span>
        <div class="buttons">
          <button id="add_grocery_{{id}}_btn">
            <span class="material-symbols-outlined">add</span>
          </button>
        </div>
      </div>
    </div>
  `

  static groceryAmountEdit = `
    <div class="grocery-item" id="grocery_{{id}}">
              
      <div class="photo-container">
        <img src="${this.ifNull('photoUrl', Constants.groceryPlaceholder)}" id="photo">
      </div>

      <div class="grocery-item-content">
        <span>{{name}}</span>
        <div class="buttons">
          <input id="grocery_{{id}}_amount_input" type="number" value="{{amount}}" class="text-field">
          <button id="remove_grocery_{{id}}_btn" class="delete">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
    </div>
  `

  static groceryAmount = `
    <div class="grocery-item" id="grocery_{{id}}">
              
      <div class="photo-container">
        <img src="${this.ifNull('photoUrl', Constants.groceryPlaceholder)}" id="photo">
      </div>

      <div class="grocery-item-content">
        <span>{{name}}</span>
        <div class="buttons">
          Amount: {{amount}} (g/l)
        </div>
      </div>
    </div>
  `

  static search = `
    <div class="search-contaner">
      <div class="search">
        <span class="material-symbols-outlined search-icon">search</span>
        <input type="text" id="searchInput" placeholder="Type to search">
        <span id="clearSearchBtn" class="material-symbols-outlined">cancel</span>
      </div>
    </div>
  `
}

module.exports = {
  Templates
}