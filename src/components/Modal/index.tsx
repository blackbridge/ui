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
            'modal-dialog': JSX.HTMLAttributes<HTMLDivElement> & BaseProps & {
            	tabindex?: string
            }
        }
    }
}

type SwipeMenuProps = WithElementProps<'div', BaseProps>

export function Modal({ title, open = false, background = true, children, ...props }: SwipeMenuProps) {
	return <modal-dialog class="ui-modal ui-modal-window" open={open} {...props} aria-modal="true" tabindex={ open ? '0' : '-1'}>
		{background && <div class="ui-modal__bg js-ui-modal__close" role="presentation"></div>}
		<div class="ui-modal__main ui-modal-window__main">
			<div className="ui-modal-window__header">
				<div class="ui-modal-window__title">{title}</div>
				<div className="ui-modal-window__actions">
					<IconButton class="ui-modal-window__close js-ui-modal__close" icon={Close} variant="ghost" />
				</div>	
			</div>
			<div class="ui-modal-window__content first-last">
				{children}
			</div>
		</div>
	</modal-dialog>
} 

export function VideoModal({ title, open = false, background = true, children, ...props }: SwipeMenuProps) {
	return <modal-dialog class="ui-modal ui-modal-floating" open={open} {...props} aria-modal="true" tabindex={ open ? '0' : '-1'}>
		{background && <div class="ui-modal__bg js-ui-modal__close" role="presentation"></div>}
		<IconButton class="ui-modal-floating__close js-ui-modal__close" icon={Close} variant="ghost" />
		<div class="ui-modal__main ui-modal-floating__main">
			{children}
		</div>
	</modal-dialog>
} 