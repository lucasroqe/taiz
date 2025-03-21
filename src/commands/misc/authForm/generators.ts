import path from 'path'
import fs from 'fs'

const addAuthFormDirectory = async (projectName: string) => {
  const authDir = path.join(projectName, 'src', 'app', '(auth)')
  const loginDir = path.join(authDir, 'login')
  const registerDir = path.join(authDir, 'register')

  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true })
  }

  if (!fs.existsSync(loginDir)) {
    fs.mkdirSync(loginDir, { recursive: true })
  }

  if (!fs.existsSync(registerDir)) {
    fs.mkdirSync(registerDir, { recursive: true })
  }

  const loginFile = path.join(loginDir, 'page.tsx')
  fs.writeFileSync(loginFile, generateLoginFile())

  const registerFile = path.join(registerDir, 'page.tsx')
  fs.writeFileSync(registerFile, generateRegisterFile())
}

export const addAuthFormComponent = async (projectName: string) => {
  await addAuthFormDirectory(projectName)
  const authFormDir = path.join(projectName, 'src', 'components', 'auth')

  if (!fs.existsSync(authFormDir)) {
    fs.mkdirSync(authFormDir, { recursive: true })
  }

  const authLoginPath = path.join(authFormDir, 'Login.tsx')
  fs.writeFileSync(authLoginPath, generateLoginComponent())

  const authRegisterPath = path.join(authFormDir, 'Register.tsx')
  fs.writeFileSync(authRegisterPath, generateRegisterComponent())
}

const generateLoginFile = () => {
  return `import { Login } from '@/components/auth/Login'

export default async function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Login />
      </div>
    </div>
  )
}
`
}

const generateRegisterFile = () => {
  return `import { Register } from '@/components/auth/Register'

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Register />
      </div>
    </div>
  )
}
`
}

const generateLoginComponent = () => {
  return `'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { LoaderCircle, Eye, EyeOff } from 'lucide-react'

export function Login({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit } = useForm()

  async function onSubmit(data: any) {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => {
          setLoading(true)
        },
        onSuccess: () => {
          setLoading(false)
          setTimeout(() => {
            router.push('/')
          }, 1500)
        },
        onError: (ctx: any) => {
          setLoading(false)
          console.log(ctx.errors)
        },
      },
    )
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl ">Login</CardTitle>
          <CardDescription>
            Enter your email and password below to log in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required {...register('email')} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" required {...register('password')} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center">
                    {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <Button disabled={loading} type="submit" className="w-full text-white cursor-pointer">
                {loading ? <LoaderCircle size={16} className="animate-spin" /> : 'Login'}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/register" className=" underline underline-offset-4">Sign up</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}`
}

const generateRegisterComponent = () => {
return `'use client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LoaderCircle, Eye, EyeOff } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

export function Register({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit } = useForm()

  async function onSubmit(data: any) {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: '',
      },
      {
        onRequest: () => {
          setLoading(true)
        },
        onSuccess: () => {
          setLoading(false)
          setTimeout(() => {
            router.push('/login')
          }, 1500)
        },
        onError: (ctx: any) => {
          setLoading(false)
          console.log(ctx.errors)
        },
      },
    )
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your email and password below to register your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register('email')}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    required
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center"
                  >
                    {showPassword ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <Button
                disabled={loading}
                type="submit"
                className="w-full text-white cursor-pointer"
              >
                {loading ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  'Register'
                )}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
`
}
