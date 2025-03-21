import path from 'path'
import fs from 'fs'

const addHomePageComponentDirectory = async (projectName: string) => {
  const homePageFileDir = path.join(projectName, 'src', 'app' ,'page.tsx')

  fs.writeFileSync(homePageFileDir, generateHomePage())
}

export const addHomePageComponent = async (projectName: string) => {
  addHomePageComponentDirectory(projectName)
  const homePageComponentDir = path.join(
    projectName,
    'src',
    'components',
    'home-page',
  )

  if (!fs.existsSync(homePageComponentDir)) {
    fs.mkdirSync(homePageComponentDir, { recursive: true })
  }

  const headerComponentPath = path.join(homePageComponentDir, 'Header.tsx')
  fs.writeFileSync(headerComponentPath, generateHeaderComponent())

  const heroComponentPath = path.join(homePageComponentDir, 'Hero.tsx')
  fs.writeFileSync(heroComponentPath, generateHeroComponent())

  const footerComponentPath = path.join(homePageComponentDir, 'Footer.tsx')
  fs.writeFileSync(footerComponentPath, generateFooterComponent())
}

const generateHeaderComponent = () => {
  return`"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="w-full border-b bg-background py-4">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <h2 className="font-semibold">Your Logo</h2>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm transition-colors hover:text-primary">
            Features
          </Link>
          <Link href="#about" className="text-sm transition-colors hover:text-primary">
            About
          </Link>
          <Link href="#contact" className="text-sm transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>
        <div className="flex gap-3">
          <Button variant="outline">
            <Link href="/login">Sign in</Link>
          </Button>
          <Button>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

`
}

const generateHeroComponent = () => {
  return`"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="relative flex-grow bg-gradient-to-b from-background to-muted">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-60">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-7xl">
            Welcome to <span className="text-primary">Your Company</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm lg:text-2xl text-muted-foreground">
            A brief description of your company or product. This is a simple template that you can easily customize to
            fit your needs.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="px-8">
              <Link href="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline">
              <Link href="#learn-more">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

`
}

const generateFooterComponent = () => {
  return`"use client"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <nav className="flex gap-6 mt-4 md:mt-0">
            <Link href="#privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}`
}

const generateHomePage = () => {
  return `import Header from '@/components/home-page/Header'
import Hero from '@/components/home-page/Hero'
import Footer from '@/components/home-page/Footer'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <Hero />
      <Footer />
    </div>
  )
}`
}
