import './style.css'
import type { JSX, ComponentChildren } from 'preact'
import type { WithElementProps } from '../types.tsx'
import classnames from 'classnames'

type ContainerProps = WithElementProps<'section', {
	size?: 'small'|'medium'|'large',
	children?: ComponentChildren
}>

export default function Container(props: ContainerProps): JSX.Element {

	const { 
		size, 
		children,
		...attributes
	} = props

	const classes = classnames(
		'ui-container',
		(size ? `ui-container--${size}` : null)
	)

	return <section class={classes} {...attributes}>
		{children}
	</section>
}
