import './style.css'
import '../utility.css'

import type { JSX, ComponentChildren } from "preact"
import classnames from 'classnames'
import Container from '../Container/index.tsx'

type FullwidthFeatureProps = {
	class?: HTMLElement['className'],
	style?: string,
	image?: string,
	overlay?: boolean,
	children?: ComponentChildren
}

export default function FullwidthFeature(props: FullwidthFeatureProps): JSX.Element {

	const {
		class: className, 
		children,
		image,
		overlay = false,
		...attributes
	} = props

	const classes = classnames(
		'ui-fullwidth-feature',
		className,
	)

	const attrs = { class: classes, ...attributes }

	return <>
			<div class={classes}>
				<div class="ui-fullwidth-feature__content">
					{children}
				</div>
				{overlay && <div class="ui-fullwidth-feature__overlay"></div>}
				<img class="ui-fullwidth-feature__media object-fit--absolute" src={image} />
			</div>
		</>
		
}
