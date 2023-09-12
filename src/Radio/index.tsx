import './style.css'
import type { JSX, ComponentChildren } from 'preact'
import classnames from 'classnames'

type RadioProps = {
	label?: ComponentChildren,
	size?: 'small'|'medium'|'large',
	fill?: Boolean,
	block?: Boolean,
	onChange?: (event: JSX.TargetedEvent<HTMLInputElement>, checked?: Boolean) => void
	class?: HTMLElement['className'],
	style?: string,
	children?: ComponentChildren
}


export default function Radio(props: RadioProps): JSX.Element {

	const { 
		label,
		size, 
		fill,
		block,
		onChange, 
		class: className,
		style,
		children,
		...attributes
	} = props

	return <>
		<label class="radio radio--large" style={style}>
			<input type="radio" {...attributes} />
			{label}
			{children}
		</label>		
	</>
}