import { input, select } from '@inquirer/prompts'

export const askProjectName = async () => {
  return await input({
    message: 'Enter the project name:',
    validate: (value) => {
      if (!value.trim()) {
        return 'Project name cannot be empty. Please enter a valid name.'
      }
      if (!/^[a-zA-Z0-9-_]+$/.test(value)) {
        return 'Project name can only contain letters, numbers, dashes (-), and underscores (_).'
      }
      return true
    },
  })
}

export const askFramework = async () => {
  return await select({
    message: 'Select a framework:',
    choices: [
      {
        name: 'NextJS',
        value: 'nextjs',
      },
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
      // { name: 'Drizzle', value: 'drizzle', disabled: true },
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
      // { name: 'MySQL', value: 'mysql', disabled: true },
    ],
  })
}

export const askAuth = async () => {
  return await select({
    message: 'Select an authentication method:',
    choices: [
      {
        name: 'BetterAuth',
        value: 'betterauth',
      },
      // {
      //   name: 'AuthJS',
      //   value: 'authjS',
      //   disabled: true,
      // },
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
