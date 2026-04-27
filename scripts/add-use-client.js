const fs = require('fs')
const path = require('path')

const DIRECTIVE = "'use client';\n"
const ESM_MARKER = "Object.defineProperty(exports, '__esModule', { value: true });\n"

function patch(file, { addDirective, addEsModule }) {
  if (!fs.existsSync(file)) return
  const contents = fs.readFileSync(file, 'utf8')
  const hasDirective =
    contents.startsWith("'use client'") || contents.startsWith('"use client"')
  const hasEsModule = contents.includes('__esModule')
  let prefix = ''
  if (addDirective && !hasDirective) prefix += DIRECTIVE
  if (addEsModule && !hasEsModule) prefix += ESM_MARKER
  if (!prefix) return
  fs.writeFileSync(file, prefix + contents)
}

const root = path.join(__dirname, '..')
// CJS bundle needs both: 'use client' for Next.js to treat the module as a
// client component (microbundle strips the source directive), and the
// __esModule marker so consumers' default-import interop resolves
// `exports.default` instead of the whole exports object.
patch(path.join(root, 'dist/index.js'), { addDirective: true, addEsModule: true })
// ESM bundle only needs the directive; named/default exports work natively.
patch(path.join(root, 'dist/index.modern.js'), { addDirective: true, addEsModule: false })
