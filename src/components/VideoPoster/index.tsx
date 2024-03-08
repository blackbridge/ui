import type { JSX } from 'preact'
import type { WithElementProps } from '../../types.tsx'
import './style.css'
import classnames from 'classnames'
import ButtonPlayPause from '../ButtonPlayPause/index.tsx'

type BaseProps = {
	videoUrl?: string 
	class?: HTMLElement['className']
	pause?: boolean,
	poster: JSX.IntrinsicElements['img'] | string
	href?: string 
	target?: string
}

type VideoPosterProps = WithElementProps<'a', BaseProps>

export default function VideoPoster(props: VideoPosterProps): JSX.Element {

	const { 
		videoUrl, 
		class: className,
		poster: imageProps,
		href,
		target = '_blank',
		...attributes 
	} = props

	const link = href || videoUrl || undefined

	const classes = classnames(
		'ui-video-poster',
		className,
	)

	return <div class={classes}>
		<div class="ui-video-poster__image">
			{imageProps && 
				<LinkWrap href={link} target={target} {...attributes}>
					{(typeof imageProps === 'string') && <img src={imageProps} />}
					{(typeof imageProps !== 'string') && <img {...imageProps} />}
				</LinkWrap>
			}
		</div>
		<div class="ui-video-poster__button">
			<LinkWrap href={link} target={target} {...attributes}>
				<ButtonPlayPause />
			</LinkWrap>
		</div>
	</div>
}


function LinkWrap({ children, ...props }: JSX.IntrinsicElements['a']) {
	return (props.href !== undefined) 
		? <a {...props }>{children}</a>
		: <>{children}</>
}