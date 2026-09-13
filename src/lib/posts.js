const asset = (path) => `${import.meta.env.BASE_URL}${path}`

export const fallbackPosts = [
  {
    slug: 'was-eine-website-heute-wirklich-leisten-muss',
    title: 'Was eine Website heute wirklich leisten muss',
    excerpt: 'Wie ein digitaler Auftritt verständlich führt, Vertrauen aufbaut und die passenden Anfragen auslöst.',
    readTime: '5 Min. Lesezeit',
    category: 'Websites',
    image: asset('assets/blog/digital-strategy.jpg'),
    publishedAt: '2026-09-01T09:00:00.000Z',
    author: 'SideTwo',
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
    category: 'Strategie',
    image: asset('assets/blog/local-business.jpg'),
    publishedAt: '2026-08-26T09:00:00.000Z',
    author: 'SideTwo',
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
    category: 'Automatisierung',
    image: asset('assets/blog/digital-workflow.jpg'),
    publishedAt: '2026-08-18T09:00:00.000Z',
    author: 'SideTwo',
    body: [
      'Automatisierung ist dann gut, wenn sie Menschen im Team entlastet und Kunden eine verlässliche Erfahrung gibt. Nicht jedes Tool bringt automatisch einen besseren Ablauf.',
      'Deshalb schauen wir vor jeder Umsetzung auf Zuständigkeiten, Ausnahmen und den Moment, an dem persönlicher Kontakt wichtig bleibt. Technik unterstützt den Prozess, sie ersetzt ihn nicht blind.',
    ],
  },
  {
    slug: 'lokale-sichtbarkeit-die-anfragen-bringt',
    title: 'Lokale Sichtbarkeit, die Anfragen bringt',
    excerpt: 'Was eine gute Grundlage für Google, Karten und einen verständlichen ersten Eindruck ausmacht.',
    readTime: '4 Min. Lesezeit',
    category: 'Sichtbarkeit',
    image: asset('assets/projects/krug-das-restaurant.jpg'),
    publishedAt: '2026-08-08T09:00:00.000Z',
    author: 'SideTwo',
    body: ['Lokale Sichtbarkeit entsteht dort, wo ein klarer Auftritt und hilfreiche Informationen zusammenkommen. Genau das macht es einfacher, gefunden und verstanden zu werden.'],
  },
  {
    slug: 'ki-workflows-mit-klarem-auftrag',
    title: 'KI-Workflows mit klarem Auftrag',
    excerpt: 'Wie KI Teams unterstützt, ohne Prozesse unübersichtlich oder unpersönlich zu machen.',
    readTime: '5 Min. Lesezeit',
    category: 'KI',
    image: asset('assets/services/agents-showcase.jpg'),
    publishedAt: '2026-07-29T09:00:00.000Z',
    author: 'SideTwo',
    body: ['KI bringt dann einen Nutzen, wenn ihr Auftrag eindeutig ist. Eine klare Aufgabe, gute Informationen und ein sinnvoller Übergang zum Team machen aus einem Tool echte Unterstützung.'],
  },
  {
    slug: 'ein-digitaler-auftritt-der-zum-team-passt',
    title: 'Ein digitaler Auftritt, der zum Team passt',
    excerpt: 'Warum Gestaltung, Inhalt und Technik nur gemeinsam einen überzeugenden ersten Eindruck schaffen.',
    readTime: '3 Min. Lesezeit',
    category: 'Design',
    image: asset('assets/projects/avci-geruestbau.jpg'),
    publishedAt: '2026-07-17T09:00:00.000Z',
    author: 'SideTwo',
    body: ['Ein überzeugender digitaler Auftritt übersetzt das, was ein Unternehmen ausmacht. Damit er glaubwürdig wirkt, müssen Gestaltung, Sprache und Prozesse zusammenpassen.'],
  },
]

export function normalisePost(post, index = 0) {
  const fallback = fallbackPosts[index % fallbackPosts.length]
  return {
    ...fallback,
    ...post,
    slug: post.slug || fallback.slug,
    image: post.image || fallback.image,
    mainImage: post.mainImage || null,
    readTime: post.readTime || fallback.readTime,
    category: post.category || fallback.category,
    body: post.body || fallback.body,
  }
}
