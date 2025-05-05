import fs from 'fs';
import path from 'path';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

export const handleCompression = async (command, args, currentDir) => {
  if (!args[0] || !args[1]) {
    throw new Error('Invalid input');
  }

  const source = path.resolve(currentDir, args[0]);
  const destination = path.resolve(currentDir, args[1]);

  return new Promise((resolve) => {
    const input = fs.createReadStream(source);
    const output = fs.createWriteStream(destination);

    const onError = () => {
      console.log('Operation failed');
      resolve(currentDir);
    };

    input.on('error', onError);
    output.on('error', onError);

    const stream =
      command === 'compress'
        ? input.pipe(createBrotliCompress()).pipe(output)
        : input.pipe(createBrotliDecompress()).pipe(output);

    stream.on('finish', () => resolve(currentDir));
  });
};
