import './style.css'
import LinkWrap from '../LinkWrap/index.tsx'
import classnames from 'classnames'

import type { JSX, AnyComponent, ComponentChildren, FunctionComponent } from "preact"
import type { WithElementProps } from '../../types.tsx'

type LinkArgs = {
	href: string 
}

type BaseProps = {
	variant?: 'fill'|'outline'|'text'|'ghost',
	size?: 'small'|'medium'|'large',
	iconLeft?: AnyComponent<any, any>|string,
	iconRight?: AnyComponent<any, any>|string,
	block?: boolean,
	separator?: boolean,
	class?: HTMLElement['className'],
	style?: string,
	children?: ComponentChildren,
	as?: string | FunctionComponent<any>
}

type ButtonProps = WithElementProps<'button', BaseProps> | WithElementProps<'a', LinkArgs & BaseProps>

export function Button(props: ButtonProps): JSX.Element {

	const { 
		href, 
		variant = 'fill',
		size = 'medium',
		iconLeft,
		iconRight,
		block,
		separator,
		class: className, 
		children,
		as = 'button',
		...attributes 
	} = props

	const classes = classnames(
		'ui-button',
		`ui-button--${size}`,
		className,
		block && 'ui-button--block',
		variant && `ui-button--${variant}`,
		separator && 'ui-button--separator',
	)

	const attrs = { 
		class: classes, 
		href, 
		as,
		...attributes 
	}

	// @ts-ignore
	return <LinkWrap {...attrs}>
		{iconLeft && <span class="ui-button__icon ui-button__icon--left"><Any value={iconLeft} /></span>}
		{iconLeft && separator && <span class="ui-button__separator"></span>}
		{children && <span class="ui-button__label">{children}</span>}
		{iconRight && separator && <span class="ui-button__separator"></span>}
		{iconRight && <span class="ui-button__icon ui-button__icon--right"><Any value={iconRight} /></span>}
	</LinkWrap>
}

type IconButtonBase = {
	variant?: 'fill'|'outline'|'text'|'ghost',
	size?: 'small'|'medium'|'large',
	icon?: AnyComponent<any, any>|string,
	class?: HTMLElement['className'],
}

type IconButtonProps = WithElementProps<'button', IconButtonBase> | WithElementProps<'a', LinkArgs & IconButtonBase>

export function IconButton(props: IconButtonProps): JSX.Element {

	const { 
		href, 
		variant = 'fill',
		size = 'medium',
		icon,
		class: className, 
		as = 'button',
		...attributes 
	} = props

	const classes = classnames(
		'ui-button ui-button--icon',
		variant && `ui-button--${variant}`,
		`ui-button--${size}`,
		className,
	)

	const attrs = { 
		class: classes, 
		href,
		as,
		 ...attributes
	}

	// @ts-ignore
	return <LinkWrap {...attrs}>
		{icon && <span class="ui-button__icon"><Any value={icon} /></span>}
	</LinkWrap>
}

export default Button

function Any({ value: Value }: {value: any}): JSX.Element {
	if (typeof Value === 'string') return <>{Value}</>
	return <Value />
}