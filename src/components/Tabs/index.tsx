import './style.css'
import './client.ts?client'
import HorizontalScroll from '../HorizontalScroll/index.tsx'
import { toChildArray } from 'preact'
import classnames from 'classnames'

import type { WithElementProps } from '../../types.tsx'
import type { JSX, ComponentChildren } from 'preact'


type TabbedGroupProps = WithElementProps<'div', {}>

export function TabGroup(props: TabbedGroupProps): JSX.Element {

	const {
		children, 
		...attributes 
	} = props

	// @ts-ignore – inspect the child props to render into two separate containers
	const tabs = (toChildArray(children).map(child => child?.props))

	return <div class="ui-tabbedcontent" {...attributes}>
		<HorizontalScroll>
			<div class="ui-tabbedcontent__tabs" role="tablist" aria-labelledby="tablist">
				{tabs.map((tab, index) => <TabTitle index={index} {...tab} />)}
			</div>
		</HorizontalScroll>
		<div class="ui-tabbedcontent__content">
			{tabs.map((tab, index) => <TabContent index={index} {...tab} />)}
		</div>
	</div>
}


type TabbedProps = WithElementProps<'div', {
	title: string
	children?: ComponentChildren
	index: number | undefined
	class?: HTMLElement['className']
}>

export function TabItem(_props: TabbedProps) {
	// a virtual component for TabGroup to extract props
	return <></>
}

function TabTitle(props: TabbedProps): JSX.Element {
		
	const {
		title,
		index,
		class: className, 
	} = props

	const isActive = (index === 0)
	const ariaSelected = (isActive) ? 'true' : 'false'

	const classes = classnames(
		'ui-tabbedcontent__tab',
		isActive && `active`,
		className
	)
	
	return <>
		<button 
			class={classes} 
			data-tab={index} 
			type="button" 
			role="tab" 
			aria-controls={`tabpanel-${index}`} 
			aria-selected={ariaSelected}
		>
		{title}
		</button>
	</>
}

function TabContent(props: TabbedProps): JSX.Element {
		
	const {
		index,
		class: className, 
		children,
	} = props

	const isActive = (index === 0)

	const classes = classnames(
		'ui-tabbedcontent__content__item',
		isActive && `active`,
		className
	)

	return <div class={classes} data-tab={index}>
		{children}
	</div>
}


