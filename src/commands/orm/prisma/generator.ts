import path from 'path'
import fs from 'fs'

export const addScriptsToPackageJsonPrisma = (projectName: string) => {
  const packageJsonPath = path.join(projectName, 'package.json')

  if (!fs.existsSync(packageJsonPath)) {
    console.error(`package.json not found at ${packageJsonPath}`)
    return
  }

  try {
    // Read package.json
    const packageJsonData = fs.readFileSync(packageJsonPath, 'utf-8')

    // Tranform to JSON
    const packageJson = JSON.parse(packageJsonData)

    const newItems = {
      'db:generate': 'prisma generate',
      'db:push': 'prisma db push',
      'db:migrate': 'prisma migrate dev'
    }

    packageJson.scripts = {
      ...packageJson.scripts,
      ...newItems,
    }

    const updatedPackageJsonData = JSON.stringify(packageJson, null, 2)

    fs.writeFileSync(packageJsonPath, updatedPackageJsonData)
  } catch (error) {
    console.error('Error updating package.json:', error)
  }
}

export const addSchemaToPrisma = (projectName: string) => {
  const schemaPath = path.join(projectName, 'prisma', 'schema.prisma')

  const modelUser = `
  model User {
  id    String @id @default(uuid())
  email String @unique
  name  String?
}
`
  fs.appendFileSync(schemaPath, '' + modelUser + '')
}
