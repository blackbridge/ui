import './style.css'

import type { JSX } from 'preact'
import classnames from 'classnames'


type TextProps = {
	content?: string
	class?: HTMLElement['className'],
	style?: string,
}

function splitWords(string: string): JSX.Element[] {
    return string.split(' ').map(word => {
        return <><div class="ui-singleword">{splitCharacters(word)}</div> </>
    })
}

function splitCharacters(string: string): JSX.Element[]  {	
    return string.split('').map(letter => {
        return <div class="ui-singleletter">{letter}</div>
    })
}


export function SplitText(props: TextProps): JSX.Element {

	const {
		content = 'testboii',
		class: className, 
		...attributes 
	} = props

	const classes = classnames(
		'ui-splittext',
		className,
	)

	const attrs = { class: classes, ...attributes }

	return <>
			<div {...attrs}>
				{splitWords(content)}
			</div>
		</>
}