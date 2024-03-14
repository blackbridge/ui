
const buttons = [...document.querySelectorAll('.js-ui-site-header__mobile-toggle')]
const nav = document.querySelector('.js-ui-site-header__mobile-nav')

function customElementName(node: Element) {
	const tag = node.getAttribute('is') || node.tagName
	if (tag.includes('-')) return tag
	return ''
}

if (buttons.length && nav) {
	let isOpen = false
	const open = () => {
		isOpen = true
		nav.setAttribute('open', '')
		buttons.map(button => {
			if (customElementName(button) === 'burger-button') {
				button.setAttribute('open', '')
			}
		})
	}
	const close = () => {
		isOpen = false
		nav.removeAttribute('open')
		buttons.map(button => {
			if (customElementName(button) === 'burger-button') {
				button.removeAttribute('open')
			}
		})
	}
	// @ts-ignore
	nav.addEventListener('change', e => !e.detail && close())
	buttons.map(el => el.addEventListener('click', () => isOpen ? close() : open()))
}