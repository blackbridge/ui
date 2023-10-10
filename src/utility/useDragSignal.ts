import { useEffect, useCallback } from 'preact/hooks'
import { useSignal } from '@preact/signals'
import type { Signal } from '@preact/signals'


export function useDragSignal<T extends HTMLElement>(node: Signal<T | null>, onEnd: (pos: {x: Signal<number|null>,y: Signal<number|null>}) => void) {

	const x = useSignal<number|null>(null)
	const y = useSignal<number|null>(null)

	const start = useCallback((e: PointerEvent) => {
		
		// parts extracted from: https://www.redblobgames.com/making-of/draggable/
		if (
			(e.button !== 0) // left button only
			|| e.ctrlKey // ignore ctrl+click
		) return 

		const el = e.currentTarget as HTMLElement
		e.stopPropagation()
		el.setPointerCapture(e.pointerId)
		el.style.userSelect = 'none'

		const startX = e.pageX
		const startY = e.pageY

		const move = (e: PointerEvent) => {
			x.value = e.pageX - startX
			y.value = e.pageY - startY
		}

		const end = () => {
			el.removeEventListener('pointermove', move)
			el.removeEventListener('pointerup', end)
			el.removeEventListener('pointercancel', end)
			el.style.userSelect = ''
			onEnd({ x, y })
		}

		el.addEventListener('pointermove', move)
		el.addEventListener('pointerup', end, { once: true })
		el.addEventListener('pointercancel', end, { once: true })
	}, [])

	useEffect(() => {
		node.value?.addEventListener('pointerdown', start)
		return () => node.value?.removeEventListener('pointerdown', start)
	})

	return { x, y }
}