import type { JSX } from 'preact'

export type WithElementProps<
	ElementName extends keyof JSX.IntrinsicElements,
	Base, 
	OmitType extends keyof JSX.IntrinsicElements[ElementName] = never
> = (
	Base & 
	Omit<
		JSX.IntrinsicElements[ElementName], 
		keyof Base
		| 'className'
		| OmitType
	>
)