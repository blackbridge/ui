
export function displayTransition<T extends HTMLElement>(node: T, callback: (node: T, state: boolean) => any) {
	let willDisplay = false
	return (display: boolean) => {
		if (display) {
			node.style.display = 'block'
			node.getBoundingClientRect()
			callback(node, true)
		} else {
			callback(node, false)
			const onEnd = (event: TransitionEvent) => {
				(!willDisplay) && ((event.currentTarget as T).style.display = 'none')
			}
			node.addEventListener('transitionend', onEnd, { once: true })
		}
		willDisplay = display
	}
}


export function slideUpDown<T extends HTMLElement>(node: T, callback: (node: T, state: boolean) => any) {
	
	let willDisplay = false
	return (display: boolean) => {
		const style = getComputedStyle(node)
		const from = (style.display === 'none') ? '0px' : style.height
		if (display) {
			// measure natural height
			node.style.height = 'auto'
			node.style.display = ''
			const { height } = node.getBoundingClientRect()

			// setup transition starting point
			node.style.transition = ''
			node.style.height = from
			node.getBoundingClientRect()

			// transition height after sync read
			node.style.height = `${height}px`
			
			// trigger show transition
			callback(node, true)

			// remove height property after animation
			const onEnd = (event: TransitionEvent) => willDisplay && ((event.currentTarget as T).style.height = '')
			node.addEventListener('transitionend', onEnd, { once: true })

		} else {
			node.style.height = from
			node.getBoundingClientRect()
			node.style.height = '0px'

			// trigger hide transition
			callback(node, false)

			// hide after transitionend
			const onEnd = (event: TransitionEvent) => {
				const el = event.currentTarget as T
				if (!willDisplay) {
					el.style.display = 'none'
					el.style.height = ''
				}
			}
			node.addEventListener('transitionend', onEnd, { once: true })
		}
		willDisplay = display
	}
}


export type XYPos = {
	x: number,
	y: number
}

export type DragHandler<T extends HTMLElement> = (node: T, position: XYPos) => any

export function onDrag<T extends HTMLElement>(node: T, onMove: DragHandler<T>, onEnd: DragHandler<T>) {
	
	let x: number
	let y: number

	const start = (event: PointerEvent) => {
		// parts extracted from: https://www.redblobgames.com/making-of/draggable/
		if (
			(event.button !== 0) // left button only
			|| event.ctrlKey // ignore ctrl+click
		) return 

		const el = event.currentTarget as HTMLElement
		event.stopPropagation()
		el.setPointerCapture(event.pointerId)
		el.style.userSelect = 'none'

		const startX = event.pageX
		const startY = event.pageY

		const move = (event: PointerEvent) => {
			x = event.pageX - startX
			y = event.pageY - startY
			onMove(node, { x, y })
		}

		const end = () => {
			el.removeEventListener('pointermove', move)
			el.removeEventListener('pointerup', end)
			el.removeEventListener('pointercancel', end)
			el.style.userSelect = ''
			onEnd(node, { x, y })
		}

		el.addEventListener('pointermove', move)
		el.addEventListener('pointerup', end, { once: true })
		el.addEventListener('pointercancel', end, { once: true })
	}

	node.addEventListener('pointerdown', start)
	return () => node.removeEventListener('pointerdown', start)
}


export function onEscKey(callback: () => any) {
	const handler = (event: KeyboardEvent) => {
		if (event.key === 'Escape') callback()
	}
	window.addEventListener('keyup', handler)
	return () => window.removeEventListener('keyup', handler)
}