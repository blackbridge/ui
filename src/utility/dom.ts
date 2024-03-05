
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