import type { JSX } from 'preact'
import type { WithElementProps } from '../../types.tsx'
import classnames from 'classnames'
import ButtonPlayPause from '../ButtonPlayPause/index.tsx'
import { VideoModal } from '../Modal/index.tsx'
import VideoEmbed from '../VideoEmbed/index.tsx'
import './style.css'
import './client.ts?client'

type BaseProps = {
	src?: string 
	class?: HTMLElement['className']
	poster?: JSX.IntrinsicElements['img'] | string
	fit?: boolean
	newTab?: boolean
}

type VideoPosterProps = WithElementProps<'div', BaseProps>

declare module 'preact' {
    namespace JSX {
        interface IntrinsicElements {
            'video-poster': JSX.HTMLAttributes<HTMLDivElement> & { src?: string }
            'template': {}
        }
    }
}

export default function VideoPoster(props: VideoPosterProps): JSX.Element {

	const { 
		src, 
		class: className,
		poster: imageProps,
		fit = false,
		newTab = false,
		...attributes 
	} = props

	const target = newTab ? '_blank' : undefined

	const classes = classnames(
		'ui-video-poster',
		fit && 'ui-video-poster--fit',
		className,
	)

	return <>
		<video-poster class={classes} src={src} {...attributes}>
			<div class="ui-video-poster__image">
				{imageProps && 
					<LinkWrap href={src} target={target} class="js-video-poster__open-modal">
						{(typeof imageProps === 'string') && <img src={imageProps} />}
						{(typeof imageProps !== 'string') && <img {...imageProps} />}
					</LinkWrap>
				}
			</div>
			<div class="ui-video-poster__button">
				<LinkWrap href={src} target={target} class="js-video-poster__open-modal">
					<ButtonPlayPause />
				</LinkWrap>
			</div>
			{!newTab && <template>
				<VideoModal class="js-video-poster__modal">
					<VideoEmbed src={src} />
				</VideoModal>
			</template>}
		</video-poster>
	</>
}


function LinkWrap({ children, ...props }: JSX.IntrinsicElements['a']) {
	return (props.href !== undefined) 
		? <a {...props }>{children}</a>
		: <>{children}</>
}