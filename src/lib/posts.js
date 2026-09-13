const asset = (path) => `${import.meta.env.BASE_URL}${path}`

export const fallbackPosts = [
  {
    slug: 'was-eine-website-heute-wirklich-leisten-muss',
    title: 'Was eine Website heute wirklich leisten muss',
    excerpt: 'Wie ein digitaler Auftritt verständlich führt, Vertrauen aufbaut und die passenden Anfragen auslöst.',
    readTime: '5 Min. Lesezeit',
    image: asset('assets/blog/digital-strategy.jpg'),
    body: [
      'Eine gute Website beginnt nicht bei Farben oder Effekten. Sie beginnt bei den Fragen, die Menschen mitbringen, und den Informationen, die ihnen eine klare nächste Entscheidung ermöglichen.',
      'Für lokale Unternehmen bedeutet das: Leistungen verständlich erklären, echte Beispiele zeigen und den Kontakt so leicht machen, dass eine gute Anfrage nicht liegen bleibt.',
    ],
  },
  {
    slug: 'digitalisierung-fuer-lokale-unternehmen',
    title: 'Digitalisierung für lokale Unternehmen: Wo anfangen?',
    excerpt: 'Drei konkrete Stellschrauben, mit denen aus Routine wieder Zeit für Kundinnen und Kunden wird.',
    readTime: '4 Min. Lesezeit',
    image: asset('assets/blog/local-business.jpg'),
    body: [
      'Digitalisierung muss nicht mit einem großen Umbau starten. Oft liegt die größte Wirkung in den kleinen wiederkehrenden Abläufen, die täglich Zeit kosten.',
      'Wir beginnen deshalb mit dem Alltag: Welche Anfrage kommt immer wieder? Wo gehen Informationen verloren? Welche Antwort lässt sich vorbereiten? Daraus entsteht ein erster sinnvoller Schritt.',
    ],
  },
  {
    slug: 'automatisierung-mit-haltung',
    title: 'Automatisierung mit Haltung statt Tool-Sammlung',
    excerpt: 'Warum ein guter Ablauf zuerst verstanden werden muss, bevor er automatisiert wird.',
    readTime: '6 Min. Lesezeit',
    image: asset('assets/blog/digital-workflow.jpg'),
    body: [
      'Automatisierung ist dann gut, wenn sie Menschen im Team entlastet und Kunden eine verlässliche Erfahrung gibt. Nicht jedes Tool bringt automatisch einen besseren Ablauf.',
      'Deshalb schauen wir vor jeder Umsetzung auf Zuständigkeiten, Ausnahmen und den Moment, an dem persönlicher Kontakt wichtig bleibt. Technik unterstützt den Prozess, sie ersetzt ihn nicht blind.',
    ],
  },
]

export function normalisePost(post, index = 0) {
  const fallback = fallbackPosts[index % fallbackPosts.length]
  return {
    ...fallback,
    ...post,
    slug: post.slug || fallback.slug,
    image: post.image || fallback.image,
    readTime: post.readTime || fallback.readTime,
    body: post.body || fallback.body,
  }
}
