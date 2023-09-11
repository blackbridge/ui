import './style.css'
import type { JSX, ComponentChildren } from 'preact'
import classnames from 'classnames'

type CheckboxProps = {
	label?: ComponentChildren,
	count?: ComponentChildren,
	size?: 'small'|'medium'|'large',
	block?: Boolean,
	onChange?: (event: JSX.TargetedEvent<HTMLInputElement>, checked?: Boolean) => void
	class?: string|{},
}


export default function Checkbox(props: CheckboxProps): JSX.Element {

	const { 
		label, 
		count, 
		size, 
		block,
		onChange, 
		class: className,
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
		block && 'ui-checkbox--block',
		className
	)

	return <>
		<label class={classes}>
			<input class="ui-checkbox__input" type="checkbox" onChange={changeHandler} {...attributes} /> 
			<span class="ui-checkbox__label">
				{label} 
				{count && <span class="ui-checkbox__count">{count}</span>}
			</span>			
		</label>
	</>
}