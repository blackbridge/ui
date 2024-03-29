import './style.css'
import type { WithElementProps } from '../../types.tsx'
import classnames from 'classnames'
import { useState, useRef, useEffect } from 'preact/hooks'
import { isClient } from '../../utility/env.ts'
import { useIsIntersecting } from '../../utility/intersection.ts'
import defaultPlaceholder from './placeholder-default.svg'


type ImageLoadProps = WithElementProps<'img', {
	onScroll?: boolean,
	onLoad?: (loaded: boolean) => void,
	class?: HTMLElement['className'],
	placeholder?: string,
}>


export default function ImageLoad(props: ImageLoadProps) {

	const { 
		onScroll = true, 
		onLoad = () => {}, 
		class: className, 
		placeholder = defaultPlaceholder.src,
		...attributes 
	} = props

	const [loaded, setLoaded] = useState(false)

	const [ref, shown] = onScroll 
		? useIsIntersecting<HTMLImageElement>('0px 0px', true)
		: [useRef<HTMLImageElement>(null), true]

	// check if already loaded
	useEffect(() => {
		if (ref && ref.current && ref.current.complete) {
			setLoaded(true)
			onLoad(true)
		}
	})

	const classes = classnames(
		'ui-image-load',
		loaded && shown && isClient && 'ui-image-load--loaded',
		props.class
	)

	// lazy loading by default
	if (!attributes.loading) attributes.loading ='lazy'

	// set default placeholder
	if (!attributes.src && !attributes.srcset) attributes.src = placeholder

	return <img 
		ref={ref}
		onLoad={() => setLoaded(true)} 
		class={classes}
		{...attributes}
	/>
}

