import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SIZE = 800;
const FILL = 0.86;
const maxSide = Math.round(SIZE * FILL);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) out.push(p);
  }
  return out;
}

const files = [
  ...walk('public/products'),
  ...walk('public/categories'),
  ...fs
    .readdirSync('public/common')
    .filter((f) => /^(valvula|aplicaciones)/i.test(f) && /\.(jpe?g|png|webp)$/i.test(f))
    .map((f) => path.join('public/common', f)),
];

const report = [];

for (const file of files) {
  const input = await fs.promises.readFile(file);
  const meta = await sharp(input, { failOn: 'none' }).metadata();

  let trimmed;
  try {
    trimmed = await sharp(input, { failOn: 'none' })
      .trim({ threshold: 18 })
      .toBuffer({ resolveWithObject: true });
  } catch {
    trimmed = { data: input, info: meta };
  }

  const fitted = await sharp(trimmed.data, { failOn: 'none' })
    .resize({ width: maxSide, height: maxSide, fit: 'inside', withoutEnlargement: false })
    .toBuffer({ resolveWithObject: true });

  const left = Math.floor((SIZE - fitted.info.width) / 2);
  const top = Math.floor((SIZE - fitted.info.height) / 2);

  const base = sharp({
    create: { width: SIZE, height: SIZE, channels: 3, background: '#ffffff' },
  }).composite([{ input: fitted.data, left, top }]);

  const out = /\.webp$/i.test(file)
    ? await base.webp({ quality: 84 }).toBuffer()
    : await base.jpeg({ quality: 85, mozjpeg: true }).toBuffer();

  const tmp = `${file}.tmp`;
  await fs.promises.writeFile(tmp, out);
  await fs.promises.rename(tmp, file);

  report.push({
    file: file.replaceAll('\\', '/'),
    before: `${meta.width}x${meta.height}`,
    after: `${SIZE}x${SIZE}`,
  });
}

console.log(JSON.stringify({ done: report.length, report }, null, 2));
