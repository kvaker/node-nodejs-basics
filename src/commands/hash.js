import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';

export const handleHash = async (args, currentDir) => {
  if (!args[0]) {
    console.log('Specify the path to the file');
    return currentDir;
  }

  const filePath = path.resolve(currentDir, args[0]);

  return new Promise((resolve, reject) => {
    const hash = createHash('sha256');
    const stream = fs.createReadStream(filePath);

    stream.on('error', () => {
      console.log('Operation failed');
      resolve(currentDir);
    });

    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => {
      const result = hash.digest('hex');
      console.log(result);
      resolve(currentDir);
    });
  });
};
