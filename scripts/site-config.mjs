export const githubPagesSiteUrl = 'https://ak-learn-code.github.io/new-homepage'
export const githubPagesBasePath = '/new-homepage/'

export function normalizeBasePath(value = githubPagesBasePath) {
  const path = `/${String(value).trim().replace(/^\/+|\/+$/g, '')}/`
  return path === '//' ? '/' : path
}

export function getSiteConfig(env = process.env) {
  return {
    base: normalizeBasePath(env.VITE_BASE_PATH || githubPagesBasePath),
    siteUrl: (env.VITE_SITE_URL || githubPagesSiteUrl).replace(/\/$/, ''),
  }
}
