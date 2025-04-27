import fs from 'fs';
import zlib from 'zlib';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const compressedFilePath = resolve(__dirname, 'files', 'archive.gz');
  const outputFilePath = resolve(__dirname, 'files', 'fileToCompress.txt');

  const fileReadStream = fs.createReadStream(compressedFilePath);
  const fileWriteStream = fs.createWriteStream(outputFilePath);
  const gunzip = zlib.createGunzip();

  fileReadStream.pipe(gunzip).pipe(fileWriteStream);

  fileWriteStream.on('finish', () => {
    console.log('Файл успешно распакован в fileToCompress.txt');
  });

  fileReadStream.on('error', (err) => console.error('Ошибка чтения файла:', err.message));
  fileWriteStream.on('error', (err) => console.error('Ошибка записи файла:', err.message));
};

await decompress();
