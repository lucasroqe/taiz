import path from 'path'
import fs from 'fs'

export const addScriptsToPackageJsonPrisma = (projectName: string) => {
  // Package.json path, using projetcs name
  const packageJsonPath = path.resolve(projectName, 'package.json')

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
