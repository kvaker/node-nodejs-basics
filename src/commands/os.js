import os from 'os';

export const handleOS = async (args) => {
  const option = args[0];

  if (!option) {
    console.log('Пожалуйста, укажите флаг. Доступные флаги:\n  --EOL\n  --cpus\n  --homedir\n  --username\n  --architecture');
    return process.cwd();
  }

  switch (option) {
    case '--EOL':
      console.log(JSON.stringify(os.EOL));
      break;

    case '--cpus':
      const cpus = os.cpus();
      console.log(`Количество ядер: ${cpus.length}`);
      cpus.forEach((cpu, index) => {
        console.log(`Ядро #${index + 1}: ${cpu.model}, ${(cpu.speed / 1000).toFixed(2)} GHz`);
      });
      break;

    case '--homedir':
      console.log(os.homedir());
      break;

    case '--username':
      console.log(os.userInfo().username);
      break;

    case '--architecture':
      console.log(process.arch);
      break;

    default:
      console.log('Недопустимый флаг. Используйте один из: --EOL, --cpus, --homedir, --username, --architecture');
  }

  return process.cwd();
};
