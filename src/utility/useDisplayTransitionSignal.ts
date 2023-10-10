import type { Signal } from '@preact/signals'
import { useSignalEffect } from '@preact/signals'

export function useDisplayTransitionSignal<T extends HTMLElement>(
	node: Signal<T | null>, 
	toggle: Signal<boolean>, 
	trigger: (props: {node: T, isOpen: boolean }) => any
) {
	useSignalEffect(() => {
		if (!node.value) return
		if (toggle.value) {
			// show
			node.value.style.display = ''
			node.value.getBoundingClientRect()
			// trigger transition in user callback
			trigger({ node: node.value, isOpen: true })
		} else {
			// trigger transition in user callback
			trigger({ node: node.value, isOpen: false })
			// setup hide after transitionend
			const onEnd = (event: TransitionEvent) => 
				!toggle.value && ((event.currentTarget as T).style.display = 'none')
			node.value.addEventListener('transitionend', onEnd, { once: true })
		}
	})
	return { initialDisplay: toggle.peek() }
}