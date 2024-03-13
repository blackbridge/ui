import './style.css'
import HorizontalScroll from '../HorizontalScroll/index.tsx'
import type { JSX, ComponentChildren } from "preact"
import type { WithElementProps } from '../../types.tsx'
import classnames from 'classnames'


type BreadcrumbProps = {
	class?: HTMLElement['className'],
	style?: string,
	children?: ComponentChildren
}

export function Breadcrumbs(props: BreadcrumbProps): JSX.Element {

	const {
		class: className, 
		children,
		...attributes
	} = props

	const classes = classnames(
		'ui-breadcrumbs',
		className,
	)

	const attrs = { class: classes, ...attributes }

	return <>
			<nav aria-label="Breadcrumb" {...attrs}>
				<div class="ui-breadcrumbs__inner">
					<HorizontalScroll>
						{children}
					</HorizontalScroll>
				</div>
			</nav>
		</>
		
}


type LinkArgs = {
	href: string,
}

type BaseProps = {
	class?: HTMLElement['className'],
	style?: string,
	children?: ComponentChildren
}

type LinkProps = WithElementProps<'span', BaseProps> | WithElementProps<'a', LinkArgs & BaseProps>

export function BreadcrumbLink(props: LinkProps): JSX.Element {
	
	const {
		href,
		class: className, 
		children,
		...attributes
	} = props

	const classes = classnames(
		'ui-breadcrumbs__link',
		className,
	)

	const attrs = { class: classes, ...attributes }

	const link = (href !== undefined)
		? <a {...attrs as JSX.IntrinsicElements['a'] } href="#">{children}</a>
		: <span aria-current="page" {...attrs as JSX.IntrinsicElements['span'] }>{children}</span>

	return <>
		<div class="ui-breadcrumbs__item">{link}</div>
	</>

}