import './style.css'
import type { WithElementProps } from '../types.tsx'
import classnames from 'classnames'
import { useState, useRef, useEffect } from 'preact/hooks'
import { useDisplayTransition } from './../utility/useDisplayTransition.ts'


type SwipePaneProps = WithElementProps<'div', {
	position?: 'left'|'right',
	class?: HTMLElement['className'],
}>


export default function SwipePane(props: SwipePaneProps) {

	const [show, setShow] = useState(false)
	const [ref, display, transition, state] = useDisplayTransition<HTMLDivElement>(show)

	console.log({ show, display, transition, state })

	const { 
		position = 'left', 
		class: className, 
		...attributes 
	} = props

	const classes = classnames(
		'ui-swipe',
		transition && `ui-swipe--animate`,
		state && `ui-swipe--${state}`,
		className,
	)

	return <>
		{display && <div ref={ref} class={classes} {...attributes}>Menu</div>}
		<button onClick={() => setShow(show => !show)}>Toggle</button>
	</>
}

