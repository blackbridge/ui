customElements.define("video-embed", class extends HTMLElement {

	connectedCallback() {
		const main = this.querySelector('.ui-video-embed__inner') as HTMLDivElement
		const src = this.getAttribute('src')
		if (!src) return this.remove()
		const autoplay = this.getAttribute('autoplay') !== null
		Promise.any([
			youtubeEmbed(src, autoplay),
			vimeoEmbed(src, autoplay)
		])
		.then(oembed => oembed && this.renderVideo(main, oembed))
		.catch(() => this.remove())
	}

	renderVideo(el: HTMLDivElement, oembed:any) {
		el.innerHTML = oembed.html
		el.style.paddingBottom = `${oembed.height / oembed.width * 100 }%`
	}
})

function request(url: string) {
	return new Promise((resolve, reject) => {
		if (!url) return reject()
		const request = new XMLHttpRequest()
		request.addEventListener('readystatechange', event => {
			if (request.readyState !== 4) return
		    if (request.status == 200) return resolve(JSON.parse(request.responseText))
			return reject()
		})
	    request.open("GET", url, true)
	    request.send(null)
	})
}

function youtubeEmbed(url: string, autoplay: boolean): Promise<unknown> {
	if (!url.match(/youtube/i)) return Promise.reject()
	const oembed = 'https://www.youtube.com/oembed?url=' + encodeURIComponent(url)
	return request(oembed).then((o: any) => {
		o.html = o.html.replace('www.youtube.com', 'www.youtube-nocookie.com')
		if (autoplay) {
			o.html = o.html.replace('?feature=oembed', '?autoplay=1')
		}
		return o
	})
}

function vimeoEmbed(url: string, autoplay: boolean): Promise<unknown> {
	if (!url.match(/vimeo/i)) return Promise.reject()
	const oembed = 'https://vimeo.com/api/oembed.json?url=' + encodeURIComponent(url)
	return request(oembed).then((o:any) => {
		o.html = o.html.replace(
			/src="([^\"]+)"/, 
			`src="$1&dnt=1&byline=0&portrait=0&title=0&pip=0&transcript=0${ autoplay ? '&autoplay=1' : ''}"`
		)
		return o
	})
}
