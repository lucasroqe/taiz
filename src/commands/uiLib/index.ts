import { exec } from 'child_process'

export async function addUi(projectName: string, color: string) { 
  await new Promise((resolve, reject) => {
    exec(
      `pnpm dlx shadcn@latest init --yes --base-color ${color}`,
      { cwd: projectName },
      (error) => {
        if (error) return reject(error)
        resolve('')
      },
    )
  })

  await new Promise((resolve, reject) => {
    exec(
      'pnpm dlx shadcn@latest add --all -y',
      { cwd: projectName },
      (error) => {
        if (error) return reject(error)
        resolve('')
      },
    )
  })
}
