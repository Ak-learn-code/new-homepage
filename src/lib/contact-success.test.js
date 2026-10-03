import assert from 'node:assert/strict'
import test from 'node:test'
import { contactSuccessContent, firstNameFromContactName } from './contact-success.js'

test('uses the first name and selected project type in the success copy', () => {
  const content = contactSuccessContent({ name: 'Max Mustermann', projectType: 'Webseite' })
  assert.match(content.acknowledgement, /^Danke, Max\./)
  assert.match(content.acknowledgement, /für Webseite/)
  assert.equal(content.closing, 'Deine Website-Idee ist bei uns.')
})

test('uses the anonymous fallback when no reliable first name is available', () => {
  assert.equal(firstNameFromContactName('  '), '')
  assert.match(contactSuccessContent({ name: '', projectType: 'Automatisierung' }).acknowledgement, /^Danke!/) 
})

test('provides the approved closing copy for every allowed project type', () => {
  const expected = {
    Webseite: 'Deine Website-Idee ist bei uns.',
    Automatisierung: 'Zeit, ein paar Abläufe einfacher zu machen.',
    'KI-Agenten': 'Deine KI-Idee ist bei uns.',
    'Social Media Betreuung': 'Zeit für Content, der nicht nach Pflichtprogramm aussieht.',
    'Noch nicht sicher': 'Kein Problem – finden wir gemeinsam heraus.',
  }
  for (const [projectType, closing] of Object.entries(expected)) assert.equal(contactSuccessContent({ name: 'Alex', projectType }).closing, closing)
})
