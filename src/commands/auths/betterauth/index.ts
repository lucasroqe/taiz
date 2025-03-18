import { exec } from 'child_process'
import { addBetterAuthInstance } from './generator'

export async function addAuth(projectName: string, db: string) {
  return new Promise((resolve, reject) => {
    exec('pnpm add better-auth', { cwd: projectName }, (error) => {
      if (error) return reject(error)
      addBetterAuthInstance(projectName, db)
      resolve('')
    })
  })
}
