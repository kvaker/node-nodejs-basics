import fs from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

const write = async () => {
  const filePath = resolve(__dirname, 'files', 'fileToWrite.txt');
  const writableStream = fs.createWriteStream(filePath);

  console.log('Ожидаю ввода данных...');
  
  process.stdin.on('data', (chunk) => {
    console.log('Получены данные:', chunk.toString());
  });

  process.stdin.pipe(writableStream);

  process.stdin.on('end', () => {
    console.log('Запись завершена.');
  });
};

await write();
