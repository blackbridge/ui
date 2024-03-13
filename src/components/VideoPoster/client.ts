
customElements.define("video-poster", class VideoPoster extends HTMLElement {
	connectedCallback() {
		let modal = this.querySelector('modal-dialog') as Element
		const triggers = [...this.querySelectorAll('.js-video-poster__open-modal')]
		if (!modal) return
		triggers.map(el => el.addEventListener('click', event => {
			event.preventDefault()
			modal.setAttribute('open', '')
		}))
	}
})