import './style.css'

import type { JSX, ComponentChildren } from 'preact'
import classnames from 'classnames'


type TextProps = {
	label?: ComponentChildren,
	placeholder?: string,
	name?: string,
	size?: 'small'|'medium'|'large',
	layout?: 'inline'|'stacked'|'block',
	class?: HTMLElement['className'],
	style?: string,
}


export default function Radio(props: TextProps): JSX.Element {

	const { 
		label,
		placeholder,
		name,
		size = 'medium', 
		layout = 'stacked',
		class: className,
		style,
		...attributes
	} = props

	const classes = classnames(
		'ui-textinput',
		`ui-textinput--${size}`,
		`ui-textinput--${layout}`,
		className,
	)

	const attrs = { class: classes, ...attributes }

	return <>
		<div {...attrs}>
			{label && <label class="ui-textinput__label" for={name}>{label}</label>}
			<input class="ui-textinput__input" type="text" id={name} name={name} placeholder={placeholder}></input>
		</div>
	</>
}