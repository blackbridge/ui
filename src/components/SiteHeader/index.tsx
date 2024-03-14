import LinkWrap from '../LinkWrap/index.tsx'
import Burger from '../Burger/index.tsx'
import SwipeMenu from '../SwipeMenu/index.tsx'
import classnames from 'classnames'
import { imageAttributes } from '../../utility/image.ts'
import './style.css'
import './client.tsx?client'

import type { ComponentChildren } from 'preact'
import type { Image } from '../../utility/image.ts'

type SiteHeaderProps = {
	homeUrl?: string
	logo?: Image
	nav?: ComponentChildren
	mobileNav?: ComponentChildren
	right?: ComponentChildren
	class?: HTMLElement['className']
}

export default function SiteHeader(props: SiteHeaderProps) {

	const { 
		homeUrl, 
		logo, 
		nav, 
		mobileNav, 
		right,
		class: className,
		...attributes
	} = props

	const classes = classnames(
		'ui-site-header',
		className
	)

	return <>
		<header class={classes} {...attributes}>
			<div class="ui-site-header__inner">
				<div class="ui-site-header__left">
					<LinkWrap class="ui-site-header__logo-link" href={homeUrl} as="div">
						{logo && <img {...imageAttributes(logo)} class="ui-site-header__logo-image" />}
					</LinkWrap>
				</div>
				<div class="ui-site-header__middle">
					{ nav }
				</div>
				<div class="ui-site-header__right">
					{ right }
					<Burger open={false} class="ui-site-header__mobile-toggle js-ui-site-header__mobile-toggle" />
				</div>
			</div>
		</header>
		<SwipeMenu open={false} position="right" class="ui-site-header__mobile-nav js-ui-site-header__mobile-nav">
			{ mobileNav }
		</SwipeMenu>
	</>
}