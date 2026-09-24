import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const read = (path) => readFile(resolve(process.cwd(), path), 'utf8')

test('the contact form keeps only name, email and message mandatory', async () => {
  const homepage = await read('src/main.jsx')

  assert.match(homepage, /name="name" required aria-required="true"[^>]*autoComplete="name"/)
  assert.match(homepage, /name="email" type="email" required aria-required="true"[^>]*autoComplete="email"/)
  assert.match(homepage, /name="message" required aria-required="true"[^>]*maxLength="5000"/)
  assert.match(homepage, /name="company"[^>]*autoComplete="organization"/)
  assert.match(homepage, /name="phone" type="tel"[^>]*autoComplete="tel"/)
  assert.doesNotMatch(homepage, /name="company"[^>]*required/)
  assert.doesNotMatch(homepage, /name="phone"[^>]*required/)
})

test('all public React footers link to imprint and privacy pages', async () => {
  const [homepage, blog, legal] = await Promise.all([
    read('src/main.jsx'), read('src/blog.jsx'), read('src/legal.jsx'),
  ])

  for (const source of [homepage, blog, legal]) {
    assert.match(source, /impressum/)
    assert.match(source, /datenschutz/)
  }
})

test('new-window links use opener protection', async () => {
  const sources = await Promise.all([read('src/main.jsx'), read('src/blog.jsx'), read('src/legal.jsx'), read('src/components/footer-social-links.jsx')])
  for (const source of sources) {
    for (const tag of source.match(/<a[^>]+target="_blank"[^>]*>/g) || []) {
      assert.match(tag, /rel="noopener noreferrer"/)
    }
  }
})

test('the shared footer links to SideTwo Instagram with accessible external-link attributes', async () => {
  const footerSocialLinks = await read('src/components/footer-social-links.jsx')

  assert.match(footerSocialLinks, /https:\/\/www\.instagram\.com\/sidetwo\.de\//)
  assert.match(footerSocialLinks, /label: 'SideTwo auf Instagram'/)
  assert.match(footerSocialLinks, /target="_blank" rel="noopener noreferrer"/)
})

test('the hero links to the verified Google business profile without rating claims', async () => {
  const homepage = await read('src/main.jsx')

  assert.match(homepage, /https:\/\/www\.google\.com\/maps\/place\/\/+@49\.6515694/)
  assert.match(homepage, /className="google-rating" href=\{googleProfileUrl\} target="_blank" rel="noopener noreferrer" aria-label="SideTwo auf Google ansehen"/)
  assert.match(homepage, /5\.0/)
  assert.match(homepage, /Google-Bewertungen/)
  assert.match(homepage, /assets\/people\/google-review-avatars\.png/)
  assert.doesNotMatch(homepage, /Sterneanzahl|Bewertungspunktzahl|Review-Anzahl/)
})

test('Bilal has a complete founder profile and uses the shared Instagram URL', async () => {
  const homepage = await read('src/main.jsx')

  assert.match(homepage, /Bilal bringt technisches Verständnis und einen praxisnahen Blick aus der Automobilbranche mit\. Bei SideTwo fokussiert er sich auf einfache, funktionierende Lösungen\./)
  assert.match(homepage, /Kfz-Hintergrund: Ausbildung im Kfz-Bereich/)
  assert.match(homepage, /Weiterbildung: IHK-Qualifikation/)
  assert.match(homepage, /SideTwo: praxisnahe digitale Lösungen für Unternehmen/)
  assert.match(homepage, /profileHref: instagramProfile\?\.href/)
  assert.doesNotMatch(homepage, /Profil und Lebenslauf folgen|Quick Facts werden ergänzt|Fokus und Spezialisierung folgen|Profil wird ergänzt/)
})

test('all public entry pages reference the SideTwo S² favicon', async () => {
  const pages = await Promise.all([read('index.html'), read('blog.html'), read('impressum/index.html'), read('datenschutz/index.html')])

  for (const page of pages) {
    assert.match(page, /favicon\.svg/)
    assert.match(page, /favicon\.ico/)
  }
})

test('prerendered insights remain visible when the client-side refresh is unavailable', async () => {
  const blog = await read('src/blog.jsx')

  assert.match(blog, /if \(!initialPosts\.length\) \{[\s\S]*setPosts\(\[\]\)[\s\S]*setLoadError/)
})

test('the executable public source contains no client-side storage or secrets and gates Turnstile behind configuration', async () => {
  const source = await Promise.all([
    read('src/main.jsx'), read('src/blog.jsx'), read('src/lib/directus-client.js'),
  ]).then((files) => files.join('\n'))

  assert.doesNotMatch(source, /(?:localStorage|sessionStorage|indexedDB|document\.cookie|navigator\.sendBeacon)/)
  assert.doesNotMatch(source, /TURNSTILE_SECRET(?:_KEY)?\s*=/i)
  assert.match(source, /VITE_CONTACT_API_URL/)
  assert.match(source, /VITE_TURNSTILE_SITE_KEY/)
  assert.match(source, /Boolean\(contactApiUrl && turnstileSiteKey\)/)
})

test('local environment files are ignored while the safe example remains trackable', async () => {
  const gitignore = await read('.gitignore')
  assert.match(gitignore, /^\.env$/m)
  assert.match(gitignore, /^\.env\.\*$/m)
  assert.match(gitignore, /^!\.env\.example$/m)
})

test('the production build is configured through explicit site and base variables', async () => {
  const [viteConfig, example, prerender] = await Promise.all([read('vite.config.js'), read('.env.example'), read('scripts/prerender-insights.mjs')])
  assert.match(viteConfig, /getSiteConfig/)
  assert.match(example, /VITE_SITE_URL=/)
  assert.match(example, /VITE_BASE_PATH=/)
  assert.match(prerender, /getSiteConfig/)
  assert.match(prerender, /dist', 'robots\.txt/)
})

test('the legacy blog redirect keeps its base-aware target but emits an absolute canonical URL', async () => {
  const prerender = await read('scripts/prerender-insights.mjs')

  assert.match(prerender, /new URL\(`\$\{base\}insights\/`, `\$\{siteUrl\}\/`\)\.toString\(\)/)
  assert.match(prerender, /http-equiv="refresh" content="0; url=\$\{base\}insights\/"/)
  assert.match(prerender, /rel="canonical" href="\$\{insightsCanonical\}"/)
})
