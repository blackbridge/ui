
import { isClient } from './env'
import { useState } from 'preact/hooks'

export function useFontsLoaded() {

	let initialState = false
	if (isClient && !('fonts' in document)) initialState = true

	const [loaded, setLoaded] = useState(initialState)
	if (!isClient || !document.fonts) return loaded

	document.fonts.ready.then(() => {
		setLoaded(true)
	})

	return loaded
}