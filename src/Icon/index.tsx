import './style.css'
import type { JSX } from 'preact'


export function Twitter(): JSX.Element { 
	return <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#D9D9D9"/></svg>
}

export function External(): JSX.Element {
	return <svg width="650" height="650" viewBox="0 0 650 650" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M191.667 625H605C616.047 625 625 616.047 625 605V45C625 33.9543 616.047 25 605 25H45C33.9543 25 25 33.9543 25 45V458.333" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
	<path d="M41.6667 608.333L325 325M325 325V458.333M325 325H191.667" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
	</svg>	
}

export function Arrow(): JSX.Element {
	return <svg width="66" height="36" viewBox="0 0 66 36" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path fill-rule="evenodd" clip-rule="evenodd" d="M0.87868 0.87868C2.05025 -0.292893 3.94975 -0.292893 5.12132 0.87868L33 28.7574L60.8787 0.87868C62.0503 -0.292893 63.9497 -0.292893 65.1213 0.87868C66.2929 2.05025 66.2929 3.94975 65.1213 5.12132L35.1213 35.1213C33.9497 36.2929 32.0503 36.2929 30.8787 35.1213L0.87868 5.12132C-0.292893 3.94975 -0.292893 2.05025 0.87868 0.87868Z" fill="black"/>
	</svg>
}