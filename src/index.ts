import { Command } from 'commander'
import { addPackage } from './commands'

const program = new Command()

program.name('cli nextjs').description('Test CLI').version('0.1.0')

program.command('init').description('Create project').action(addPackage)

program.parse(process.argv)
