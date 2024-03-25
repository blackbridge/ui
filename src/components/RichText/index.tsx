import type { ComponentChild, ComponentChildren } from "preact"

// Text node formatting
export const IS_BOLD = 1
export const IS_ITALIC = 1 << 1
export const IS_STRIKETHROUGH = 1 << 2
export const IS_UNDERLINE = 1 << 3
export const IS_CODE = 1 << 4
export const IS_SUBSCRIPT = 1 << 5
export const IS_SUPERSCRIPT = 1 << 6
export const IS_HIGHLIGHT = 1 << 7

// Element node formatting
export const IS_ALIGN_LEFT = 1
export const IS_ALIGN_CENTER = 2
export const IS_ALIGN_RIGHT = 3
export const IS_ALIGN_JUSTIFY = 4
export const IS_ALIGN_START = 5
export const IS_ALIGN_END = 6

export type Node = {
	type: string
	children: Node[]
	direction: ('ltr' | 'rtl') | null
	format: any
	indent: number
	[key: string]: unknown
	fields?: Record<string, unknown>
} & {
	root?: never
}

type RootNode = Record<string, unknown> & {
	root: Node
	children: Node[]
}

type NodeArg = (Node | RootNode) | Array<Node | RootNode>
type Attributes = Record<string, any>

export type RenderNodeOptions = {
	renderer: (node: Node, children: ComponentChildren, options: RenderNodeOptions) => ComponentChildren | void
	formatUrl: (url: string, relationTo: string) => string
}

export type RichTextProps = {
	node?: any
	options?: RenderNodeOptions
}

const defaultOptions: RenderNodeOptions = {
	renderer: (_node, _attributes) => {},
	formatUrl: (url, _relationTo = '') => `/${url}`,
}

export function RichText({ node, options = defaultOptions }: RichTextProps = {}) {
	if (!node) return <></>
	return <>{renderNode(node, options)}</>
}

function renderNode(node: NodeArg, options: RenderNodeOptions = defaultOptions): ComponentChildren {

	// recursive call to render root or array items
	if (Array.isArray(node)) return node.map((nodeItem, i) => renderNode(nodeItem, options))
	if (node.root) return renderNode(node.root.children, options)
	
	// normalization
	if (node.type === 'list') node = normalizeList(node)

	// get props
	const children = (node.children) ? renderNode(node.children, options): null
	const attrs = getAttributes(node)

	// render custom elements
	const custom = options.renderer(node, children, options)
	if (custom) return custom

	if (node.type === 'text') return renderTextNode(node)
	if (node.type === 'paragraph') return <p {...attrs}>{children}</p>
	if (node.type === 'heading' && node.tag === 'h1') return <h1 {...attrs}>{children}</h1>
	if (node.type === 'heading' && node.tag === 'h2') return <h2 {...attrs}>{children}</h2>
	if (node.type === 'heading' && node.tag === 'h3') return <h3 {...attrs}>{children}</h3>
	if (node.type === 'heading' && node.tag === 'h4') return <h4 {...attrs}>{children}</h4>
	if (node.type === 'heading' && node.tag === 'h5') return <h5 {...attrs}>{children}</h5>
	if (node.type === 'heading' && node.tag === 'h6') return <h6 {...attrs}>{children}</h6>
	if (node.type === 'quote') return <blockquote {...attrs}>{children}</blockquote>
	if (node.type === 'listitem' && !node.children.length) return null
	if (node.type === 'listitem' && node.children.length) return <li {...attrs}>{children}</li>
	if (node.type === 'list' && !node.children.length) return null
	if (node.listType === 'number') return <ul {...attrs}>{children}</ul>
	if (node.listType === 'bullet') return <ol {...attrs}>{children}</ol>
	if (node.type === 'link') return renderPayloadLink(node, children, options)
	if (node.type === 'relationship') return renderPayloadRelationship(node, options)
	if (node.type === 'upload') return renderPayloadUpload(node, options)

	console.log(node)
	throw Error(`Node with type "${node.type}" cannot be rendered in the rich text area`)
}

function renderTextNode(node: Node) {
	let children: ComponentChild = node.text as string
	if (node.format & IS_ITALIC) children = <em>{children}</em>
	if (node.format & IS_UNDERLINE) children = <u>{children}</u>
	if (node.format & IS_BOLD) children = <strong>{children}</strong>
	if (node.format & IS_STRIKETHROUGH) children = <s>{children}</s>
	if (node.format & IS_SUBSCRIPT) children = <sub>{children}</sub>
	if (node.format & IS_SUPERSCRIPT) children = <sup>{children}</sup>
	if (node.format & IS_HIGHLIGHT) children = <mark>{children}</mark>
	if (node.format & IS_CODE) children = <code>{children}</code>
	return <>{children}</>
}

function normalizeList(node: Node) {
	// lexical has an odd data structure for hierarchical lists:
	// a sublist is inset into a sibling li element, so we need to merge them
	for (let i = 0; i < node.children.length; i++)  {
		const current = node.children[i]
		if (!current.children.length) continue
		const next = node.children?.[i + 1]
		const nextHasOnlyList = next && next.children.length === 1 && next.children[0].type === 'list'
		if (nextHasOnlyList) {
			current.children = current.children.concat(next.children)
			next.children = []
		}
	}
	return node
}

function renderPayloadLink(node: Node, children: ComponentChildren, options: RenderNodeOptions) {
	const attrs = payloadLinkProps(node, options)
	return <a {...attrs}>{children}</a>
}

function renderPayloadRelationship(node: Node, options: RenderNodeOptions) : ComponentChildren | void {
	if (node.type === 'relationship') {
		const rel: any = node.value
		const slug = rel?.slug
		const relationTo = node.relationTo as string
		const title = rel?.title
		const href = options.formatUrl(slug, relationTo)
		if (!relationTo || typeof slug !== 'string') return
		return <a href={href}>{title}</a>
	}
}

function renderPayloadUpload(node: Node, _options: RenderNodeOptions): ComponentChildren | void {
	if (node.type === 'upload') {
		const image: any = node?.value
		const mime = image?.mimeType
		if (!image || !mime) return

		if (mime?.includes('image/svg+xml')) {
			return <img 
				src={image?.url || undefined } 
				alt={image?.alt || undefined } 
				width={image?.width || undefined } 
				height={image?.height || undefined }
				style="max-width:100%; height:auto"
			/>

		} else if (mime?.includes('image')) {
			const src = image.sizes.large && `${image.sizes.large.url}`
			const srcset = Object.values(image.sizes).map((size: any) => {
				return `${size.url} ${size.width}w`
			}).join(', ') || undefined
			
			return <img 
				src={src} 
				alt={image.alt} 
				srcset={srcset} 
				sizes="100vw" 
				width={image.width} 
				height={image.height}
				style="max-width:100%; height:auto"
			/>
		}
	}
}

export function payloadLinkProps(node: Node, options: RenderNodeOptions) {
	const props = {
		href: (node.fields?.url || '') as string,
		...getAttributes(node)
	}

	if (
		node.type === 'link' && 
		node.fields?.linkType === 'custom'
	) {
		return props
	}

	if (node.type === 'link' && node.fields?.linkType === 'internal') {
		const linkTo: any = node.fields?.doc
		const relationTo = linkTo.relationTo
		const slug = linkTo.value?.slug
		if (!relationTo || typeof slug !== 'string') {
			return props
		}
		props.href = options.formatUrl(slug, relationTo)
		return props
	}

	return props
}

export function getAttributes(node: Node): Attributes {
	const classNames: Array<string> = []
	const attrs: Record<string, any> = { className: undefined } 
	if (node.format && typeof node.format === 'string') classNames.push(`align-${node.format}`)
	attrs.className = classNames.length ? classNames.join(' ') : undefined
	return attrs
}