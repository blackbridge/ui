import './client.ts?client'
import './style.css'
import type { ComponentChildren } from 'preact'

type SwipeMenuProps = {
	open?: boolean,
	position?: 'left' | 'right',
	children?: ComponentChildren
}

declare module 'preact' {
    namespace JSX {
        interface IntrinsicElements {
            'swipe-menu': JSX.HTMLAttributes<HTMLElement> & {
			    open?: boolean,
			    position?: 'left' | 'right',
			}
        }
    }
}

export default function SwipeMenu({ open = false, position = 'left', children }: SwipeMenuProps) {
	return <swipe-menu open={open} position={position}>
		<div class="ui-swipe-menu__bg" role="presentation"></div>
		<div class="ui-swipe-menu__main">
			{children}
		</div>
	</swipe-menu>
} 