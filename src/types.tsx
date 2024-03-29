import type { JSX } from 'preact'


export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {}


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


export type EventHandler<
	ElementType extends Element = Element,
	EventType extends Event = Event
> = (e: JSX.TargetedEvent<ElementType, EventType>) => void
