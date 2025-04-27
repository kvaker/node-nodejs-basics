import fs from 'fs';
import zlib from 'zlib';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const input = resolve(__dirname, 'files', 'fileToCompress.txt');
  const output = resolve(__dirname, 'files', 'archive.gz');

  const readable = fs.createReadStream(input);
  const writable = fs.createWriteStream(output);
  const gzip = zlib.createGzip();

  readable.pipe(gzip).pipe(writable);

  writable.on('finish', () => {
    console.log('Файл успешно сжат в archive.gz');
  });

  readable.on('error', (err) => console.error('Ошибка чтения файла:', err.message));
  writable.on('error', (err) => console.error('Ошибка записи файла:', err.message));
};

await compress();
