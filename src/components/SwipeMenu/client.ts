import { displayTransition, onDrag, onEscKey } from '../../utility/dom.ts'
import type { XYPos } from '../../utility/dom.ts'


class SwipeMenu extends HTMLElement {

	static observedAttributes = ["open"]
	main: HTMLDivElement
	bg: HTMLDivElement
	displayMain: ReturnType<typeof displayTransition>
	displayBg: ReturnType<typeof displayTransition>
	removeDragListener: ReturnType<typeof onDrag>
	removeEscKeyListener: ReturnType<typeof onEscKey>
	previousFocus: null | Element = null

	constructor() {
		super()

		// get elements
		const component = this
		this.main = this.querySelector('.ui-swipe-menu__main') as HTMLDivElement
		this.bg = this.querySelector('.ui-swipe-menu__bg') as HTMLDivElement

		// setup display transition toggle
		this.displayMain = displayTransition(this.main, toggle)
		this.displayBg = displayTransition(this.bg, toggle)

		// setup drag
		const limit = 150
		const isLeft = this.getAttribute('position') === 'left'

		this.removeDragListener = onDrag(this.main, onMove, onEnd)

		// setup close events
		this.removeEscKeyListener = onEscKey(close)
		this.bg.addEventListener('click', () => close())
		
		// handlers
		function toggle(node: HTMLDivElement, state: boolean) {
			node.classList[state ? 'add' : 'remove']('open')
		}

		function onMove(node: HTMLDivElement, { x }: XYPos) {			
			const limit = Math[isLeft ? 'min' : 'max'](0, x)
			node.style.transform = `translateX(${limit}px)`
			node.style.transition = 'none'
		}

		function onEnd(node: HTMLDivElement, { x }: XYPos) {
			node.style.transition = ''
			const dragLimit = x && (isLeft 
				? x < -limit 
				: x > limit
			)
			if (dragLimit) {
				close()
				node.style.transform = ``
				
			} else {
				node.style.transform = ''
			}
		}

		// helpers
		function close() {
			component.removeAttribute('open')
		}
	}

	attributeChangedCallback(name: string, _: string, newValue: string) {
		if (name !== 'open') return
		const isOpen = newValue === ''
		
		// open or close panes
		this.displayMain(isOpen)
		this.displayBg(isOpen)

		// lock/unlock window scroll
		document.documentElement.style.overflow = isOpen ? 'hidden' : ''

		// save previous focus and go back to it on close
		if (isOpen) {
			this.setAttribute('tabindex', '0')
			this.previousFocus = document.activeElement
			this.focus()
		} else {
			this.setAttribute('tabindex', '-1')
			;(this.previousFocus as HTMLElement)?.focus()
		}

    	this.dispatchEvent(new CustomEvent('change', { 
			bubbles: true, detail: isOpen,
    	}))
	}

	disconnectedCallback() {
		this.removeDragListener()
		this.removeEscKeyListener()
	}
}

customElements.define('swipe-menu', SwipeMenu)