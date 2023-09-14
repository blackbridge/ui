import type { JSX, AnyComponent, ComponentChildren } from "preact"
import type { WithElementProps } from '../types.tsx'
import './style.css'
import classnames from 'classnames'


type LinkArgs = {
	href: string 
}

type ButtonArgs = {
	type?: 'fill'|'outline'|'text',
	size?: 'small'|'medium'|'large',
	iconLeft?: AnyComponent<any, any>|string,
	iconRight?: AnyComponent<any, any>|string,
	block?: boolean,
	class?: HTMLElement['className'],
	style?: string,
	children?: ComponentChildren
}

type ButtonProps = WithElementProps<'button', ButtonArgs> | WithElementProps<'a', LinkArgs & ButtonArgs>

export function Button(props: ButtonProps): JSX.Element {

	const { 
		href, 
		type = 'fill',
		size = 'medium',
		iconLeft,
		iconRight,
		block,
		class: className, 
		children,
		...attributes 
	} = props

	const classes = classnames(
		'ui-button',
		type && `ui-button--${type}`,
		`ui-button--${size}`,
		className,
		iconLeft && 'has-icon-left',
		iconRight && 'has-icon-right',
		block && 'ui-button--block',
	)

	const attrs = { class: classes, href, ...attributes }
	const content = <>
		{iconLeft && <span class="ui-button__icon ui-button__icon--left"><Any value={iconLeft} /></span>}
		{children && <span class="ui-button__label">{children}</span>}
		{iconRight && <span class="ui-button__icon ui-button__icon--right"><Any value={iconRight} /></span>}
	</>

	return (href !== undefined) 
		? <a {...attrs as JSX.IntrinsicElements['a'] }>{content}</a>
		: <button {...attrs as JSX.IntrinsicElements['button'] }>{content}</button>
}


type IconButtonArgs = {
	type?: 'fill'|'outline'|'text',
	size?: 'small'|'medium'|'large',
	icon?: AnyComponent<any, any>|string,
	class?: string|{},
}

type IconButtonProps = WithElementProps<'button', IconButtonArgs> | WithElementProps<'a', LinkArgs & IconButtonArgs>

export function IconButton(props: IconButtonProps): JSX.Element {

	const { 
		href, 
		type = 'fill',
		size = 'medium',
		icon,
		class: className, 
		...attributes 
	} = props

	const classes = classnames(
		'ui-button ui-button--icon',
		type && `ui-button--${type}`,
		`ui-button--${size}`,
		className,
	)

	const attrs = { class: classes, href, ...attributes }
	const content = <>
		{icon && <span class="ui-button__icon"><Any value={icon} /></span>}
	</>		
	return (href !== undefined) 
		? <a {...attrs as JSX.IntrinsicElements['a'] }>{content}</a>
		: <button {...attrs as JSX.IntrinsicElements['button'] }>{content}</button>
}


export default Button


function Any({ value: Value }: {value: any}): JSX.Element {
	if (typeof Value === 'string') return <>{Value}</>
	return <Value />
}