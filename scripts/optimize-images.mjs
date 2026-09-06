import { execFileSync } from 'node:child_process'
import { mkdirSync, statSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')

const HERO = {
  source: 'src/assets/Bannerpicture.png',
  outDir: 'public/hero',
  basename: 'hero',
  widths: [1440, 720],
  formats: ['avif', 'webp'],
  quality: { avif: 55, webp: 72 },
  flatten: true,
}

const INLINE = [
  { source: 'src/assets/mockup.png', quality: 78 },
  { source: 'src/assets/websiteDesign3.png', quality: 80 },
]

function requireBinaries() {
  const missing = ['magick', 'avifenc'].filter((bin) => {
    try {
      execFileSync('which', [bin], { stdio: 'ignore' })
      return false
    } catch {
      return true
    }
  })

  if (missing.length) {
    throw new Error(`Missing required binaries: ${missing.join(', ')}. Install ImageMagick and libavif-bin.`)
  }
}

function kb(path) {
  return `${(statSync(path).size / 1024).toFixed(1)} KB`
}

function encode(sourcePath, outPath, format, quality, { width, flatten } = {}) {
  mkdirSync(dirname(outPath), { recursive: true })

  const magickArgs = [sourcePath]
  if (flatten) magickArgs.push('-background', 'black', '-alpha', 'remove', '-alpha', 'off')
  if (width) magickArgs.push('-resize', `${width}x`)
  magickArgs.push('-filter', 'Lanczos')

  if (format === 'webp') {
    execFileSync('magick', [...magickArgs, '-quality', String(quality), outPath])
    return
  }

  const staging = `${outPath}.staging.png`
  execFileSync('magick', [...magickArgs, staging])
  try {
    execFileSync('avifenc', ['-q', String(quality), '-s', '4', staging, outPath], { stdio: 'ignore' })
  } finally {
    rmSync(staging, { force: true })
  }
}

requireBinaries()

const source = resolve(ROOT, HERO.source)
console.log(`${HERO.source} (${kb(source)})`)

for (const width of HERO.widths) {
  for (const format of HERO.formats) {
    const outPath = resolve(ROOT, HERO.outDir, `${HERO.basename}-${width}.${format}`)
    encode(source, outPath, format, HERO.quality[format], { width, flatten: HERO.flatten })
    console.log(`  -> ${HERO.outDir}/${HERO.basename}-${width}.${format} (${kb(outPath)})`)
  }
}

for (const { source: rel, quality } of INLINE) {
  const input = resolve(ROOT, rel)
  const outPath = input.replace(/\.png$/, '.webp')
  encode(input, outPath, 'webp', quality)
  console.log(`${rel} (${kb(input)})\n  -> ${rel.replace(/\.png$/, '.webp')} (${kb(outPath)})`)
}
