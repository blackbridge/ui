const html = (x: string) => {
	const el = document.createElement('div')
	el.innerHTML = x.trim()
	return el.firstChild as Element
}

customElements.define("video-poster", class extends HTMLElement {
	connectedCallback() {
		let modal: HTMLDivElement
		const triggers = [...this.querySelectorAll('.js-video-poster__open-modal')]
		const template = this.querySelector('template')
		if (!template) return
		triggers.map(el => el.addEventListener('click', event => {
			event.preventDefault()
			if (!modal) {
				// @ts-ignore
				modal = this.appendChild(template.content.cloneNode(true).firstElementChild)
			}
			setTimeout(() => modal.setAttribute('open', ''), 100)
		}))
	}
})