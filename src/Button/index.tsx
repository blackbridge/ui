import type { JSX, AnyComponent, ComponentChildren } from "preact"
import './style.css'
import classnames from 'classnames'

type ButtonProps = {
	href?: string,
	type?: 'fill'|'outline'|'text',
	size?: 'small'|'medium'|'large',
	iconLeft?: AnyComponent<any>|string,
	iconRight?: AnyComponent<any>|string,
	block?: Boolean,
	class?: string|{},
	children?: ComponentChildren
}


function Any({ value: Value }: {value: any}): JSX.Element {
	if (typeof Value === 'string') return <>{Value}</>
	return <Value />
}


export default function Button(props: ButtonProps): JSX.Element {

	const { 
		href, 
		type = 'fill',
		size = 'medium',
		iconLeft,
		iconRight,
		block,
		class: className, 
		children,
		...attributes 
	} = props

	const classes = classnames(
		'ui-button',
		type && `ui-button--${type}`,
		`ui-button--${size}`,
		className,
		iconLeft && 'has-icon-left',
		iconRight && 'has-icon-right',
		block && 'ui-button--block',
	)

	const Tag = href !== undefined ? 'a' : 'button'

	return <Tag class={classes} href={href} {...attributes}>
		{iconLeft && <span class="ui-button__icon ui-button__icon--left"><Any value={iconLeft} /></span>}
		{children && <span class="ui-button__label">{children}</span>}
		{iconRight && <span class="ui-button__icon ui-button__icon--right"><Any value={iconRight} /></span>}
	</Tag>
}