import type { Ref } from 'preact/hooks'
import { useState, useRef, useLayoutEffect } from 'preact/hooks'
import { isClient } from './env.ts'


type IntersectionCallback = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => any

export const onIntersection =(
	el: Element, 
	callback: IntersectionCallback, 
	rootMargin: string = '0px 0px', 
	once: boolean = false
) => {

	function handleIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
		if (!entries[0]) return
		if (once) {
			if (entries?.[0]?.intersectionRatio > 0) {
				observer.unobserve(el)
				callback(entries[0], observer)
			}
			return
		}
		callback(entries[0], observer)
	}

	const observer = new IntersectionObserver(handleIntersection, {
		rootMargin : rootMargin, threshold: [0, 1]
	})

	observer.observe(el)
	return () => observer.unobserve(el)
}

export const onIntersectionOnce = (
	el: Element, 
	callback: IntersectionCallback, 
	rootMargin: string = '0px 0px',
) => onIntersection(el, callback, rootMargin, true)


type IntersectionHookReturn<ElementType> = [
	Ref<ElementType>,
	boolean
]

export const useIsIntersecting = <ElementType extends Element>(rootMargin: string, once = false): IntersectionHookReturn<ElementType> => {

	const [shown, setShown] = useState<boolean>(false)
	const ref = useRef<ElementType>(null)

	if (!isClient || !window.IntersectionObserver) return [ref, true]

	useLayoutEffect(() => {
		if (!ref.current) return
		return onIntersection(
			ref.current, 
			entry => setShown(entry.isIntersecting),
			rootMargin,
			once
		)
	}, [])

	return [ ref, shown ]
}
