import './client.ts?client'
import './style.css'
import classnames from 'classnames'
import type { WithElementProps } from '../../types.tsx'

type BaseProps = {
	open?: boolean
	class?: HTMLElement['className'] 
}

type BurgerProps = WithElementProps<'button', BaseProps>

export default function Burger(props: BurgerProps) {

	const {
		open, 
		class: className, 
		...attributes
	} = props
	
	const classes = classnames('ui-burger', className)

	return <button is="burger-button" class={classes} open={open} {...attributes}>
		<div class="ui-burger__inner">
			<span class="ui-burger__top"></span>
			<span class="ui-burger__patty"></span>
			<span class="ui-burger__bottom"></span>
		</div>
	</button>
}