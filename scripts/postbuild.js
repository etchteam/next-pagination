const fs = require('fs')
const path = require('path')

const dist = path.join(__dirname, '..', 'dist')

const renameMap = [
  ['index.tsx.js', 'index.js'],
  ['index.tsx.js.map', 'index.js.map'],
  ['index.tsx.modern.js', 'index.modern.js'],
  ['index.tsx.modern.js.map', 'index.modern.js.map'],
  ['index.tsx.css', 'index.css'],
  ['app.tsx.js', 'app.js'],
  ['app.tsx.js.map', 'app.js.map'],
  ['app.tsx.modern.js', 'app.modern.js'],
  ['app.tsx.modern.js.map', 'app.modern.js.map'],
  ['pages.tsx.js', 'pages.js'],
  ['pages.tsx.js.map', 'pages.js.map'],
  ['pages.tsx.modern.js', 'pages.modern.js'],
  ['pages.tsx.modern.js.map', 'pages.modern.js.map']
]

function renameBundles() {
  for (const [from, to] of renameMap) {
    const src = path.join(dist, from)
    if (!fs.existsSync(src)) continue
    fs.renameSync(src, path.join(dist, to))
  }
  for (const file of fs.readdirSync(dist)) {
    if (!file.endsWith('.map')) continue
    const p = path.join(dist, file)
    const json = JSON.parse(fs.readFileSync(p, 'utf8'))
    if (typeof json.file === 'string') {
      json.file = json.file.replace(/\.tsx\./g, '.')
      fs.writeFileSync(p, JSON.stringify(json))
    }
  }
}

function copyDeclarations() {
  const srcDir = path.join(dist, 'src')
  if (!fs.existsSync(srcDir)) return

  const walk = (dir, base) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const from = path.join(dir, entry.name)
      const rel = path.join(base, entry.name)
      const to = path.join(dist, rel)
      if (entry.isDirectory()) {
        fs.mkdirSync(to, { recursive: true })
        walk(from, rel)
      } else if (entry.name.endsWith('.d.ts')) {
        fs.copyFileSync(from, to)
      }
    }
  }
  walk(srcDir, '')
}

function cleanStale() {
  const staleEntries = ['src', 'tests', 'playwright.config.d.ts']
  for (const name of staleEntries) {
    const p = path.join(dist, name)
    if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true })
  }
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(p)
      } else if (entry.name.endsWith('.test.d.ts')) {
        fs.rmSync(p)
      }
    }
  }
  walk(dist)
}

const DIRECTIVE = "'use client';\n"
const ESM_MARKER = "Object.defineProperty(exports, '__esModule', { value: true });\n"

function patch(file, { addDirective, addEsModule }) {
  if (!fs.existsSync(file)) {
    throw new Error(
      `postbuild: expected build output at ${file}. ` +
      'Did the microbundle build run? Did its output filename change?'
    )
  }
  const contents = fs.readFileSync(file, 'utf8')
  const hasDirective =
    contents.startsWith("'use client'") || contents.startsWith('"use client"')
  const hasEsModule = contents.includes('__esModule')
  let prefix = ''
  if (addDirective && !hasDirective) prefix += DIRECTIVE
  if (addEsModule && !hasEsModule) prefix += ESM_MARKER
  if (!prefix) {
    console.log(`postbuild: ${path.relative(process.cwd(), file)} already patched`)
    return
  }
  fs.writeFileSync(file, prefix + contents)
  console.log(`postbuild: patched ${path.relative(process.cwd(), file)}`)
}

renameBundles()
copyDeclarations()
cleanStale()

// Root bundle re-exports both adapters. Keep `'use client'` so consumers using
// `import { AppPagination } from '@etchteam/next-pagination'` (the back-compat
// path) get a valid client-component boundary. Pages-only consumers should
// import from `@etchteam/next-pagination/pages` to opt out of the directive.
// CJS bundles need the `__esModule` marker so default-import interop resolves
// `exports.default` instead of the whole exports object.
patch(path.join(dist, 'index.js'), { addDirective: true, addEsModule: true })
patch(path.join(dist, 'index.modern.js'), { addDirective: true, addEsModule: false })

// App-router-only entry: same as root but no cross-router footprint.
patch(path.join(dist, 'app.js'), { addDirective: true, addEsModule: true })
patch(path.join(dist, 'app.modern.js'), { addDirective: true, addEsModule: false })

// Pages-router-only entry: no `'use client'` (pages router has no server/client
// component split). CJS still needs the `__esModule` marker for default-import
// interop.
patch(path.join(dist, 'pages.js'), { addDirective: false, addEsModule: true })
patch(path.join(dist, 'pages.modern.js'), { addDirective: false, addEsModule: false })
