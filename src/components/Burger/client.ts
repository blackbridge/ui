
customElements.define('burger-button', class BurgerButton extends HTMLElement {
	static observedAttributes = ["open"]
	attributeChangedCallback(name: string, _: string, newValue: string) {
		if (!name) return
		const isOpen = newValue === ''
    	this.dispatchEvent(new CustomEvent('change', { 
			bubbles: true, detail: isOpen,
    	}))
	}
})