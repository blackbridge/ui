import './style.css'
import type { WithElementProps } from '../types.tsx'
import type { JSX, RefObject } from 'preact'
import classnames from 'classnames'
import { useState, useRef, useEffect } from 'preact/hooks'
import { useDisplayTransition } from './../utility/useDisplayTransition.ts'


export default function(props: SwipePaneProps): JSX.Element {

	const [show, setShow] = useState(false)

	const { 
		position = 'left', 
		// class: className, 
		// ...attributes 
	} = props

	useEffect(() => {
		const escHandler = (event: KeyboardEvent) => (event.key === 'Escape') && setShow(false)
		window.addEventListener('keyup', escHandler)
		return () => window.removeEventListener('keyup', escHandler)
	})

	return <>
		<button onClick={() => setShow(show => !show)}>Toggle</button>
		<SwipePane open={show} position={position} onClose={() => setShow(false)} />
	</>
}


type SwipePaneProps = WithElementProps<'div', {
	open: boolean,
	onClose?: (event?: Event) => any,
	position?: 'left'|'right',
	class?: HTMLElement['className'],
}>


export function SwipePane(props: SwipePaneProps): JSX.Element {

	const { 
		open = false,
		onClose = () => {},
		position = 'left', 
		class: className, 
		...attributes 
	} = props

	const ref = useRef<HTMLDivElement>(null)
	const [_, display, transition] = useDisplayTransition<HTMLDivElement>(open, ref)

	const closedTransform = position === 'left' ? '-100%' : '100%'
	const dragTransform = useDragToClose(ref, {
		position, 
		onClose, 
		limit: 200 
	})

	const classes = classnames(
		'ui-swipepane',
		position && `ui-swipepane--${position}`,
		className,
	)

	const style = { 
		display: display ? '' : 'none',
		transform: transition 
			? `translateX(${dragTransform}px)` 
			: `translateX(${closedTransform})`
	}

	return <>
		<BackgroundPane open={open} onClick={onClose} />
		<div 
			ref={ref} 
			class={classes} 
			style={style} 
			{...attributes}
		>
			Menu
		</div>
	</>
}


type BackgroundPaneProps = WithElementProps<'div', {
	open: boolean
}>


export function BackgroundPane({ open, onClick }: BackgroundPaneProps): JSX.Element {

	const [ref, display, transition] = useDisplayTransition<HTMLDivElement>(open)
	const backgroundClasses = classnames(
		'ui-swipepane__bg',
		transition && 'ui-swipepane__bg--open',
	)
	return <>
		{display && <div ref={ref} onClick={onClick} class={backgroundClasses}></div>}
	</>
}


type DragOptions = {
	position: 'left'|'right',
	onClose: () => any,
	limit: number
}


function useDragToClose<T extends HTMLElement>(
		elRef: RefObject<T>, 
		{ 
			position = 'left', 
			onClose,
			limit = 200 
		}: DragOptions
	) {

	let [dragStart, setDragStart] = useState<number>(0)
	let [dragPosition, setDragPosition] = useState<number>(0)

	function start(event:MouseEvent) {
		if (
			event.buttons !== 1 ||
			event.metaKey ||
			event.altKey ||
			event.ctrlKey ||
			event.shiftKey
 		) return
		setDragStart(event.clientX)
	}

	let lastMove: MouseEvent|null = null
	function move(event:MouseEvent) {
		if (!dragStart) return
		if (!lastMove) (requestAnimationFrame || setTimeout)(update)
		lastMove = event
	}

	function update() {
		if (!lastMove || !dragStart) return
		const pos = lastMove.clientX - dragStart
		const constrainedPos = (position === 'left') ? Math.min(0, pos) : Math.max(0, pos)
		setDragPosition(constrainedPos)
		lastMove = null
	}

	function end() {
		if (!dragStart) return
		if (Math.abs(dragPosition || 0) > limit) onClose()
		const onEnd = () => {
			setDragStart(0)
			setDragPosition(0)
		}
		// make doubly sure we're ending…
		// (`move` was still being fired after `end`)
		onEnd()
		requestAnimationFrame(() => {
			onEnd()
			requestAnimationFrame(onEnd)
		})
	}

	// run effect on all updates and do DOM update directly
	useEffect(() => {
		elRef.current?.addEventListener('mousedown', start)
		window.addEventListener('mousemove', move)
		window.addEventListener('mouseup', end)
		return () => {
			elRef.current?.removeEventListener('mousedown', start)
			window.removeEventListener('mousemove', move)
			window.removeEventListener('mouseup', end)
		}
	}, [elRef, dragStart, dragPosition])

	return dragPosition
}