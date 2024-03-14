import classnames from 'classnames'
import LinkWrap from '../LinkWrap/index.tsx'
import Container from '../Container/index.tsx'
import { imageAttributes } from '../../utility/image.ts'
import './style.less'

import type { ComponentChildren } from 'preact'
import type { Image } from '../../utility/image.ts'


type SiteFooterProps = {
	homeUrl?: string
	logo?: Image
	menu?: ComponentChildren
	bottom?: ComponentChildren
	class?: HTMLElement['className']
}

export default function SiteHeader(props: SiteFooterProps) {

	const { 
		homeUrl, 
		logo, 
		menu, 
		bottom,
		class: className,
		...attributes
	} = props

	const classes = classnames(
		'ui-footer',
		className
	)

	return <>
		<footer class={classes} {...attributes}>
			<Container size="large">
				<div class="grid flex-space-between margin-bottom">
					<div class="col-3@medium">
						<LinkWrap href={homeUrl}>
							{logo && <img {...imageAttributes(logo)} class="ui-footer__logo" />}
						</LinkWrap>
					</div>
					<div class="ui-footer__menus col-4@medium grid">
						{menu}
					</div>
				</div>
				<div class="ui-footer__info">
					{bottom}
				</div>
			</Container>
		</footer>
	</>
}