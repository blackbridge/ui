import { useEffect, useState } from 'preact/hooks'
import debounce from './debounce'


export default function useWindowSize() {

    const [size, setWindowSize] = useState(
        typeof window === 'undefined' 
            ? [0, 0] 
            : [
                document.documentElement.clientWidth, 
                document.documentElement.clientHeight
            ]
    )
    
    useEffect(() => {
        const setSize = debounce(() => {
            setWindowSize([
                document.documentElement.clientWidth,
                document.documentElement.clientHeight
            ])
        }, 200)

        window.addEventListener('resize', setSize)
        window.addEventListener('orientationchange', setSize)

        return () => {
            window.removeEventListener('resize', setSize)
            window.removeEventListener('orientationchange', setSize)
        }
    })

    return size
}
