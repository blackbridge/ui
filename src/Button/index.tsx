import type { ComponentChildren } from "preact"
import './style.css'
import svg from './svg.svg'
import cx from 'classnames'

type ButtonProps = {
	href?: string,
	class?: string|{},
	children?: ComponentChildren
}

export function Button({ href, children, class: className, ...attributes }: ButtonProps) {
	const Tag = href !== undefined ? 'a' : 'button'

	const classes = cx(
		'button', className
	)

	return <Tag class={classes} href={href} {...attributes}>
		<img src={svg.src} />
		{children}
	</Tag>
}

