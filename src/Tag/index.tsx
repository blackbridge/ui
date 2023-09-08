
import classnames from 'classnames'

export default function Tag ({ title, white, teal, grey, small, smaller, selected, close, count, onClick }) {

	const classes = classnames(
		'button',
		'button--tag',
		small && 'button--small',
		smaller && 'button--smaller',
		white && 'button--white',
		teal && 'button--teal',
		grey && 'button--grey',
		selected && 'selected',
		close && 'close',
	)

	return <button type="button" class={classes} onClick={onClick}>
		{title}
		{count && <span>{count}</span>}
	</button>
}