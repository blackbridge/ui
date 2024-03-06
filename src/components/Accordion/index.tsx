import classnames from 'classnames'
import './client.ts?client'
import './style.css'
import { kebabCase } from '../../utility/string.ts'
import type { WithElementProps } from '../../types.tsx'

declare module 'preact' {
    namespace JSX {
        interface IntrinsicElements {
            'accordion-item': JSX.HTMLAttributes<HTMLDivElement> & {
            	open?: boolean
            },
            'accordion-group': JSX.HTMLAttributes<HTMLDivElement> & {
            	'open-first'?: boolean
            }
        }
    }
}

type AccordionItemProps = WithElementProps<'div', {
	title: string,
	open?: boolean
}>

export function AccordionItem(props: AccordionItemProps) {

	const { 
		title = '', 
		open = false, 
		class: className, 
		children, 
		...attributes 
	} = props

	const classes = classnames(
		'accordion', 
		// open by default until hydration
		'accordion--open',
		className
	)

	const id = kebabCase(title)

	return <accordion-item open={open} {...attributes}>
		<div class={classes}>
			<button type="button" class="accordion__button" aria-controls={id}>
				<div class="accordion__title">{title}</div>
				<div class="accordion__icon">
					<div class="accordion__icon__inner"></div>
				</div>
			</button>
			<div class="accordion__content" aria-labelledby={id}>
				<div class="accordion__content__inner">{children}</div>
			</div>
		</div>
	</accordion-item>
} 


type AccordionGroupProps = WithElementProps<'div', {
	openFirst?: boolean
}>

export function AccordionGroup(props: AccordionGroupProps) {
	const {
		openFirst = false, 
		children,
		class: className, 
		...attributes
	} = props

	const classes = classnames(
		'accordion-group', 
		className
	)

	return <accordion-group open-first={openFirst} {...attributes}>
		<div class={classes}>
			{children}
		</div>
	</accordion-group>
} 