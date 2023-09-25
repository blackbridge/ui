import './style.css'

import type { JSX, ComponentChildren } from 'preact'
import classnames from 'classnames'


type TextProps = {
	label?: ComponentChildren,
	placeholder?: string,
	size?: 'small'|'medium'|'large',
	class?: HTMLElement['className'],
	style?: string,
}


export default function TextArea(props: TextProps): JSX.Element {

	const { 
		label,
		placeholder,
		size = 'medium', 
		class: className,
		style,
		...attributes
	} = props

	const classes = classnames(
		'ui-textarea',
		`ui-textarea--${size}`,
		className,
	)

	const attrs = { class: classes, ...attributes }

	return <>
		<label {...attrs}>
			{label && <span class="ui-textarea__label">{label}</span>}
			<textarea class="ui-textarea__input" placeholder={placeholder}></textarea>
		</label>
	</>
}