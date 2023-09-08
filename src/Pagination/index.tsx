
import classnames from 'classnames'


export default function Pagination({ currentPage, lastPage, onUpdate, numberToUrl, onClick }) {

	if (!currentPage || !lastPage) return null
	const handler = page => event => onClick(event, page)
	const data = createPagination(currentPage, lastPage, 2, numberToUrl)
	const {previousPage, nextPage, numbers, firstPage, lastPage : last } = data
	
	return <>
		<div class="margin-y">
			<div class="grid space-between">
				<a 
					href={previousPage.href} 
					onClick={handler(previousPage)} 
					class={classnames('pagination-prev pagination--arrow underline--blue', previousPage.disabled && 'hidden')}
					>previous</a>
		        <ul class="pagination">
		        	{firstPage && <PageNumber page={firstPage} onClick={handler(firstPage)} />}
		        	{numbers.map(number => <PageNumber page={number} onClick={handler(number)} />)}
		        	{last && <PageNumber page={last} onClick={handler(last)} />}
		        </ul>
				<a 
					href={nextPage.href} 
					onClick={handler(nextPage)} 
					class={classnames('pagination-prev pagination--arrow underline--blue', nextPage.disabled && 'hidden')}
					>next</a>
			</div>
		</div>
		{/*<div class="text-center">
			<span>Page <strong>{currentPage}</strong> of <strong>{lastPage}</strong></span>
		</div>*/}
	</>
}



export function PageNumber({ page, onClick, children }) {
	if (page.current) {
		return <li class="active">{page.number}</li>
	}
	if (page.disabled) {
		return <li class="text-grey">…</li>
	}
	return <li>
		<a href={page.href} onClick={onClick}>
			{children || page.number}
		</a>
	</li>
}



export function createPagination(currentPage, lastPage, range = 2, pageHref = x => x) {

	currentPage = currentPage || 1
	lastPage = lastPage || 1

	const pagination = {
		nextPage: {
			number: currentPage + 1,
			href: pageHref(currentPage + 1),
			current: false,
			disabled: !(currentPage < lastPage)
		},
		previousPage: {
			number: currentPage - 1,
			href: (currentPage - 1 > 0) ? pageHref(currentPage - 1) : pageHref(1),
			current: false,
			disabled: (currentPage <= 1)
		},
		firstPage: {
			number: 1,
			href: pageHref(1),
			current: (currentPage === 1),
			disabled: false
		},
		lastPage: {
			number: lastPage,
			href: pageHref(lastPage),
			current: (currentPage === lastPage),
			disabled: false
		},
		numbers : []
	}

	if (pagination.previousPage.disabled) pagination.previousPage = false
	if (pagination.nextPage.disabled) pagination.nextPage = false
	if (pagination.firstPage.number === pagination.lastPage.number) pagination.lastPage = false

	// ellipsis item 1
	if (currentPage > range + 2) {
		pagination.numbers.push({
			href: false,
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
			href: pageHref(i),
			current: (currentPage === i) ? true : false
		})
	}

	// ellipsis item 2
	if (currentPage < lastPage - range - 1) {
		pagination.numbers.push({
			href: false,
			number: '…',
			current: false,
			disabled: true
		})
	}

	return pagination
}