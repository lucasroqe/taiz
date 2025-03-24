import { exec } from 'child_process'
import { addBetterAuthInstance } from './generator.js'

export async function addAuth(projectName: string, db: string) {
  await new Promise((resolve, reject) => {
    exec('pnpm add better-auth', { cwd: projectName }, (error) => {
      if (error) return reject(error)
      addBetterAuthInstance(projectName, db)
      resolve('')
    })
  })

  await new Promise((resolve, reject) => {
    exec(
      'pnpm dlx @better-auth/cli generate -y',
      { cwd: projectName },
      (error) => {
        if (error) return reject(error)
        resolve('')
      },
    )
  })
}
