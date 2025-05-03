import os from 'os';
import readline from 'readline';
import { homedir } from 'os';
import { handleCommand } from './commands/index.js';

const usernameArg = process.argv.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'Аноним';
let currentDir = homedir();

console.log(`Добро пожаловать в файловый менеджер, ${username}!`);
console.log(`Вы находитесь в ${currentDir}`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

const exit = () => {
  console.log(`Спасибо за использование файлового менеджера, ${username}, до свидания!`);
  process.exit(0);
};

rl.prompt();

rl.on('line', async (input) => {
  const command = input.trim();

  if (command === '.exit') {
    exit();
  } else {
    currentDir = await handleCommand(command, currentDir);
    console.log(`Вы находитесь в ${currentDir}`);
    rl.prompt();
  }
});

process.on('SIGINT', exit);
