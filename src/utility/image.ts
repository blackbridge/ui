import type { JSX } from 'preact'

export type Image = string | JSX.HTMLAttributes<HTMLImageElement>

function isObject(input: unknown): boolean {
	return (
		typeof input === 'object' &&
	    !Array.isArray(input) &&
	    input !== null
	)
}

export function imageAttributes(image: Image): JSX.HTMLAttributes<HTMLImageElement> {
	if (typeof image === 'string') return { src: image }
	if (isObject(image)) return image
	return {}
}
