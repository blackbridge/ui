import './style.less'
import '../../styles/grid.less'
import '../..//styles/utility.less'

import type { JSX, ComponentChildren } from "preact"
import classnames from 'classnames'

type MediaTextProps = {
	class?: HTMLElement['className'],
	style?: string,
	image?: string,
	imagePosition?: 'left'|'right',
	breakpoint?: 'small'|'medium'|'large'|'x-large',
	fullwidth?: boolean,
	gutter?: boolean,
	align?: 'start'|'center'|'end',
	children?: ComponentChildren
}

export default function MediaText(props: MediaTextProps): JSX.Element {

	const {
		class: className, 
		children,
		image,
		imagePosition = 'left',
		align,
		breakpoint = 'medium',
		gutter = false,
		fullwidth = false,
		//media width, content width
		...attributes
	} = props

	const classes = classnames(
		'ui-mediatext grid',
		align && `flex-${align}`,
		gutter && `grid--gutter`,
		fullwidth && `ui-mediatext--fullwidth`,
		imagePosition === 'right' && `ui-mediatext--flip row-reverse@${breakpoint}`,
		className,
	)

	const attrs = { class: classes, ...attributes }

	return <>
			<div class={classes}>
				<div class={`ui-mediatext__media col-6@${breakpoint}`}>
					<div className="ui-mediatext__media__inner relative">
						<img src={image} class="object-fit--absolute" />
					</div>
				</div>
				<div class={`ui-mediatext__content col-6@${breakpoint}`}>
					<div class="ui-mediatext__content__inner first-last">
						{children}
					</div>
				</div>
			</div>
		</>
		
}