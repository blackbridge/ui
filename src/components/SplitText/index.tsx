import './style.css'

import type { JSX } from 'preact'
import classnames from 'classnames'


type TextProps = {
	content?: string
	class?: HTMLElement['className'],
	style?: string,
}

function splitWords(string: string): string[] {
    return string.split(' ').map(word => {
        return `<div class="ui-single-word">${splitCharacters(word).join('')}</div>`
    })
}

function splitCharacters(string: string): string[]  {	
    return string.split('').map(letter => {
        return `<div class="ui-single-letter">${letter}</div>`
    })
}


export default function SplitText(props: TextProps): JSX.Element {

	const {
		content = '',
		class: className, 
		...attributes 
	} = props

	const classes = classnames(
		'ui-split-text',
		className,
	)

	const attrs = { class: classes, ...attributes }

	return <>
			<div {...attrs} dangerouslySetInnerHTML={{ __html: splitWords(content).join(' ') }}></div>
		</>
}