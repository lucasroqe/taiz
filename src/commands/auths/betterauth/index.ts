import { exec } from 'child_process'
import { addBetterAuthInstance } from './generator.js'

import { getPackageManagerCommand } from '../../package-command.js'

const packageManager = getPackageManagerCommand()

export async function addAuth(projectName: string, db: string) {
  await new Promise((resolve, reject) => {
    exec(`${packageManager.add} better-auth`, { cwd: projectName }, (error) => {
      if (error) return reject(error)
      addBetterAuthInstance(projectName, db)
      resolve('')
    })
  })

  await new Promise((resolve, reject) => {
    exec(
      `${packageManager.dlx} @better-auth/cli generate -y`,
      { cwd: projectName },
      (error) => {
        if (error) return reject(error)
        resolve('')
      },
    )
  })
}
