import './style.css'
import type { JSX, ComponentChildren } from "preact"

type HorizontalScrollProps = {
	children?: ComponentChildren
}

export default function HorizontalScroll(props: HorizontalScrollProps): JSX.Element {
    
    const {
        children
    } = props

    return <>
        <div class="ui-horizontal-scroll">
            <div class="ui-horizontal-scroll__inner">
                {children}
            </div>
        </div>
    </>
}
