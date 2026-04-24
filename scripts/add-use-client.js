const fs = require('fs')
const path = require('path')

const DIRECTIVE = "'use client';\n"
const ESM_MARKER = "Object.defineProperty(exports, '__esModule', { value: true });\n"

function prepend(file, snippet) {
  const contents = fs.readFileSync(file, 'utf8')
  if (contents.includes(snippet.trim())) return contents
  const next = snippet + contents
  fs.writeFileSync(file, next)
  return next
}

for (const rel of ['dist/index.js', 'dist/index.modern.js']) {
  const file = path.join(__dirname, '..', rel)
  if (!fs.existsSync(file)) continue
  let contents = fs.readFileSync(file, 'utf8')
  if (!contents.startsWith("'use client'") && !contents.startsWith('"use client"')) {
    contents = DIRECTIVE + contents
    fs.writeFileSync(file, contents)
  }
}

// CJS output needs the __esModule marker so `import X from 'pkg'` picks up
// `.default` instead of the whole exports object when both default + named
// exports exist. microbundle-crl doesn't emit it.
const cjs = path.join(__dirname, '..', 'dist/index.js')
if (fs.existsSync(cjs)) {
  const contents = fs.readFileSync(cjs, 'utf8')
  if (!contents.includes("__esModule")) {
    const lines = contents.split('\n')
    const insertAt = lines[0].startsWith("'use client'") || lines[0].startsWith('"use client"') ? 1 : 0
    lines.splice(insertAt, 0, ESM_MARKER.trim())
    fs.writeFileSync(cjs, lines.join('\n'))
  }
}
