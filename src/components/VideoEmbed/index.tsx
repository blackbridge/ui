import type { JSX } from 'preact'
import type { WithElementProps } from '../../types.tsx'
import './style.css'
import classnames from 'classnames'
import './client.ts?client'

type BaseProps = {
	src?: string 
	class?: HTMLElement['className']
	autoplay?: boolean
}

type VideoEmbedProps = WithElementProps<'div', BaseProps>

declare module 'preact' {
    namespace JSX {
        interface IntrinsicElements {
            'video-embed': JSX.HTMLAttributes<HTMLDivElement> & BaseProps
        }
    }
}

export default function VideoEmbed(props: VideoEmbedProps): JSX.Element {

	const { 
		src, 
		autoplay = false,
		class: className,
		...attributes 
	} = props
	
	const classes = classnames(
		'ui-video-embed',
		className,
	)

	if (!src) return <></>

	return <video-embed src={src} autoplay={autoplay}>
		<div class={classes}>
			<div class="ui-video-embed__inner"></div>
		</div>
	</video-embed>
}