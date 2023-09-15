import { useRef, useCallback, useState, useLayoutEffect } from 'preact/hooks'

export function useDisplayTransition<ElementType extends Element>(toggle: boolean) {

	const ref = useRef<ElementType>(null)
	const [display, setDisplay] = useState<boolean>(toggle)
	const [transition, setTransition] = useState<string|true|false>(false)
	const [state, setState] = useState<'in'|'out'|'animateIn'|'animateOut'>(toggle ? 'in' : 'out')

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
			setState('animateIn')
			ref.current?.getBoundingClientRect()
			ref.current?.addEventListener('transitionend', onEndAnimateIn)
			ref.current?.removeEventListener('transitionend', onEndAnimateOut)
			
		}

		// start animation out
		if (!toggle && display) {
			setTransition(false)
			setState('animateOut')
			ref.current?.addEventListener('transitionend', onEndAnimateOut)
			ref.current?.removeEventListener('transitionend', onEndAnimateIn)
			
		}

	}, [toggle, display])

	return [ref, display, transition, state] as const
}