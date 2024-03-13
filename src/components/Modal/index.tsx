import './style.css'
import './client.tsx?client'
import { IconButton } from '../Button/index.tsx'
import { Close } from '../Icon/index.tsx'
import classnames from 'classnames'

import type { WithElementProps } from '../../types.tsx'

type BaseProps = {
	open?: boolean
	title?: string
	background?: boolean
	class?: string
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

export function Modal(props: SwipeMenuProps) {

	const { 
		title, 
		open = false, 
		background = true,
		class: className, 
		children,
		...attributes
	} = props

	const classes = classnames('ui-modal', 'ui-modal-window', className)

	return <modal-dialog class={classes} open={open} {...attributes} aria-modal="true" tabindex={ open ? '0' : undefined}>
		<template>
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
		</template>
	</modal-dialog>
} 

export function VideoModal(props: SwipeMenuProps) {

	const { 
		title, 
		open = false, 
		background = true,
		class: className, 
		children,
		...attributes
	} = props

	const classes = classnames('ui-modal', 'ui-modal-floating', className)

	return <modal-dialog class={classes} open={open} {...attributes} aria-modal="true" tabindex={ open ? '0' : undefined}>
		<template>
			{background && <div class="ui-modal__bg js-ui-modal__close" role="presentation"></div>}
			<IconButton class="ui-modal-floating__close js-ui-modal__close" icon={Close} variant="ghost" />
			<div class="ui-modal__main ui-modal-floating__main">
				{children}
			</div>
		</template>
	</modal-dialog>
} 