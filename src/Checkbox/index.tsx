import './style.css'

import type { JSX, ComponentChildren } from 'preact'
import classnames from 'classnames'

type CheckboxProps = {
	label?: ComponentChildren,
	count?: ComponentChildren,
	size?: 'small'|'medium'|'large',
	fill?: Boolean,
	block?: Boolean,
	onChange?: (event: JSX.TargetedEvent<HTMLInputElement>, checked?: Boolean) => void
	class?: HTMLElement['className'],
	style?: string|HTMLLabelElement['style']
}


export default function Checkbox(props: CheckboxProps): JSX.Element {

	const { 
		label, 
		count, 
		size, 
		fill,
		block,
		onChange, 
		class: className,
		style,
		...attributes
	} = props

	const changeHandler: undefined|JSX.PointerEventHandler<HTMLInputElement> = onChange ? event => {
		if (!event.currentTarget) return
		onChange(event, event.currentTarget.checked)
	} : undefined
	
	const classes = classnames(
		'ui-checkbox',
		size === 'small' && 'ui-checkbox--small',
		size === 'medium' && 'ui-checkbox--medium',
		size === 'large' && 'ui-checkbox--large',
		fill && 'ui-checkbox--fill',
		block && 'ui-checkbox--block',
		className
	)

	return <>
		<label class={classes} {...{style}}>
			<input class="ui-checkbox__input" type="checkbox" checked onChange={changeHandler} {...attributes} /> 
			<span class="ui-checkbox__box">
				<Check class="ui-checkbox__check" />
			</span>
			<span class="ui-checkbox__label">{label}</span>
			{count && <span class="ui-checkbox__count">{count}</span>}	
			<span class="ui-checkbox__background"></span>
		</label>
	</>
}

type CheckProps = {
	/**
	 * A number between 0–1
	 * */
	width?: number,
	/**
	 * Make the checkbox edges rounded
	 * */
	round?: Boolean,
	class?:HTMLElement['className']
}

function Check({ width = 0.8, round = true, class:className }: CheckProps) {

	// max stroke width in svg is 2, so we multiply the input (clamped between 0–1)
	const strokeWidth = 2 * Math.max(Math.min(width, 1), 0)

	return <svg class={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path 
			d="M1 5.71698L4.13953 9L11 3" 
			stroke="black" 
			stroke-width={strokeWidth} 
			stroke-linecap={round && 'round' || undefined} 
			stroke-linejoin={round && 'round' || undefined}
		/>
	</svg>
}
