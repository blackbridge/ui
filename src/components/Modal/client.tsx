

function initModal(el: Element) {
	const close = el.querySelector('.ui-modal__close') as HTMLButtonElement
	close.addEventListener('click', () => {
		el.removeAttribute('open')
	})
}

[...document.querySelectorAll('.ui-modal')].map(el => initModal(el))