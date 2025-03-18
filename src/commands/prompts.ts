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