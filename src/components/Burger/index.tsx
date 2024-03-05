import './client.ts?client'
import './style.css'
import type { WithElementProps } from '../../types.tsx'

type BaseProps = {
	open?: boolean
	class?: HTMLElement['className'] 
}

declare module 'preact' {
    namespace JSX {
        interface IntrinsicElements {
            'burger-button': JSX.HTMLAttributes<HTMLDivElement> & BaseProps
        }
    }
}

type BurgerProps = WithElementProps<'div', BaseProps>

export default function Burger({ open, ...props }: BurgerProps) {
	return <burger-button open={open} {...props}>
		<div class="ui-burger">
			<span class="ui-burger__top"></span>
			<span class="ui-burger__patty"></span>
			<span class="ui-burger__bottom"></span>
		</div>
	</burger-button>
}