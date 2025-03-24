import { exec } from 'child_process'
import {
  addSchemaToPrisma,
  addScriptsToPackageJsonPrisma,
} from './generator.js'

export async function addPrisma(projectName: string, db: string) {
  await new Promise((resolve, reject) => {
    exec('pnpm add prisma @prisma/client -D', { cwd: projectName }, (error) => {
      if (error) return reject(error)
      resolve('')
    })
  })

  await new Promise((resolve, reject) => {
    exec(
      `pnpm dlx prisma init --datasource-provider ${db}`,
      { cwd: projectName },
      (error) => {
        if (error) return reject(error)
        resolve('')
      },
    )
  })

  addScriptsToPackageJsonPrisma(projectName)
  addSchemaToPrisma(projectName)

  await new Promise((resolve, reject) => {
    exec(`pnpm dlx prisma generate`, { cwd: projectName }, (error) => {
      if (error) return reject(error)
      resolve('')
    })
  })
}
