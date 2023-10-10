import './style.css'

import type { WithElementProps } from '../types.tsx'
import type { JSX } from 'preact'
import type { Signal } from '@preact/signals'

import classnames from 'classnames'
import { useSignal, useSignalEffect } from '@preact/signals'
import { useDisplayTransitionSignal } from './../utility/useDisplayTransitionSignal.ts'
import { useSignalRef } from './../utility/useSignalRef.ts'
import { useDragSignal } from './../utility/useDragSignal.ts'
import { useEscKey } from './../utility/useEscKey.ts'


export function SwipePaneExample() {
	const toggle = useSignal<boolean>(false)
	return <>
		<button onClick={() => toggle.value = !toggle.value}>Toggle</button>
		<SwipePane toggle={toggle} position="left">
			Menu content
		</SwipePane>
	</>
}


type SwipePaneProps = WithElementProps<'div', {
	toggle: Signal<boolean>,
	onClose?: (event?: Event) => any,
	position?: 'left'|'right',
	class?: HTMLElement['className'],
}>

export function SwipePane(props: SwipePaneProps): JSX.Element {

	const { 
		toggle,
		onClose = () => {},
		position = 'left', 
		class: className, 
		children,
		...attributes 
	} = props

	const classes = classnames(
		'ui-swipepane',
		position && `ui-swipepane--${position}`,
		className,
	)

	const { ref, node } = useSignalRef()
	const { initialDisplay } = useDragToCloseSignal(node, toggle, { position })

	return <>
		<BackgroundPane toggle={toggle} onClick={() => toggle.value = false} />
		<div 
			ref={ref} 
			class={classes} 
			style={{ display: initialDisplay ? '' : 'none' }}
			{...attributes} 
		>{children}</div>
	</>
}


type BackgroundPaneProps = WithElementProps<'div', {
	toggle: Signal<boolean>
}>


export function BackgroundPane({ toggle, onClick }: BackgroundPaneProps): JSX.Element {

	const { ref, node } = useSignalRef()
	const { initialDisplay } = useDisplayTransitionSignal(node, toggle, ({ node, isOpen }) => {
		node.classList[isOpen ? 'add' : 'remove']('ui-swipepane__bg--open')
	})

	return <>
		<div 
			ref={ref} 
			onClick={onClick} 
			class="ui-swipepane__bg" 
			style={{ display: initialDisplay ? '' : 'none' }}
		/>
	</>
}


type DragToCloseOptions = {
	position?: string,
	limit?: number
}

export function useDragToCloseSignal<T extends HTMLElement>(
	node: Signal<T | null>, 
	toggle: Signal<boolean>, 
	options: DragToCloseOptions
) {

	const { 
		limit = 100, 
		position = 'left'
	} = options
	const isLeft = position === 'left'
	const open = '0px'
	const closed = isLeft ? '-100%' : '100%'
	const translateX = useSignal<string>(toggle.peek() ? open : closed)

	// toggle translateX value based on display transition signal
	const { initialDisplay } = useDisplayTransitionSignal(node, toggle, ({ isOpen }) => {
		translateX.value = isOpen ? open : closed
	})

	// update transform attr from various signal updates
	useSignalEffect(() => {
		if (node.value) node.value.style.transform = `translateX(${translateX.value})`
	})

	// esc key to close
	useEscKey(() => {
		if (toggle.value) toggle.value = false
	})

	// get x signal from drag hook
	const { x } = useDragSignal(node, function onEnd({ x }) {
		const dragLimit = x.value && (isLeft 
			? x.value < -limit 
			: x.value > limit
		)
		if (dragLimit) {
			toggle.value = false
		} else {
			translateX.value = '0px'
		}
	})

	// update translateX value based on drag, with limit
	useSignalEffect(() => {
		if (x.value) {
			const limit = Math[isLeft ? 'min' : 'max'](0, x.value)
			translateX.value = `${limit}px`
		}
	})

	return { translateX, initialDisplay }
}


