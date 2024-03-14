import './style.css'
import '../../styles/utility.less'

import type { JSX, ComponentChildren } from "preact"
import classnames from 'classnames'

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

	return <>
			<div class={classes} {...attributes}>
				<img class="ui-fullwidth-feature__media object-fit--absolute object-fit--cover" src={image} />
				{overlay && <div class="ui-fullwidth-feature__overlay"></div>}
				<div class="ui-fullwidth-feature__content">
					{children}
				</div>
			</div>
		</>
		
}
