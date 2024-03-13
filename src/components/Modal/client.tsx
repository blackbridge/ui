import { onEscKey } from "../../utility/dom.ts"

customElements.define('modal-dialog', class Modal extends HTMLElement {
	
	static observedAttributes = ["open"]
	previousFocus?: Element | null = null
	onEnd: (() => any) | null = null
	template: HTMLTemplateElement | null = null
	main: HTMLDivElement | null = null

	connectedCallback() {
		this.template = this.querySelector('template') as HTMLTemplateElement
	}

	setupModal() {
		if (!this.template) return
		this.appendChild(this.template.content.cloneNode(true))

		this.main = this.querySelector('.ui-modal__main') as HTMLDivElement
		this.onEnd = onEscKey(() => this.removeAttribute('open'))

		const triggers = [...this.querySelectorAll('.js-ui-modal__close')]
		triggers.map(el => el.addEventListener('click', () => this.removeAttribute('open')))
	}

	destroyModal() {
		this.onEnd?.()
		while (this.lastElementChild && this.lastElementChild?.tagName !== 'TEMPLATE') {
			this.removeChild(this.lastElementChild)
		}
	}

	attributeChangedCallback(name: string, _: string, newValue: string) {
		if (!name) return
		const isOpen = newValue === ''

		if (isOpen) {
			this.setAttribute('tabindex', '0')
			this.previousFocus = document.activeElement
			this.setupModal()
			this.main?.focus()
		} else {
			this.removeAttribute('tabindex')
			;(this.previousFocus as HTMLElement)?.focus()
			this.destroyModal()
		}

		// disallow scrolling in window when modal is open
		document.documentElement.style.overflow = isOpen ? 'hidden' : ''

		// send open/close event to other components
    	this.dispatchEvent(new CustomEvent('change', { 
			bubbles: true, detail: isOpen,
    	}))	
	}
})