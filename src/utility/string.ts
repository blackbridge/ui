
export function kebabCase(str: string) {
	return str
	  	.trim()
	  	.toLowerCase()
	  	.replace(/\s+/g, '-')
	  	.replace(/[^\w\-]+/g, '')
}