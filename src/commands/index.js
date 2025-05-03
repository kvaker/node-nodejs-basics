import { handleNavigation } from './navigation.js';
import { handleOS } from './os.js';
import { handleFile } from './file.js';
import { handleHash } from './hash.js';
import { handleCompression } from './compression.js';

export const handleCommand = async (commandLine, currentDir) => {
  const [command, ...args] = commandLine.split(' ');

  try {
    switch (command) {
      case 'up':
      case 'cd':
      case 'ls':
        return await handleNavigation(command, args, currentDir);
      case 'cat':
      case 'add':
      case 'rn':
      case 'cp':
      case 'mv':
      case 'rm':
      case 'mkdir':
        return await handleFile(command, args, currentDir);
      case 'os':
        return await handleOS(args);
      case 'hash':
        return await handleHash(args, currentDir);
      case 'compress':
      case 'decompress':
        return await handleCompression(command, args, currentDir);
      default:
        console.log('Недопустимый ввод');
    }
  } catch (e) {
    console.log('Операция не выполнена');
  }

  return currentDir;
};
