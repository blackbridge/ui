import type { WithElementProps, EventHandler } from '../types.tsx'
import type { JSX } from 'preact'
import classnames from 'classnames'
import './style.css'


type PaginationPage = {
	number: number|string,
	href: string|number|null,
	current: boolean,
	disabled: boolean
}

type CreatePaginationProps = {
	currentPage: number, 
	lastPage: number, 
	range?: number, 
	numberToUrl?: (x:number) => number|string
}

type Pagination = {
	nextPage: PaginationPage,
	previousPage: PaginationPage,
	firstPage: PaginationPage,
	numbers: Array<PaginationPage>
	lastPage: false | PaginationPage,
}

export function createPagination(props: CreatePaginationProps): Pagination {

	const {
		currentPage,
		lastPage,
		range = 2,
		numberToUrl = x => x,
	} = props

	const pagination: Pagination = {
		nextPage: {
			number: currentPage + 1,
			href: numberToUrl(currentPage + 1),
			current: false,
			disabled: currentPage >= lastPage
		},
		previousPage: {
			number: currentPage - 1,
			href: (currentPage - 1 > 0) ? numberToUrl(currentPage - 1) : numberToUrl(1),
			current: false,
			disabled: currentPage <= 1
		},
		firstPage: {
			number: 1,
			href: numberToUrl(1),
			current: currentPage === 1,
			disabled: false
		},
		lastPage: {
			number: lastPage,
			href: numberToUrl(lastPage),
			current: currentPage === lastPage,
			disabled: false
		},
		numbers : []
	}

	// do not render last page if there's only one page
	if (
		pagination.lastPage 
		&& pagination.firstPage.number === pagination.lastPage.number
	) pagination.lastPage = false


	// ellipsis item 1
	if (currentPage > range + 2) {
		pagination.numbers.push({
			href: null,
			number: '…',
			current: false,
			disabled: true
		})
	}

	// inbetween first and main
	for (let i = 1; i <= lastPage; i++) {

		const isFirst = i === 1
		const isLast = i === lastPage
		const beforeRange = i <= currentPage - range - 1
		const afterRange = i >= currentPage + range + 1

		if (isFirst || isLast || beforeRange || afterRange) continue

		pagination.numbers.push({
			number: i,
			href: numberToUrl(i),
			current: (currentPage === i) ? true : false
		})
	}

	// ellipsis item 2
	if (currentPage < lastPage - range - 1) {
		pagination.numbers.push({
			href: null,
			number: '…',
			current: false,
			disabled: true
		})
	}

	return pagination
}



type PaginationProps = WithElementProps<'div', {
	currentPage: number,
	lastPage: number,
	numberToUrl: (x: number) => string
	onNavigate?: (event: JSX.TargetedEvent<HTMLAnchorElement>, page: PaginationPage) => void
}>


export default function Pagination(props: PaginationProps): null|JSX.Element {

	const { 
		currentPage, 
		lastPage, 
		numberToUrl,
		onNavigate,
		class: className,
		style,
		...attributes
	} = props

	if (!currentPage || !lastPage) return null

	const {
		previousPage, 
		nextPage, 
		numbers, 
		firstPage, 
		lastPage : last 
	} = createPagination({ currentPage, lastPage, numberToUrl })

	const createHandler = function(page: PaginationPage) {
		return onNavigate 
			? (event: JSX.TargetedEvent<HTMLAnchorElement>) => onNavigate(event, page)	
			: undefined
	} 
	
	return <div class="ui-pagination" {...attributes}>
		<a 
			href={previousPage.href as string || undefined} 
			class={classnames('ui-pagination__link ui-pagination__prev', previousPage.disabled && 'ui-pagination__link--disabled')}
			onClick={createHandler(previousPage)} 
		>Previous</a>

        <ul class="ui-pagination__numbers">
        	{firstPage && <PageNumber page={firstPage} onClick={createHandler(firstPage)} />}
        	{numbers.map(number => <PageNumber page={number} onClick={createHandler(number)} />)}
        	{last && <PageNumber page={last} onClick={createHandler(last)} />}
        </ul>

		<a 
			href={nextPage.href as string || undefined} 
			class={classnames('ui-pagination__link ui-pagination__next', nextPage.disabled && 'ui-pagination__link--disabled')}
			onClick={createHandler(nextPage)} 
		>Next</a>
	</div>
}



type PageNumberProps = {
	page: PaginationPage,
	onClick?: EventHandler<HTMLAnchorElement>
}

export function PageNumber({ page, onClick }: PageNumberProps) {
	if (page.current) {
		return <li class="ui-pagination-page ui-pagination-page--current">{page.number}</li>
	}
	if (page.href === null) {
		return <li class="ui-pagination-page ui-pagination-page--ellipsis">…</li>
	}
	return <li class="ui-pagination-page ui-pagination-page--number">
		<a href={page.href as string || undefined} onClick={onClick}>
			{page.number}
		</a>
	</li>
}
