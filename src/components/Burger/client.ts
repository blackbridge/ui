
customElements.define('burger-nav', class BurgerNav extends HTMLElement {
	static observedAttributes = ["state"]
	main: HTMLDivElement | null
	constructor() {
		super()
		this.main = this.querySelector('.burger-nav')
	}
	attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
		if (this.main && name === 'state') {
			this.main.classList[newValue === 'open' ? 'add' : 'remove']('open')
		}
	}
})