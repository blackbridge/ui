
import { useState, useLayoutEffect } from 'preact/hooks'

const isBrowser = typeof window !== `undefined`

function getScrollPosition() {
    return isBrowser ? { x: window.pageXOffset, y: window.pageYOffset } : { x: 0, y: 0 }
}

export function useScrollPosition() {
    const [position, setScrollPosition] = useState(getScrollPosition())
    useLayoutEffect(() => {
        let requestRunning = null
        function handleScroll() {
            if (isBrowser && requestRunning === null) {
                requestRunning = window.requestAnimationFrame(() => {
                    setScrollPosition(getScrollPosition())
                    requestRunning = null
                })
            }
        }
        if (isBrowser) {
            window.addEventListener('scroll', handleScroll)
            return () => window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    return position
}

export function useScrollXPosition() {
    const { x } = useScrollPosition()
    return x
}

export function useScrollYPosition() {
    const { y } = useScrollPosition()
    return y
}
