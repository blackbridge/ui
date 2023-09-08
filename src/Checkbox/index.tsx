
import classnames from 'classnames'

export default function Checkbox({ label, additional, onChange, large, larger, stack, button, ...props }) {

	const changeHandler = event => onChange && onChange(event, event.currentTarget.checked)
	
	const classes = classnames(
		'checkbox',
		large && 'checkbox--large',
		larger && 'checkbox--larger',
		stack && 'checkbox--stack',
		button && 'checkbox--button',
		props['class'],
		props['className'],
	)

	delete props['class']
	delete props['className']

	const additionalText = (typeof additional === 'number') ? additional.toString() : additional

	return <>
		<label class={classes}>
			<input type="checkbox" onChange={changeHandler} {...props} /> 
			<span class="checkbox__label">
				{label} 
				{additionalText && <span> {additionalText}</span>}
			</span>			
		</label>
	</>
}
