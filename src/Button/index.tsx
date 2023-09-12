import type { JSX, AnyComponent, ComponentChildren } from "preact"
import './style.css'
import classnames from 'classnames'

type LinkProps = {
	href: string 
}

type BaseProps = {
	type?: 'fill'|'outline'|'text',
	size?: 'small'|'medium'|'large',
	iconLeft?: AnyComponent<any, any>|string,
	iconRight?: AnyComponent<any, any>|string,
	block?: Boolean,
	class?: HTMLElement['className'],
	style?: string,
	children?: ComponentChildren
}

type ButtonOrAnchor<TBaseProps> = (
	| (LinkProps & TBaseProps & Omit<JSX.IntrinsicElements['a'], 'className'>) 
	| (TBaseProps & Omit<JSX.IntrinsicElements['button'], 'className'|keyof TBaseProps>)
)

export function Button(props: ButtonOrAnchor<BaseProps>): JSX.Element {

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


type IconButtonBase = {
	type?: 'fill'|'outline'|'text',
	size?: 'small'|'medium'|'large',
	icon?: AnyComponent<any, any>|string,
	class?: string|{},
}

export function IconButton(props: ButtonOrAnchor<IconButtonBase>): JSX.Element {

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