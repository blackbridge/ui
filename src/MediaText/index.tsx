import './style.css'
import '../grid/grid.css'
import '../utility.css'

import type { JSX, ComponentChildren } from "preact"
import classnames from 'classnames'

type MediaTextProps = {
	class?: HTMLElement['className'],
	style?: string,
	image?: string,
	imagePosition?: 'left'|'right',
	align?: 'start'|'center'|'end',
	children?: ComponentChildren
}

export default function MediaText(props: MediaTextProps): JSX.Element {

	const {
		class: className, 
		children,
		image,
		imagePosition = 'left',
		align = 'center',
		...attributes
	} = props

	const classes = classnames(
		'ui-mediatext grid',
		imagePosition && `ui-mediatext--${imagePosition}`,
		align && `flex-${align}`,
		className,
	)

	const attrs = { class: classes, ...attributes }

	return <>
			<div class={classes}>
				<div class="ui-mediatext__media">
					<img src={image} class="object-fit" />
				</div>
				<div class="ui-mediatext__content">
					<div class="ui-mediatext__content__inner">
						{children}
					</div>
				</div>
			</div>
		</>
		
}
