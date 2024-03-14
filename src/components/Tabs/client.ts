function toggleTabs(el: Element) {

	const tabs = [...el.querySelectorAll('.ui-tabbedcontent__tab')] as HTMLButtonElement[]
	var activeTab = el.querySelector('.ui-tabbedcontent__tab.active')

	const content = el.querySelectorAll('.ui-tabbedcontent__content__item')
	var activeContent = el.querySelector('.ui-tabbedcontent__content__item.active')

	function clickHandler(event: MouseEvent) {
        const tab = event.currentTarget as Element
		var tabID = parseInt(tab.getAttribute('data-tab') || '')

		content.forEach(item => {
			var contentID = parseInt(item.getAttribute('data-tab') || '')
			if (contentID === tabID) {
                removeClasses()

                activeTab = tab
                tab.classList.add('active')
				tab.setAttribute('aria-selected', 'true')

				activeContent = item
				item.classList.add('active')
			}
		})
	}
	
	function removeClasses() {
		activeTab && activeTab.classList.remove('active')
		activeTab && activeTab.setAttribute('aria-selected', 'false')
		activeContent && activeContent.classList.remove('active')
	}

	tabs.forEach(function(tab) {
		tab.addEventListener('click', clickHandler)
	})
}


[...document.querySelectorAll('.ui-tabbedcontent')].map(toggleTabs)