import assert from 'node:assert/strict'
import test from 'node:test'
import { contactFieldLimits, validateContactPayload } from './contact-contract.js'

const valid = { name: 'Élodie van der Meer', email: 'elodie@example.com', company: '', phone: '', message: 'Hallo SideTwo, ich interessiere mich für ein Projekt.', turnstileToken: 'token' }

test('accepts international names and optional company and phone fields', () => {
  const result = validateContactPayload(valid, { requireTurnstile: true })
  assert.equal(result.ok, true)
  assert.equal(result.value.name, 'Élodie van der Meer')
})

test('rejects missing mandatory fields, malformed email and oversized content', () => {
  const result = validateContactPayload({ ...valid, name: ' ', email: 'not-an-email', message: 'x'.repeat(contactFieldLimits.message + 1) })
  assert.equal(result.ok, false)
  assert.ok(result.errors.name)
  assert.ok(result.errors.email)
  assert.ok(result.errors.message)
})

test('rejects CRLF and control-character injection in header-like fields and unknown input', () => {
  assert.equal(validateContactPayload({ ...valid, name: 'Max\r\nBcc: victim@example.com' }).ok, false)
  assert.equal(validateContactPayload({ ...valid, phone: '123\u0000' }).ok, false)
  assert.equal(validateContactPayload({ ...valid, unexpected: 'value' }).ok, false)
})

test('requires a bounded Turnstile token only when the protected workflow is enabled', () => {
  assert.equal(validateContactPayload({ ...valid, turnstileToken: '' }, { requireTurnstile: true }).ok, false)
  assert.equal(validateContactPayload({ ...valid, turnstileToken: '' }, { requireTurnstile: false }).ok, true)
})
