const EMAILS_COLUMN = 'emails'
const EMAILS_COLUMN_FALLBACK_INDEX = 2

/** Minimal RFC-style CSV row parser (handles quoted fields). */
function parseCsvRows(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"'
        i++
      } else if (char === '"') {
        inQuotes = false
      } else {
        field += char
      }
      continue
    }

    if (char === '"') {
      inQuotes = true
      continue
    }

    if (char === ',') {
      row.push(field)
      field = ''
      continue
    }

    if (char === '\r' && next === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
      i++
      continue
    }

    if (char === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
      continue
    }

    field += char
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ''))
}

function normalizeHeader(cell: string): string {
  return cell.trim().toLowerCase().replace(/\s+/g, '_')
}

function normalizeEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase()
  if (!email) return null
  if (!email.includes('@')) return null
  return email
}

function findEmailsColumnIndex(headers: string[]): number {
  const byName = headers.findIndex(
    (h) => normalizeHeader(h) === EMAILS_COLUMN,
  )
  if (byName >= 0) return byName
  if (headers.length > EMAILS_COLUMN_FALLBACK_INDEX) {
    return EMAILS_COLUMN_FALLBACK_INDEX
  }
  return -1
}

export function parseRosterCsvText(text: string): string[] {
  const rows = parseCsvRows(text)
  if (rows.length === 0) {
    throw new Error('The CSV file is empty.')
  }

  const [headerRow, ...dataRows] = rows
  const emailsIndex = findEmailsColumnIndex(headerRow)

  if (emailsIndex < 0) {
    throw new Error(
      'Could not find an "emails" column. Expected a header named emails (third column).',
    )
  }

  const seen = new Set<string>()
  const emails: string[] = []

  for (const row of dataRows) {
    const cell = row[emailsIndex] ?? ''
    const email = normalizeEmail(cell)
    if (!email || seen.has(email)) continue
    seen.add(email)
    emails.push(email)
  }

  if (emails.length === 0) {
    throw new Error('No valid email addresses found in the emails column.')
  }

  return emails
}

export async function parseRosterCsvFile(file: File): Promise<string[]> {
  if (!file.name.toLowerCase().endsWith('.csv')) {
    throw new Error('Please upload a CSV file.')
  }

  const text = await file.text()
  return parseRosterCsvText(text)
}
