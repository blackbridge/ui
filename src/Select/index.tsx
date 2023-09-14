import './style.css'

import type { JSX, ComponentChildren } from 'preact'
import classnames from 'classnames'


type SelectProps = {
	label?: ComponentChildren,
	name?: string,
	size?: 'small'|'medium'|'large',
	layout?: 'inline'|'stacked'|'block',
	class?: HTMLElement['className'],
	style?: string,
	children?: ComponentChildren
}

export default function Select(props: SelectProps): JSX.Element {

	const {
		label,
		name,
		size = 'medium',
		layout = 'stacked',
		class: className, 
		children,
		...attributes 
	} = props

	const classes = classnames(
		'ui-select',
		`ui-select--${size}`,
		`ui-select--${layout}`,
		className,
	)

	const attrs = { class: classes, ...attributes }

	return <>
		<div {...attrs}>
			<label class="ui-select__label" for={name}>{label}</label>
			<select class="ui-select__dropdown" name={name} id={name}>
				{children}
			</select>
		</div>
	</>
}