import { Fragment, createElement } from 'preact'
import type { FunctionComponent, JSX } from 'preact'

type LinkWrapProps = (JSX.IntrinsicElements['a']) & {
	as?: string | FunctionComponent<any>
}

export default function LinkWrap(props: LinkWrapProps) {
	const { 
		children, 
		as = Fragment,
		...attributes 
	} = props

	return (props.href !== undefined) 
		? <a {...attributes }>{children}</a>
		// @ts-ignore
		: createElement(as, attributes, children)
}