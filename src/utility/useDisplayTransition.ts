import type { RefObject } from 'preact'
import { useRef, useCallback, useState, useLayoutEffect } from 'preact/hooks'

export function useDisplayTransition<ElementType extends Element>(toggle: boolean, elRef?: RefObject<ElementType>) {

	const ref = elRef || useRef<ElementType>(null)
	const [display, setDisplay] = useState<boolean>(toggle)
	const [transition, setTransition] = useState<string|true|false>(false)
	const [state, setState] = useState<'in'|'out'|'transitionIn'|'transitionOut'>(toggle ? 'in' : 'out')

	const onEndAnimateIn = useCallback(() => {
		setState('in')
	}, [])

	const onEndAnimateOut = useCallback(() => {
		setDisplay(false)
		setState('out')	
	}, [])

	useLayoutEffect(() => {

		// intent to show
		if (toggle && !display) {
			setDisplay(true)
		}

		// start animation in
		if (toggle && display && !transition) {
			setTransition(true)
			setState('transitionIn')
			ref.current?.getBoundingClientRect()
			ref.current?.addEventListener('transitionend', onEndAnimateIn)
			ref.current?.removeEventListener('transitionend', onEndAnimateOut)
			
		}

		// start animation out
		if (!toggle && display) {
			setTransition(false)
			setState('transitionOut')
			ref.current?.addEventListener('transitionend', onEndAnimateOut)
			ref.current?.removeEventListener('transitionend', onEndAnimateIn)
			
		}

	}, [toggle, display])

	return [ref, display, transition, state] as const
}