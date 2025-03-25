export function getPackageManagerCommand() {
  const userAgent = process.env.npm_config_user_agent || ''

  if (userAgent.includes('yarn')) {
    return {
      package: 'yarn',
      add: 'yarn add',
      dlx: 'yarn dlx',
    }
  }

  if (userAgent.includes('pnpm')) {
    return {
      package: 'pnpm',
      add: 'pnpm add',
      dlx: 'pnpm dlx',
    }
  }

  if (userAgent.includes('bun')) {
    return {
      package: 'bun',
      add: 'bun add',
      dlx: 'bunx',
    }
  }

  return {
    package: 'npm',
    add: 'npm install',
    dlx: 'npx',
  }
}
