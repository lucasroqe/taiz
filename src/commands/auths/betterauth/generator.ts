import {
  createAuthFile,
  createClientInstanceFile,
  createEnvAuth,
  createMountHandlerFile,
} from './files'

export const addBetterAuthInstance = async (
  projectName: string,
  db: string,
) => {
  createEnvAuth(projectName)
  createAuthFile(projectName, db)
  createMountHandlerFile(projectName)
  createClientInstanceFile(projectName)

  return true
}
