import './style.css'
import '../grid/grid.css'
import '../utility.css'

import type { JSX, ComponentChildren } from "preact"
import classnames from 'classnames'
import ImageLoad from '../ImageLoad/index.tsx'

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
		'ui-mediatext grid grid--gutter',
		imagePosition && `ui-mediatext--${imagePosition}`,
		align && `flex-${align}`,
		className,
	)

	const attrs = { class: classes, ...attributes }

	return <>
			<div class={classes}>
				<ImageLoad class="ui-mediatext__media col-6" src={image} />
				<div class="ui-mediatext__content  col-6">
					{children}
				</div>
			</div>
		</>
		
}
