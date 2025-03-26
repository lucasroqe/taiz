import { exec } from 'child_process'
import {
  addSchemaToPrisma,
  addScriptsToPackageJsonPrisma,
} from './generator.js'
import { getPackageManagerCommand } from '../../package-command.js'

const packageManager = getPackageManagerCommand()

export async function addPrisma(projectName: string, db: string) {
  await new Promise((resolve, reject) => {
    exec(
      `${packageManager.add} prisma @prisma/client -D`,
      { cwd: projectName },
      (error) => {
        if (error) return reject(error)
        resolve('')
      },
    )
  })

  await new Promise((resolve, reject) => {
    exec(
      `${packageManager.dlx} prisma init --datasource-provider ${db}`,
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
    exec(
      `${packageManager.dlx} prisma generate`,
      { cwd: projectName },
      (error) => {
        if (error) return reject(error)
        resolve('')
      },
    )
  })
}
