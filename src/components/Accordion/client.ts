import { slideUpDown } from '../../utility/dom.ts'


class AccordionItem extends HTMLElement {

	static observedAttributes = ["open"]
	toggle: (display: boolean, withAnimation?: boolean) => void
	allowAnimation: boolean = true
	#button: HTMLButtonElement

	constructor() {
		super()
		const main = this.querySelector('.ui-accordion') as HTMLDivElement
		const button = this.querySelector('.ui-accordion__button') as HTMLButtonElement
		const content = this.querySelector('.ui-accordion__content') as HTMLDivElement
		
		const toggle = slideUpDown(content, (_node, state) => {
			main.classList[state ? 'add' : 'remove']('ui-accordion--open')
		})

		const toggleWithoutAnimation = (display: boolean) => {
			main.classList[display ? 'add' : 'remove']('ui-accordion--open')
			content.style.display = display ? '' : 'none'
		}

		this.toggle = (display: boolean, withAnimation: boolean = true) => {
			if (withAnimation) return toggle(display)
			return toggleWithoutAnimation(display)
		}

		button.addEventListener('click', () => {
			if (this.getAttribute('open') === '') {
				this.removeAttribute('open')
			} else {
				this.setAttribute('open', '')
			}
		})

		// hide the content immediately on load if it's not open
		if (this.getAttribute('open') === null) {
			toggleWithoutAnimation(false)
		}

		this.#button = button
	}

	// aria-expanded="${open ? 'true':'false'}" aria-controls="${id}"
	// aria-labelledby="${id}" class="${classes}" ${open ? '' : 'hidden'}

	open(withAnimation = true) {
    	this.#button.setAttribute('aria-expanded', 'true')
	}

	close(withAnimation = true) {
		this.#button.setAttribute('aria-expanded', 'false')
	}

	attributeChangedCallback(name: string, _: string, newValue: string) {
		if (name !== 'open') return
		const isOpen = newValue === ''

		// allow the accordion group to toggle the states without an animation
		this.toggle(isOpen, this.allowAnimation)

    	this.dispatchEvent(new CustomEvent('change', { 
			bubbles: true, detail: isOpen,
    	}))
	}
}

customElements.define('accordion-item', AccordionItem)


class AccordionGroup extends HTMLElement {
	#items: AccordionItem[]
	constructor() {
		super()
		this.#items = [
			...this.querySelectorAll(':scope > .ui-accordion-group > accordion-item')
		] as AccordionItem[]

		if (this.getAttribute('open-first') !== null) {
			this.#items.map((item, index) => {
				item.allowAnimation = false
				if (index === 0) {
					item.setAttribute('open', '')
				} else {
					item.removeAttribute('open')
				}
				item.allowAnimation = true
			})
		}
	}

	onChildOpen(event: Event) {
		// @ts-ignore
		if (!event.detail) return
		// @ts-ignore
		const child = event.target?.nodeName === 'ACCORDION-ITEM' && event.target
		if (!child) return
		event.stopPropagation()
		this.#items.map(el => {
			if (el !== child) el.removeAttribute('open')
		})
	}

	connectedCallback() {
		this.addEventListener('change', this.onChildOpen)
	}

	disconnectedCallback() {
		this.removeEventListener('change', this.onChildOpen)
	}
}

customElements.define('accordion-group', AccordionGroup)