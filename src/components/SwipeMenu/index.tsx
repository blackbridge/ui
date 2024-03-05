import './client.ts?client'
import './style.css'
import type { WithElementProps } from '../../types.tsx'

type BaseProps = {
	open?: boolean
	position?: 'left' | 'right'
}

declare module 'preact' {
    namespace JSX {
        interface IntrinsicElements {
            'swipe-menu': JSX.HTMLAttributes<HTMLElement> & BaseProps
        }
    }
}

type SwipeMenuProps = WithElementProps<'div', BaseProps>

export default function SwipeMenu({ open = false, position = 'left', children, ...props }: SwipeMenuProps) {
	return <swipe-menu open={open} position={position} {...props}>
		<div class="ui-swipe-menu__bg" role="presentation"></div>
		<div class="ui-swipe-menu__main">
			{children}
		</div>
	</swipe-menu>
} 