import { input, select, Separator } from '@inquirer/prompts'

export const askProjectName = async () => {
  return await input({ message: 'Enter the project name:' })
}

export const askFramework = async () => {
  return await select({
    message: 'Select a framework:',
    choices: [
      {
        name: 'NextJS',
        value: 'nextjs',
      },
      new Separator(),
      { name: 'Vite', value: 'vite', disabled: true },
    ],
  })
}

export const askOrm = async () => {
  return await select({
    message: 'Select an ORM:',
    choices: [
      {
        name: 'Prisma',
        value: 'prisma',
      },
      new Separator(),
      { name: 'Drizzle', value: 'drizzle', disabled: true },
    ],
  })
}

export const askDb = async () => {
  return await select({
    message: 'Select a database:',
    choices: [
      {
        name: 'SQLite',
        value: 'sqlite',
      },
      {
        name: 'PostgreSQL',
        value: 'postgresql',
      },
      new Separator(),
      { name: 'MySQL', value: 'mysql', disabled: true },
    ],
  })
}

export const askAuth = async () => {
  return await select({
    message: 'Select a database:',
    choices: [
      {
        name: 'BetterAuth',
        value: 'betterauth',
      },
      new Separator(),
      {
        name: 'AuthJS',
        value: 'authjS',
        disabled: true,
      },
    ],
  })
}

export const askUi = async () => {
  return await select({
    message: 'Select a component library:',
    choices: [
      {
        name: 'Shadcn/UI',
        value: 'shadcnui',
      },
    ],
  })
}

export const askBaseColor = async () => {
  return await select({
    message: 'Which color would you like to use as the base color?',
    choices: [
      {
        name: 'Neutral',
        value: 'neutral',
      },
      {
        name: 'Gray',
        value: 'gray',
      },
      {
        name: 'Zinc',
        value: 'zinc',
      },
      {
        name: 'Stone',
        value: 'stone',
      },
      {
        name: 'Slate',
        value: 'slate',
      },
    ],
  })
}
