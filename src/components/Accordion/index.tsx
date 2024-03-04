import './style.css'


import type { WithElementProps } from '../../types.tsx'
import type { JSX, ComponentChildren } from 'preact'
import type { Signal } from '@preact/signals'

import { useComputed, useSignal } from '@preact/signals'
import { useDisplayTransitionHeightSignal } from '../../utility/useDisplayTransitionSignal.ts'
import { useSignalRef } from '../../utility/useSignalRef.ts'


type AccordionGroupProps = WithElementProps<'div', {
	items: Array<AccordionProps>,
	openFirst?: boolean,
	autoClose?: boolean
}>


export function AccordionGroup(props: AccordionGroupProps): JSX.Element {
	const { 
		items, 
		openFirst = false,
		autoClose = true,
		...attributes 
	} = props

	const withToggle = items.map((item, index) => {
		const initial = openFirst ? (index === 0 ? true : false) : false
		const _internalOnOpen = (): any => withToggle.map((item, i) => {
			if (i !== index) item.open.value = false
		})
		return {
			...item,
			open: useSignal<boolean>(initial),
			_internalOnOpen,
		}
	})

	return <div class="accordion-group" {...attributes}>
		{withToggle.map(item => <Accordion {...item} />)}
	</div>
}

type AccordionProps = WithElementProps<'div', {
	title: string,
	content?: string,
	open?: Signal<boolean> | boolean,
	onChange?: (open: boolean) => any,
	_internalOnOpen?: () => any,
	children?: ComponentChildren,
}>

export function Accordion(props: AccordionProps): JSX.Element {

	if (props.open === undefined) props.open = false
	const open = typeof props.open === 'boolean' ? useSignal<boolean>(props.open) : props.open
		
	const {
		title,
		children,
		content,
		onChange = () => {},
		_internalOnOpen = () => {}
	} = props

	const { ref, node } = useSignalRef()
	const { visible, initial } = useDisplayTransitionHeightSignal(node, open)
	const classes = useComputed(() => visible.value ? 'accordion accordion--open' : 'accordion')

	const onClick = () => {
		open.value = !open.value
		onChange(open.value)
		if (open.value) _internalOnOpen()
	}

	return <div class={classes}>
		<div class="accordion__button" onClick={onClick}>
			<div class="accordion__title">{title}</div>
			<div class="accordion__icon">
				<div class="accordion__icon__inner"></div>
			</div>
		</div>
		<div ref={ref} class="accordion__content" style={initial ? '' : 'display:none'}>
			<div class="accordion__content__inner">{content || children}</div>
		</div>
	</div>
}

