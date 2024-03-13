// TODO: is this component necessary?


import type { JSX, AnyComponent, ComponentChildren } from "preact"
import './style.css'
import classnames from 'classnames'

type SocialProps = {
	icon?: AnyComponent<any, any>|string,
	class?: HTMLElement['className'],
	style?: string,
	children?: ComponentChildren
}

export default function SocialIcon(props: SocialProps): JSX.Element {
	
	const { 
		icon,
		class: className, 
		...attributes 
	} = props

	const classes = classnames(
		'ui-social-icon',
		className,
	)

	const attrs = { class: classes, ...attributes }

	return <>
		<a {...attrs}>
			<Any value={icon} />
		</a>
	</>

}

function Any({ value: Value }: {value: any}): JSX.Element {
	if (typeof Value === 'string') return <>{Value}</>
	return <Value />
}