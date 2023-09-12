import type { JSX, AnyComponent, ComponentChildren } from "preact"
import './style.css'
import classnames from 'classnames'

type ButtonProps = {
	href?: string,
	type?: 'fill'|'outline'|'text',
	size?: 'small'|'medium'|'large',
	icon: AnyComponent<any>|string,
	class?: string|{},
}


function Any({ value: Value }: {value: any}): JSX.Element {
	if (typeof Value === 'string') return <>{Value}</>
	return <Value />
}


export default function IconButton(props: ButtonProps): JSX.Element {

	const { 
		href, 
		type = 'fill',
		size = 'medium',
		icon,
		class: className, 
		...attributes 
	} = props

	const classes = classnames(
		'ui-button ui-button--icon',
		type && `ui-button--${type}`,
		`ui-button--${size}`,
		className,
	)

	const Tag = href !== undefined ? 'a' : 'button'

	return <Tag class={classes} href={href} {...attributes}>
		{icon && <span class="ui-button__icon"><Any value={icon} /></span>}
	</Tag>
}