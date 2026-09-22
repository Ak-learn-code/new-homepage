import sanitizeHtml from 'sanitize-html'

const defaultDirectusUrl = 'https://directus.sidetwo.de'
const allowedTags = ['p', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'code', 'pre', 'a', 'ul', 'ol', 'li', 'blockquote', 'br', 'figure', 'figcaption', 'img']

function isSafeLink(value) {
  if (typeof value !== 'string') return false
  const href = value.trim()
  if (!href || href.startsWith('//')) return false
  return href.startsWith('/') || href.startsWith('#') || /^(?:https?:|mailto:|tel:)/i.test(href)
}

function isDirectusAsset(value, directusUrl) {
  if (typeof value !== 'string' || !value) return false
  try {
    const source = new URL(value)
    const directus = new URL(directusUrl || defaultDirectusUrl)
    return source.origin === directus.origin && source.pathname.startsWith('/assets/')
  } catch {
    return false
  }
}

/** Shared CMS trust boundary for React rendering and static prerendering. */
export function sanitizeCmsHtml(value, { directusUrl = defaultDirectusUrl } = {}) {
  if (typeof value !== 'string' || !value) return ''

  return sanitizeHtml(value, {
    allowedTags,
    allowedAttributes: { a: ['href', 'target', 'rel'], img: ['src', 'alt'] },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowedSchemesByTag: { img: ['http', 'https'] },
    allowProtocolRelative: false,
    disallowedTagsMode: 'discard',
    nonTextTags: ['script', 'style', 'textarea', 'option', 'noscript', 'iframe', 'object', 'embed', 'template'],
    transformTags: {
      a: (_tagName, attribs) => {
        const href = isSafeLink(attribs.href) ? attribs.href.trim() : undefined
        if (!href) return { tagName: 'a', attribs: {} }
        const isExternal = /^https?:/i.test(href)
        return { tagName: 'a', attribs: { href, ...(isExternal || attribs.target === '_blank' ? { target: '_blank', rel: 'noopener noreferrer' } : {}) } }
      },
      img: (_tagName, attribs) => ({
        tagName: 'img',
        attribs: {
          ...(isDirectusAsset(attribs.src, directusUrl) ? { src: attribs.src } : {}),
          ...(typeof attribs.alt === 'string' ? { alt: attribs.alt } : {}),
        },
      }),
    },
  })
}
