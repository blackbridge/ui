import './client.ts?client'
import './style.css'

type BurgerProps = {
	state?: 'open' | 'closed'
}

declare module 'preact' {
    namespace JSX {
        interface IntrinsicElements {
            'burger-nav': JSX.HTMLAttributes<HTMLElement> & {
			    state?: 'open' | 'closed'
			}
        }
    }
}

export default function Burger({ state = 'closed' }: BurgerProps) {
	return <burger-nav state={state}>
		<div class="burger-nav">
			<span></span>
			<span></span>
			<span></span>
		</div>
	</burger-nav>
}