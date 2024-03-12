import { onEscKey } from "../../utility/dom.ts"
customElements.define('modal-dialog', class Modal extends HTMLElement {
	static observedAttributes = ["open"]
	onEnd: () => any
	previousFocus?: Element | null = null
	main: HTMLElement

	constructor() {
		super()
		this.main = this.querySelector('.ui-modal__main') as HTMLDivElement
		const close = [...this.querySelectorAll('.js-ui-modal__close')]
		close.map(el => el.addEventListener('click', () => this.removeAttribute('open')))
		this.onEnd = onEscKey(() => this.removeAttribute('open'))
	}

	disconnectedCallback() {
		this.onEnd()
	}

	attributeChangedCallback(name: string, _: string, newValue: string) {
		if (!name) return
		const isOpen = newValue === ''

		document.documentElement.style.overflow = isOpen ? 'hidden' : ''
		
		if (isOpen) {
			this.setAttribute('tabindex', '0')
			this.previousFocus = document.activeElement
			this.main.focus()
		} else {
			this.setAttribute('tabindex', '-1')
			;(this.previousFocus as HTMLElement)?.focus()
		}

    	this.dispatchEvent(new CustomEvent('change', { 
			bubbles: true, detail: isOpen,
    	}))
	}
})