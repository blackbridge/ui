import type { RefCallback } from 'preact'
import { useCallback } from 'preact/hooks'
import { useSignal } from '@preact/signals'

export function useSignalRef<T extends HTMLElement>() {
	const node = useSignal<T | null>(null)
	const ref: RefCallback<T> = useCallback(ref => (node.value = ref), [])
	return { ref, node }
}