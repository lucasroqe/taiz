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
} from './prompts.js'
import ora from 'ora'
import { addPrisma } from './orm/prisma/index.js'
import { addAuth } from './auths/betterauth/index.js'
import { addUi } from './uiLib/index.js'
import { addAuthFormComponent } from './misc/authForm/generators.js'
import { addHomePageComponent } from './misc/hero/generators.js'
import figlet from 'figlet'
import gradient from 'gradient-string'
import { getPackageManagerCommand } from './package-command.js'

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

export const addPackage = async (options: any) => {
  const spinner = ora()
  const packageManager = getPackageManagerCommand()

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
      spinner.text = `Installing Next.js...`
      spinner.start()
      await new Promise((resolve, reject) => {
        exec(
          `${packageManager.dlx} create-next-app@latest ${answer.projectName} --yes --tailwind --eslint --app --ts --empty`,
          (error) => {
            if (error) return reject(error)
            resolve('')
          },
        )
      })
      spinner.succeed(`Next.js installed successfully!`)
    }

    if (answer.orm === 'prisma') {
      spinner.text = `Installing Prisma and setting up the ${answer.db} database...`
      spinner.start()
      await addPrisma(answer.projectName, answer.db)
      spinner.succeed(`Prisma configured successfully!`)
    }

    if (answer.auth === 'betterauth') {
      spinner.text = `Installing Better Auth...`
      spinner.start()
      await addAuth(answer.projectName, answer.db)
      spinner.succeed(`BetterAuth installed successfully!`)
    }

    if (answer.ui === 'shadcnui') {
      spinner.text = `Adding Shadcn/UI with ${answer.color} as the base color...`
      spinner.start()
      await addUi(answer.projectName, answer.color)
      spinner.succeed('Shadcn/UI added successfully!')
    }

    spinner.text = `Installing additional configs (React Hook Form, Zod, etc)...`
    spinner.start()
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

    if (!options.empty) {
      addAuthFormComponent(answer.projectName)
      addHomePageComponent(answer.projectName)
    }

    spinner.succeed('Additional dependencies installed successfully!')
    const end = Date.now()
    const duration = ((end - start) / 1000).toFixed(2)

    console.log('\n🎉 Project setup is complete! 🚀')
    console.log(chalk.bgGreen(`\nDone in just ${duration} seconds!`))

    if (options.empty) {
      console.log(
        chalk.cyan('\nProject generated without additional UI components.'),
      )
    } else {
      console.log(
        chalk.cyan(
          '\nProject generated with pre-built UI components (auth form and home page).',
        ),
      )
    }

    console.log(chalk.underline('\nTo get started:'))
    console.log(`1. Navigate to ` + chalk.blue.bold(`${answer.projectName}`))
    console.log(`2. Edit .env with your enviroment variables`)
    console.log(
      '3. Run ' + chalk.blue.bold(`${packageManager.package} run db:migrate`),
    )
    console.log(
      '4. Run ' + chalk.blue.bold(`${packageManager.package} run dev`),
    )
    console.log(
      '5. Open ' +
        chalk.blue.bold('http://localhost:3000') +
        ` in your browser.`,
    )

    console.log('\nHappy coding!\n')

    console.log(chalk.yellow('Notes:'))
    console.log(
      '- Zod is already installed. Don’t forget to add validations to the auth form.',
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
