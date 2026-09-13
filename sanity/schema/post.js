import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blogartikel',
  type: 'document',
  fields: [
    { name: 'title', title: 'Titel', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'slug', title: 'URL-Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() },
    defineField({ name: 'excerpt', title: 'Kurzbeschreibung', type: 'text', rows: 3, validation: (Rule) => Rule.required().max(220) }),
    defineField({ name: 'mainImage', title: 'Titelbild', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alternativtext', type: 'string', description: 'Beschreibt das Bild für Suchmaschinen und Screenreader.', validation: (Rule) => Rule.required().max(140) }] }),
    defineField({ name: 'publishedAt', title: 'Veröffentlicht am', type: 'datetime', initialValue: () => new Date().toISOString(), validation: (Rule) => Rule.required() }),
    { name: 'readTime', title: 'Lesezeit', type: 'string', initialValue: '4 Min. Lesezeit' },
    { name: 'category', title: 'Kategorie', type: 'string', options: { list: ['Websites', 'Strategie', 'Automatisierung', 'Sichtbarkeit', 'KI', 'Design'] } },
    defineField({ name: 'author', title: 'Autor:in', type: 'string', initialValue: 'SideTwo', validation: (Rule) => Rule.required() }),
    defineField({ name: 'body', title: 'Artikel', type: 'array', of: [defineArrayMember({ type: 'block', styles: [{ title: 'Normal', value: 'normal' }, { title: 'Überschrift 2', value: 'h2' }, { title: 'Überschrift 3', value: 'h3' }, { title: 'Zitat', value: 'blockquote' }], lists: [{ title: 'Aufzählung', value: 'bullet' }, { title: 'Nummeriert', value: 'number' }], marks: { annotations: [{ name: 'link', title: 'Link', type: 'object', fields: [{ name: 'href', title: 'URL', type: 'url', validation: (Rule) => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }) }] }]} }), defineArrayMember({ type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alternativtext', type: 'string', validation: (Rule) => Rule.required().max(140) }] })] }),
    defineField({ name: 'seoTitle', title: 'SEO-Titel', type: 'string', description: 'Optional. Sonst wird der Beitragstitel verwendet.', validation: (Rule) => Rule.max(60) }),
    defineField({ name: 'seoDescription', title: 'SEO-Beschreibung', type: 'text', rows: 3, description: 'Optional. Sonst wird die Kurzbeschreibung verwendet.', validation: (Rule) => Rule.max(160) }),
  ],
  preview: { select: { title: 'title', subtitle: 'publishedAt', media: 'mainImage' } },
})
