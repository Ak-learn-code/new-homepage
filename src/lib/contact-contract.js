export const contactFieldLimits = Object.freeze({ name: 120, email: 254, company: 160, phone: 40, message: 5000, turnstileToken: 2048 })
export const contactFieldNames = Object.freeze(['name', 'email', 'company', 'phone', 'message', 'turnstileToken'])

const forbiddenControls = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u

function asText(value, { multiline = false } = {}) {
  if (typeof value !== 'string') return null
  if (!multiline && /[\r\n]/.test(value)) return null
  const text = multiline ? value.replace(/\r\n?/g, '\n').trim() : value.trim()
  return forbiddenControls.test(text) ? null : text
}

function isWithinLimit(value, limit) {
  return value.length <= limit
}

/** Shared contract for the browser and the future server-side contact endpoint. */
export function validateContactPayload(payload, { requireTurnstile = false } = {}) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return { ok: false, errors: { form: 'Ungültige Anfrage.' } }
  if (Object.keys(payload).some((key) => !contactFieldNames.includes(key))) return { ok: false, errors: { form: 'Ungültige Anfrage.' } }

  const errors = {}
  const value = {
    name: asText(payload.name),
    email: asText(payload.email),
    company: asText(payload.company ?? ''),
    phone: asText(payload.phone ?? ''),
    message: asText(payload.message, { multiline: true }),
    turnstileToken: asText(payload.turnstileToken ?? ''),
  }

  if (!value.name || !isWithinLimit(value.name, contactFieldLimits.name)) errors.name = 'Bitte gib einen gültigen Namen an.'
  if (!value.email || !isWithinLimit(value.email, contactFieldLimits.email) || !emailPattern.test(value.email)) errors.email = 'Bitte gib eine gültige E-Mail-Adresse an.'
  if (value.company === null || !isWithinLimit(value.company, contactFieldLimits.company)) errors.company = 'Die Firma enthält ungültige Zeichen oder ist zu lang.'
  if (value.phone === null || !isWithinLimit(value.phone, contactFieldLimits.phone)) errors.phone = 'Die Telefonnummer enthält ungültige Zeichen oder ist zu lang.'
  if (!value.message || !isWithinLimit(value.message, contactFieldLimits.message)) errors.message = 'Bitte beschreibe dein Projekt in maximal 5.000 Zeichen.'
  if (value.turnstileToken === null || !isWithinLimit(value.turnstileToken, contactFieldLimits.turnstileToken) || (requireTurnstile && !value.turnstileToken)) errors.turnstileToken = 'Bitte bestätige die Sicherheitsprüfung.'

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value }
}
