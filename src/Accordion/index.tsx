import './style.css'

import type { WithElementProps } from '../types.tsx'
import type { JSX, ComponentChildren } from 'preact'

import { useComputed, useSignal } from '@preact/signals'
import { useDisplayTransitionSignal, useDisplayTransitionHeightSignal } from './../utility/useDisplayTransitionSignal.ts'
import { useSignalRef } from './../utility/useSignalRef.ts'


type AccordionItemProps = {
	title: string,
	content?: string,
	children?: ComponentChildren
}

type AccordionGroupProps = WithElementProps<'section', {
	items: Array<AccordionItemProps>
}>


export function AccordionGroup(props: AccordionGroupProps): JSX.Element {
	const { items, ...attributes } = props
	return <div class="accordion-group" {...attributes}>
		{items.map(item => <AccordionItem {...item} />)}
	</div>
}


export function AccordionItem(props: AccordionItemProps): JSX.Element {

	const toggle = useSignal<boolean>(false)
	const { ref, node } = useSignalRef()

	const { visible, initial } = useDisplayTransitionHeightSignal(node, toggle)
	const classes = useComputed(() => visible.value ? 'accordion accordion--open' : 'accordion')

	return <div class={classes}>
		<div class="accordion__title" onClick={() => toggle.value = !toggle.value}>
			{props.title}
		</div>
		<div ref={ref} class="accordion__content" style={initial ? '' : 'display:none'}>
			<div class="accordion__content__inner">{props.children || props.content}</div>
		</div>
	</div>
}

