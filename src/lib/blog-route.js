export function blogRouteFromLocation({ pathname = '', hash = '' } = {}) {
  const route = pathname.match(/\/insights\/([^/]+)\/?$/)
  if (route) return { type: 'article', slug: decodeURIComponent(route[1]) }

  const legacySlug = hash.slice(1).replace(/[.]+$/, '')
  return legacySlug ? { type: 'article', slug: legacySlug } : { type: 'overview', slug: '' }
}

export function blogViewForRoute(route) {
  return route.type === 'article' ? 'article' : 'overview'
}
