const projectClosingCopy = Object.freeze({
  Webseite: 'Deine Website-Idee ist bei uns.',
  Automatisierung: 'Zeit, ein paar Abläufe einfacher zu machen.',
  'KI-Agenten': 'Deine KI-Idee ist bei uns.',
  'Social Media Betreuung': 'Zeit für Content, der nicht nach Pflichtprogramm aussieht.',
  'Noch nicht sicher': 'Kein Problem – finden wir gemeinsam heraus.',
})

export function firstNameFromContactName(name) {
  if (typeof name !== 'string') return ''
  return name.trim().split(/\s+/u)[0] || ''
}

export function contactSuccessContent({ name, projectType }) {
  const firstName = firstNameFromContactName(name)
  const thankYou = firstName ? `Danke, ${firstName}.` : 'Danke!'
  return {
    acknowledgement: `${thankYou} Deine Anfrage für ${projectType} ist bei uns angekommen. Wir schauen uns dein Projekt an und melden uns persönlich bei dir.`,
    closing: projectClosingCopy[projectType] ?? projectClosingCopy['Noch nicht sicher'],
  }
}
