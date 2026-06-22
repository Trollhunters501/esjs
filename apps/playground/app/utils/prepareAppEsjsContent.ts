const IMPORTAR_REGEX = /^importar\s+.+\s+desde\s+['"][^'"]+['"]\s*;?\s*$/gm

const IMPORT_TERMINAL = 'importar { Terminal } desde "@es-js/terminal"'
const IMPORT_TIZA = 'importar { tiza } desde "@es-js/tiza"'

function hasNamedImport(imports: string, name: string, module: string): boolean {
  const regex = new RegExp(
    `importar\\s+\\{[^}]*\\b${name}\\b[^}]*\\}\\s+desde\\s+['"]${module.replace(/\//g, '\\/')}['"]`,
  )

  return regex.test(imports)
}

function usesIdentifier(code: string, name: string): boolean {
  return new RegExp(`\\b${name}\\b`).test(code)
}

export function prepareAppEsjsContent(code: string): string {
  const imports = code.match(IMPORTAR_REGEX) ?? []
  const body = code.replace(IMPORTAR_REGEX, '').trim()
  const existingImports = imports.join('\n')

  const requiredImports: string[] = []

  if (usesIdentifier(body, 'Terminal') && !hasNamedImport(existingImports, 'Terminal', '@es-js/terminal')) {
    requiredImports.push(IMPORT_TERMINAL)
  }

  if (usesIdentifier(body, 'tiza') && !hasNamedImport(existingImports, 'tiza', '@es-js/tiza')) {
    requiredImports.push(IMPORT_TIZA)
  }

  if (requiredImports.length === 0) {
    return code
  }

  const headerBlock = [...requiredImports, ...imports].join('\n')

  return body ? `${headerBlock}\n\n${body}` : headerBlock
}
