const mustache = require("mustache")
const { globalRouter } = require("../router/router")

class NavbarElement extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
  }

  render() {
    const template = `
      <nav class="navbar">
        <!-- LOGO -->
        <a class="logo" href="/recipes">Some Recipes</a>

        <div class="nav-links">

          <input type="checkbox" id="checkbox_toggle" />
          <label for="checkbox_toggle" class="hamburger">
            <span class="material-symbols-outlined">menu</span>
          </label>
          
          <ul class="menu">
            {{#routes}}
              <li><a href="{{href}}" class="{{#isCurrent}}current{{/isCurrent}}">{{displayName}}</a></li>
            {{/routes}}
          </ul>

        </div>
      </nav>
    `
    const rendered = mustache.render(template, {
      routes: globalRouter.navigation,
    })
    this.innerHTML = rendered
  }
}

customElements.define('navbar-element', NavbarElement)