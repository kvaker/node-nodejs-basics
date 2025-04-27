import { spawn } from 'child_process';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

const spawnChildProcess = async (args) => {
  const scriptPath = resolve(__dirname, 'files', 'script.js'); 

  const child = spawn('node', [scriptPath, ...args]);

  process.stdin.pipe(child.stdin);

  child.stdout.pipe(process.stdout);

  child.stderr.pipe(process.stderr);

  child.on('close', (code) => {
    console.log(`Дочерний процесс завершился с кодом ${code}`);
  });
};

spawnChildProcess(['arg1', 'arg2']);
