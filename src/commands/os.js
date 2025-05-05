import os from 'os';

export const handleOS = async (args) => {
  const option = args[0];

  if (!option) {
    console.log('Please specify a flag. Available flags: \n  --EOL\n  --cpus\n  --homedir\n  --username\n  --architecture');
    return process.cwd();
  }

  switch (option) {
    case '--EOL':
      console.log(JSON.stringify(os.EOL));
      break;

    case '--cpus':
      const cpus = os.cpus();
      console.log(`Number of cores: ${cpus.length}`);
      cpus.forEach((cpu, index) => {
        console.log(`Core #${index + 1}: ${cpu.model}, ${(cpu.speed / 1000).toFixed(2)} GHz`);
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
      console.log('Invalid flag. Use one of: --EOL, --cpus, --homedir, --username, --architecture');
  }

  return process.cwd();
};
