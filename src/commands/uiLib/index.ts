import { exec } from 'child_process'
import { getPackageManagerCommand } from '../package-command.js'

const packageManager = getPackageManagerCommand()

export async function addUi(projectName: string, color: string) {
  if (packageManager.package === 'npm') {
    await new Promise((resolve, reject) => {
      exec(
        `${packageManager.dlx} shadcn@latest init -s -f -b ${color}`,
        { cwd: projectName },
        (error) => {
          if (error) return reject(error)
          resolve('')
        },
      )
    })

    await new Promise((resolve, reject) => {
      exec(
        `${packageManager.dlx} shadcn@latest add -y -a -s`,
        { cwd: projectName },
        (error) => {
          if (error) return reject(error)
          resolve('')
        },
      )
    })
  } else {
    await new Promise((resolve, reject) => {
      exec(
        `${packageManager.dlx} shadcn@latest init -y -b ${color}`,
        { cwd: projectName },
        (error) => {
          if (error) return reject(error)
          resolve('')
        },
      )
    })

    await new Promise((resolve, reject) => {
      exec(
        `${packageManager.dlx} shadcn@latest add -a -y`,
        { cwd: projectName },
        (error) => {
          if (error) return reject(error)
          resolve('')
        },
      )
    })
  }
}
