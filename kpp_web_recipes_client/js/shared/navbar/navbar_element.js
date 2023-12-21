const mustache = require("mustache")

class Route {
  constructor(name, href) {
    this.name = name
    this.href = href
  }

  isCurrent() {
    return window.location.href.endsWith(this.href)
  }
}

class NavbarElement extends HTMLElement {
  constructor() {
    super()
  }

  routes = [
    new Route('Recipes', '/recipes'),
    new Route('Groceries', '/groceries'),
  ]

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
              <li><a href="{{href}}" class="{{#isCurrent}}current{{/isCurrent}}">{{name}}</a></li>
            {{/routes}}
          </ul>

        </div>
      </nav>
    `
    const rendered = mustache.render(template, {
      routes: this.routes,
    })
    this.innerHTML = rendered
  }
}

customElements.define('navbar-element', NavbarElement)