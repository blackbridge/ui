import './style.css'
import type { WithElementProps } from '../types.tsx'
import type { JSX, ComponentChildren } from 'preact'
import classnames from 'classnames'

type CheckboxProps = WithElementProps<'input', {
	label?: ComponentChildren,
	count?: ComponentChildren,
	size?: 'small'|'medium'|'large',
	fill?: Boolean,
	block?: Boolean,
	onChange?: (event: JSX.TargetedEvent<HTMLInputElement>, checked?: Boolean) => void
}>

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
		size && `ui-checkbox--${size}`,
		fill && 'ui-checkbox--fill',
		block && 'ui-checkbox--block',
		className
	)

	return <>
		<label class={classes} style={style}>
			<input class="ui-checkbox__input" type="checkbox" onChange={changeHandler} {...attributes} /> 
			<span class="ui-checkbox__box">
				<Check class="ui-checkbox__check" />
			</span>
			<span class="ui-checkbox__label">{label}</span>
			{count && <span class="ui-checkbox__count">{count}</span>}
		</label>
	</>
}

type CheckProps = WithElementProps<'svg', {
	/**
	 * Make the checkbox edges rounded
	 * */
	round?: Boolean,
	class?: HTMLElement['className']
}>

function Check({ round = true, class:className, ...attributes }: CheckProps) {
	return <svg class={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...attributes}>
		<path 
			d="M1 5.71698L4.13953 9L11 3" 
			stroke="black" 
			stroke-width="1.6"
			stroke-linecap={round && 'round' || undefined} 
			stroke-linejoin={round && 'round' || undefined}
		/>
	</svg>
}
