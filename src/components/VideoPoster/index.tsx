import type { ComponentChildren, JSX } from "preact"
import type { WithElementProps } from '../../types.tsx'
import './style.css'
import classnames from 'classnames'
import ButtonPlayPause from "../ButtonPlayPause/index.tsx"

type BaseProps = {
	videoUrl?: string 
	class?: HTMLElement['className']
	pause?: boolean
}

type VideoPosterProps = WithElementProps<'div', BaseProps>

export default function VideoPoster(props: VideoPosterProps): JSX.Element {

	const { 
		videoUrl, 
		class: className,
		...attributes 
	} = props

	const classes = classnames(
		'ui-video-poster',
		className,
	)

	return <div class={classes} {...attributes}>
		<div class="ui-video-poster__image">
			image
			<LinkWrap target="_blank" href="s">test</LinkWrap>
		</div>
		<div class="ui-video-poster__button">
			<ButtonPlayPause href={videoUrl} />
		</div>
	</div>
}


type LinkWrapProps = WithElementProps<'a', {
	href?: string
}>

function LinkWrap({ children, ...props }: LinkWrapProps) {
	return (props.href !== undefined) 
		? <a {...props }>{children}</a>
		: <>{children}</>
}