export default {
  name: 'post',
  title: 'Blogartikel',
  type: 'document',
  fields: [
    { name: 'title', title: 'Titel', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'slug', title: 'URL-Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() },
    { name: 'excerpt', title: 'Kurzbeschreibung', type: 'text', rows: 3, validation: (Rule) => Rule.max(220) },
    { name: 'mainImage', title: 'Titelbild', type: 'image', options: { hotspot: true } },
    { name: 'publishedAt', title: 'Veröffentlicht am', type: 'datetime', validation: (Rule) => Rule.required() },
    { name: 'readTime', title: 'Lesezeit', type: 'string', initialValue: '4 Min. Lesezeit' },
    { name: 'body', title: 'Artikel', type: 'array', of: [{ type: 'block' }] },
  ],
}
