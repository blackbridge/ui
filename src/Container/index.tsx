import './style.css'
import type { JSX, ComponentChildren } from 'preact'
import classnames from 'classnames'

type ContainerArgs = {
	size?: 'small'|'medium'|'large',
	children?: ComponentChildren
}

export default function Container({ size = 'medium', children }: ContainerArgs) {

	const classes = classnames(
		'ui-container',
		(size ? `ui-container--${size}` : null)
	)

	return <section class={classes}>
		{children}
	</section>
}
