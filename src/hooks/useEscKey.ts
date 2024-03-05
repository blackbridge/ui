import { useEffect } from 'preact/hooks'

export function useEscKey(callback: () => void) {
	useEffect(() => {
		function eventHandler(event: KeyboardEvent) {
			if (event.key === 'Escape') callback()
		}
		window.addEventListener('keyup', eventHandler)
		return () => window.removeEventListener('keyup', eventHandler)
	}, [])
}
