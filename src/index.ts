#!/usr/bin/env node

import { Command } from 'commander'
import { addPackage } from './commands/index.js'

const program = new Command()

program
  .name('taiz')
  .description('CLI for scaffolding Next.js projects')
  .version('0.1.0')

program
  .command('init')
  .description('Create project')
  .option('-e, --empty', 'generate without any ui')
  .action((options) => addPackage(options))

program.parse(process.argv)
