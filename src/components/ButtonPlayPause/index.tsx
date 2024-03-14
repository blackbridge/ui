import './style.css'
import classnames from 'classnames'
import LinkWrap from "../LinkWrap/index.tsx"
import type { JSX, FunctionComponent } from "preact"
import type { WithElementProps } from '../../types.tsx'

type LinkArgs = {
	href: string 
}

type BaseProps = {
	as?: string | FunctionComponent<any>
	class?: HTMLElement['className']
	pause?: boolean
}

type ButtonPlayPauseProps = 
	WithElementProps<'button', BaseProps> | 
	WithElementProps<'a', LinkArgs & BaseProps>

export default function ButtonPlayPause(props: ButtonPlayPauseProps): JSX.Element {

	const { 
		href, 
		class: className,
		pause = false,
		as = 'button',
		...attributes 
	} = props

	const classes = classnames(
		'ui-button-play-pause',
		pause && `pause`,
		className,
	)

	const attrs = { 
		class: classes, 
		href, 
		as,
		...attributes 
	}

	const content = <>
		<div className="ui-button-play-pause__inner">
			<svg width="26px" height="12px" viewBox="0 0 26 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
		        <polygon class="ui-button-play-pause__play" fill="#FFFFFF" points="12 6 0 12 0 0"></polygon>
		        <g class="ui-button-play-pause__pause" stroke="none" fill="#FFFFFF" fill-rule="evenodd">
			        <rect x="22" y="0.5" width="4" height="11"></rect>
			        <rect x="14" y="0.5" width="4" height="11"></rect>
			    </g>
			</svg>
		</div>
	</>

	// @ts-ignore
	return <LinkWrap {...attrs}>{content}</LinkWrap>
}