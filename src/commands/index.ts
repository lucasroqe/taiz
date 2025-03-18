#!/usr/bin/env node

import { exec } from 'child_process'
import chalk from 'chalk'
import { askFramework, askProjectName, askOrm, askDb, askAuth } from './prompts'
import ora from 'ora'
import { addPrisma } from './orm/prisma'
import { addAuth } from './auths/betterauth'

const promptUser = async () => {
  const projectName = await askProjectName()
  const framework = await askFramework()
  const orm = await askOrm()
  const db = await askDb()
  const auth = await askAuth()

  return { projectName, framework, orm, db, auth }
}

const spinner = ora()

export const addPackage = async () => {
  console.log(chalk.bgMagenta('Creating NextJS project...'))

  try {
    const answer = await promptUser()
    spinner.start()

    if (answer.framework === 'nextjs') {
      spinner.start('Installing NextJS...')
      await new Promise((resolve, reject) => {
        exec(
          `pnpm dlx create-next-app@latest ${answer.projectName} --yes --tailwind --eslint --app --ts --empty`,
          (error, stdout) => {
            if (error) return reject(error)
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
  } catch (error) {
    console.error(chalk.red('Error creating project:'), error)
    process.exit(1)
  }
}
