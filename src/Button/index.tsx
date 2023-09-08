import type { ComponentChildren, Component } from "preact"
import './style.css'
import classnames from 'classnames'

type ButtonProps = {
	href?: string,
	type?: 'fill'|'outline'|'text',
	size?: 'small'|'medium'|'large',
	iconLeft?: Component|string,
	iconRight?: Component|string,
	class?: string|{},
	children?: ComponentChildren
}


export default function Button(props: ButtonProps) {

	const { 
		href, 
		type = 'fill',
		size = 'medium',
		iconLeft,
		iconRight,
		class: className, 
		children,
		...attributes 
	} = props

	// set <a> or <button> tag based on href attribute
	const Tag = href !== undefined ? 'a' : 'button'

	const classes = classnames(
		'ui-button',
		type && `ui-button--${type}`,
		`ui-button--${size}`,
		className
	)

	return <Tag class={classes} href={href} {...attributes}>
		{iconLeft && <span class="ui-button__icon ui-button__icon--left">{iconLeft}</span>}
		{children}
		{iconRight && <span class="ui-button__icon ui-button__icon--left">{iconRight}</span>}
	</Tag>
}