import './style.css'
import type { JSX } from 'preact'
import classnames from 'classnames'

type ContainerArgs = {
	size: 'small'|'medium'|'large',
	children?: JSX.Element|string|Array<JSX.Element|string>
}

export default function Container({ size, children }: ContainerArgs) {

	const classes = classnames(
		'ui-container',
		(size ? `ui-container--${size}` : null)
	)

	return <section class={classes}>
		{children}
	</section>
}
