import './style.css'
import '../../styles/grid.less'
import '../../styles/utility.less'
import type { JSX, AnyComponent, ComponentChildren } from "preact"
import classnames from 'classnames'
import type { WithElementProps } from '../../types.tsx'


type LinkArgs = {
	href: string 
}

type BaseProps = {
	class?: HTMLElement['className'],
	style?: string,
	icon?: AnyComponent<any, any>|string,
	children?: ComponentChildren
}

type IconCardProps = WithElementProps<'div', BaseProps> | WithElementProps<'a', LinkArgs & BaseProps>


export default function Card(props: IconCardProps): JSX.Element {

	const {
		href,
		class: className,  
		children,
		icon,
		...attributes
	} = props

	const classes = classnames(
		'ui-iconcard',
		className,
	)

	const attrs = { class: classes, href, ...attributes }

	const content = <>
			<div class="ui-iconcard__cont">
				{icon && <div class="ui-iconcard__icon"><Any value={icon} /></div>}
				{children}
			</div>
		</>
	
	return (href !== undefined) 
		? <a {...attrs as JSX.IntrinsicElements['a'] }>{content}</a>
		: <div {...attrs as JSX.IntrinsicElements['div'] }>{content}</div>
		
}

function Any({ value: Value }: {value: any}): JSX.Element {
	if (typeof Value === 'string') return <>{Value}</>
	return <Value />
}