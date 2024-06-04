import './style.css'

import type { JSX, ComponentChildren } from "preact"
import type { WithElementProps } from '../../types.tsx'

type ButtonGroupProps = WithElementProps<'div', {
	class?: HTMLElement['className'],
	style?: string,
	children?: ComponentChildren
}>

export function ButtonGroup(props: ButtonGroupProps): JSX.Element {
	const { 
		children,
		...attributes 
	} = props

	return <div class="ui-button-group" {...attributes}>{children}</div>
}

export default ButtonGroup