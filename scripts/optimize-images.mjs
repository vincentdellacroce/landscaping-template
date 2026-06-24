// One-off: shrink + recompress the town-page photos in /public/landscape.
// Resizes to max 1600px wide, normalizes every format to progressive JPEG.
// Run: node scripts/optimize-images.mjs
import { readdir, readFile, writeFile, unlink, stat } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'
import sharp from 'sharp'

const DIR = new URL('../public/landscape/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

const kb = (n) => `${(n / 1024).toFixed(0)} KB`

const files = (await readdir(DIR)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
let before = 0
let after = 0

for (const file of files) {
  const src = join(DIR, file)
  const input = await readFile(src)
  before += input.length

  const out = await sharp(input)
    .rotate() // respect EXIF orientation
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true, progressive: true })
    .toBuffer()

  const target = join(DIR, basename(file, extname(file)) + '.jpg')
  await writeFile(target, out)
  after += out.length

  // Remove the original if it wasn't already a .jpg (png/webp/jpeg).
  if (extname(file).toLowerCase() !== '.jpg') await unlink(src)

  console.log(`${file.padEnd(14)} ${kb(input.length).padStart(8)} -> ${kb(out.length).padStart(8)}`)
}

console.log(`\nTotal: ${kb(before)} -> ${kb(after)}  (${(100 - (after / before) * 100).toFixed(0)}% smaller)`)
