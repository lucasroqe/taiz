// No seu arquivo de CLI
import { Command } from 'commander'
import { addPackage } from './commands'

const program = new Command()

program.name('cli nextjs').description('Test CLI').version('0.1.0')
program
  .command('init')
  .description('Create project')
  .option('-e, --empty', 'generate without any ui')
  .action((options) => addPackage(options))

program.parse(process.argv)
