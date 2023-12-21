class FooterElement extends HTMLElement {

  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = `
      <footer>
        <span>
          <a href="/recipes">Recipes</a> &#124; <a href="/groceries">Groceries</a>
        </span>
        <hr>
        2023 КНТу-23-1 Гуд О. М. WEB-Т, КПП
      </footer>
    `
  }
}

customElements.define('footer-element', FooterElement)