import './style.css'
import './../../styles/utility.less'
import type { WithElementProps } from '../../types.tsx'
import type { JSX, ComponentChildren } from 'preact'
import classnames from 'classnames'

type RadioProps = WithElementProps<'input', {
	label?: ComponentChildren,
	size?: 'small'|'medium'|'large',
	fill?: boolean,
	block?: boolean,
	onChange?: (event: JSX.TargetedEvent<HTMLInputElement>, checked?: boolean) => void
	class?: HTMLElement['className'],
	style?: string,
	children?: ComponentChildren
}>


export default function Radio(props: RadioProps): JSX.Element {

	const { 
		label,
		size = 'medium', 
		fill,
		block,
		onChange, 
		class: className,
		style,
		children,
		...attributes
	} = props

	const classes = classnames(
		'ui-radio',
		block && 'ui-radio--block',
		fill && 'ui-radio--fill',
		size && `ui-radio--${size}`,
		className
	)

	return <>
		<label class={classes} style={style}>
			<div class="ui-radio__inner">
				<input type="radio" class="ui-radio__input" {...attributes} />
				<span class="ui-radio__label">{label}</span>
			</div>
			{children && <div class="ui-radio__children">
				<div class="ui-radio__children__inner first-last">{children}</div>
			</div>}
		</label>
	</>
}