import assert from 'node:assert/strict'
import test from 'node:test'
import { blogRouteFromLocation, blogViewForRoute } from './blog-route.js'

test('initializes the blog overview only on the overview route', () => {
  assert.deepEqual(blogRouteFromLocation({ pathname: '/new-homepage/blog.html' }), { type: 'overview', slug: '' })
  assert.deepEqual(blogRouteFromLocation({ pathname: '/new-homepage/insights/' }), { type: 'overview', slug: '' })
})

test('recognizes an insight article synchronously with the GitHub Pages base path', () => {
  assert.deepEqual(
    blogRouteFromLocation({ pathname: '/new-homepage/insights/test-slug/' }),
    { type: 'article', slug: 'test-slug' },
  )
})

test('recognizes an article route without requiring a prior overview state', () => {
  assert.deepEqual(
    blogRouteFromLocation({ pathname: '/insights/test-slug/' }),
    { type: 'article', slug: 'test-slug' },
  )
})

test('keeps an article route in the article view while its post is loading', () => {
  const route = blogRouteFromLocation({ pathname: '/new-homepage/insights/test-slug/' })
  assert.equal(blogViewForRoute(route), 'article')
})
