import './style.css'
import './client.tsx?client'
import { IconButton } from '../Button/index.tsx'
import { Close } from '../Icon/index.tsx'
import type { WithElementProps } from '../../types.tsx'

type BaseProps = {
	open?: boolean
	title?: string
	background?: boolean
}

declare module 'preact' {
    namespace JSX {
        interface IntrinsicElements {
            'modal-dialog': JSX.HTMLAttributes<HTMLElement> & BaseProps
        }
    }
}

type SwipeMenuProps = WithElementProps<'div', BaseProps>

export default function Modal({ title, open = false, background = true, children, ...props }: SwipeMenuProps) {
	return <dialog class="ui-modal" open={open} {...props}>
		{background && <div class="ui-modal__bg" role="presentation"></div>}
		{/* @ts-ignore */}
		<div class="ui-modal__main" tabindex={ open ? undefined : '0'}>
			<div className="ui-modal__header">
				<div class="ui-modal__title">{title}</div>
				<div className="ui-modal__actions">
					<IconButton class="ui-modal__close" icon={Close} variant="ghost" />
				</div>	
			</div>
			<div class="ui-modal__content first-last">
				{children}
			</div>
		</div>
	</dialog>
} 