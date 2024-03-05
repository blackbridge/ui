import type { Signal } from '@preact/signals'
import { useSignalEffect, useSignal } from '@preact/signals'

export function useDisplayTransitionSignal<T extends HTMLElement>(
	node: Signal<T | null>, 
	userToggle: boolean | Signal<boolean> = false
) {

	const toggle = typeof userToggle === 'boolean' ? useSignal(userToggle) : userToggle
	const initial = toggle.peek()
	const visible = useSignal<boolean>(initial)

	useSignalEffect(() => {
		if (!node.value) return
		if (toggle.value) {
			// show
			node.value.style.display = ''
			node.value.getBoundingClientRect()
			// trigger show transition using visible signal
			visible.value = true
		} else {
			// trigger hide transition using visible signal
			visible.value = false
			// hide after transitionend
			const onEnd = (event: TransitionEvent) => !toggle.value && ((event.currentTarget as T).style.display = 'none')
			node.value.addEventListener('transitionend', onEnd, { once: true })
		}
	})
	return { visible, initial, toggle }
}


export function useDisplayTransitionHeightSignal<T extends HTMLElement>(
	node: Signal<T | null>, 
	userToggle: boolean | Signal<boolean> = false
) {

	const toggle = typeof userToggle === 'boolean' ? useSignal(userToggle) : userToggle
	const initial = toggle.peek()
	const visible = useSignal<boolean>(initial)

	useSignalEffect(() => {
		if (!node.value) return

		const style = getComputedStyle(node.value)
		const from = (style.display === 'none') ? '0px' : style.height

		if (toggle.value) {
			// measure natural height
			node.value.style.height = 'auto'
			node.value.style.display = ''
			const { height } = node.value.getBoundingClientRect()
			
			// setup transition starting point
			node.value.style.transition = ''
			node.value.style.height = from
			node.value.getBoundingClientRect()
			
			// transition height after sync read
			node.value.style.height = `${height}px`
			
			// trigger show transition using visible signal
			visible.value = true

			// remove height property after animation
			const onEnd = (event: TransitionEvent) => toggle.value && ((event.currentTarget as T).style.height = '')
			node.value.addEventListener('transitionend', onEnd, { once: true })
		
		} else {
			node.value.style.height = from
			node.value.getBoundingClientRect()
			node.value.style.height = '0px'

			// trigger hide transition using visible signal
			visible.value = false

			// hide after transitionend
			const onEnd = (event: TransitionEvent) => {
				const el = event.currentTarget as T
				if (!toggle.value) {
					el.style.display = 'none'
					el.style.height = ''
				}
			}
			node.value.addEventListener('transitionend', onEnd, { once: true })
		}
	})
	return { visible, initial, toggle }
}