import './style.css'
import '../../global/grid.less'
import '../utility.css'

import type { JSX, ComponentChildren } from "preact"
import classnames from 'classnames'
import type { WithElementProps } from '../../types.tsx'


type LinkArgs = {
	href: string 
}

type BaseProps = {
	class?: HTMLElement['className'],
	style?: string,
	image?: string,
	children?: ComponentChildren
}

type CardProps = WithElementProps<'div', BaseProps> | WithElementProps<'a', LinkArgs & BaseProps>


export default function Card(props: CardProps): JSX.Element {

	const {
		href,
		class: className, 
		children,
		image,
		...attributes
	} = props

	const classes = classnames(
		'ui-card',
		className,
	)

	const attrs = { class: classes, href, ...attributes }

	const content = <>
			<div class="ui-card__media">
				<img class="object-fit--absolute object-fit--cover" src={image} />
			</div>
			<div class="ui-card__content">
				{children}
			</div>
		</>
	
	return (href !== undefined) 
		? <a {...attrs as JSX.IntrinsicElements['a'] }>{content}</a>
		: <div {...attrs as JSX.IntrinsicElements['div'] }>{content}</div>
		
}
