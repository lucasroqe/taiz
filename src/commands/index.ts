#!/usr/bin/env node

import { exec } from 'child_process'
import chalk from 'chalk'
import {
  askFramework,
  askProjectName,
  askOrm,
  askDb,
  askAuth,
  askUi,
  askBaseColor,
} from './prompts'
import ora from 'ora'
import { addPrisma } from './orm/prisma'
import { addAuth } from './auths/betterauth'
import { addUi } from './uiLib'
import { addAuthFormComponent } from './misc/authForm/generators'
import { addHomePageComponent } from './misc/hero/generators'
import figlet from 'figlet'
import gradient from 'gradient-string'

const promptUser = async () => {
  const projectName = await askProjectName()
  const framework = await askFramework()
  const orm = await askOrm()
  const db = await askDb()
  const auth = await askAuth()
  const ui = await askUi()
  const color = await askBaseColor()

  return { projectName, framework, orm, db, auth, ui, color }
}

const spinner = ora()

export const addPackage = async () => {
  const lilacGradient = gradient([
    { color: '#D8BFD8', pos: 0 },
    { color: '#E6E6FA', pos: 0.5 },
    { color: '#EBB7EB', pos: 1 },
  ])

  console.log(lilacGradient(figlet.textSync('Taiz', { font: 'ANSI Shadow' })))

  try {
    const answer = await promptUser()
    spinner.start()
    const start = Date.now()
    if (answer.framework === 'nextjs') {
      spinner.start('Installing NextJS...')
      await new Promise((resolve, reject) => {
        exec(
          `pnpm dlx create-next-app@latest ${answer.projectName} --yes --tailwind --eslint --app --ts --empty`,
          (error, stdout, stderr) => {
            if (error) {
              console.error(chalk.red('Error installing NextJS:'), stderr)
              return reject(error)
            }
            resolve(stdout)
          },
        )
      })
      spinner.succeed('NextJS installed successfully!')
    }

    if (answer.orm === 'prisma') {
      spinner.start(
        `Installing Prisma and configuring the database (${answer.db.toUpperCase()})...`,
      )
      await addPrisma(answer.projectName, answer.db)
      spinner.succeed(`Prisma configured successfully!`)
    }

    if (answer.auth === 'betterauth') {
      spinner.start('Installing BetterAuth...')
      await addAuth(answer.projectName, answer.db)
      spinner.succeed('BetterAuth installed successfully!')
    }

    if (answer.ui === 'shadcnui') {
      spinner.start(`Adding Shadcn/UI with the base color ${answer.color}...`)
      await addUi(answer.projectName, answer.color)
      spinner.succeed('Shadcn/UI added successfully!')
    }

    spinner.start(
      'Installing additional configs (React Hook Form, Zod, etc)...',
    )
    await new Promise((resolve, reject) => {
      exec(
        `pnpm add zod react-hook-form lucide-react`,
        { cwd: answer.projectName },
        (error) => {
          if (error) return reject(error)
          resolve('')
        },
      )
    })
    addAuthFormComponent(answer.projectName)
    addHomePageComponent(answer.projectName)
    spinner.succeed('Additional dependencies installed successfully!')
    const end = Date.now()
    const duration = ((end - start) / 1000).toFixed(2)

    console.log('\n🎉 Project setup complete! 🚀')
    console.log(chalk.bgGreen(`\nAll ready in ${duration} seconds`))

    console.log('\nTo get started:')
    console.log(`1. Navigate to ` + chalk.blue.bold(`${answer.projectName}`))
    console.log(
      `2. Edit your ` + chalk.blue.bold(`BETTER_AUTH_SECRET`) + ` in .env`,
    )
    console.log(
      '3. Run ' + chalk.blue.bold('pnpm prisma migrate dev --name "init"'),
    )
    console.log('4. Run ' + chalk.blue.bold('pnpm run dev'))
    console.log(
      '5. Open ' +
        chalk.blue.bold('http://localhost:3000') +
        ` in your browser`,
    )

    console.log('\nHappy coding!\n')

    console.log(chalk.yellow('Notes:'))
    console.log(
      '- Zod is already installed. Feel free to create validations for the auth form.',
    )
    console.log(
      '- Found an issue? Report it at: ' +
        chalk.blue('https://github.com/lucasroqe/taiz'),
    )
  } catch (error) {
    console.error(chalk.red('Error creating project: '), error)
    process.exit(1)
  }
}
