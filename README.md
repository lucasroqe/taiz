# Taiz

Taiz is a command-line tool (CLI) designed to streamline the creation of Next.js applications. It accelerates your development workflow by providing pre-built components and seamless package integration.

<div align="center">
     <img src="https://raw.githubusercontent.com/lucasroqe/taiz/master/public/cli.png" width="500"/>
</div>

## Features

- **Pre-built Pages**: Includes a homepage and login/register forms.
- **Quick Setup**: Start building in seconds with minimal configuration.

<div align="center">
    <img src="https://raw.githubusercontent.com/lucasroqe/taiz/master/public/ready-components.png" width="480"/>
</div>

### Quick Start

> **Note**: You can use your preferred package manager (e.g., Pnpm / Yarn / Bun).

```bash
npm install -g taiz
taiz init
```
If you prefer not to install it locally, you can run:
```bash
npx taiz@latest init
```

---

## What's Included?

### ORM 

#### Prisma
- Sets up [Prisma](https://github.com/prisma/prisma) to support SQLite and PostgreSQL as main databases.
- Automatically adds useful scripts to `package.json` for easy execution.

### Authentication

#### BetterAuth

- Generates all necessary files for a basic [Better Auth](https://github.com/better-auth/better-auth) setup.
- Includes ready-to-use sign-up and sign-in components.

### Component Library

#### Shadcn-UI

- Install and configure [Shadcn-UI](https://github.com/shadcn-ui/ui), a component library used for pre-built button components and other UI elements.
- Includes pre-configured styles and themes for quick integration.
- Simplifies the process of building modern, responsive UIs.

### Additional Tools

- [**React Hook Form**](https://github.com/react-hook-form/react-hook-form): Simplifies form handling, pre-configured for authentication forms.
- [**Zod**](https://github.com/colinhacks/zod): A powerful schema validation library. Installed and ready to use, allowing you to define and validate schemas for forms and API inputs with ease.
- [**Lucide React Icons**](https://github.com/lucide-icons/lucide): A versatile icon library for your project.

---

### Commands
| Command | Short Flag | Long Option       | Description                                    | Argument          |
| ------- | ---------- | ----------------- | ---------------------------------------------- | ----------------- |
| init    | -          | -                 | initialise and configure Taiz                  |                   |
| -       | -e         | --empty       | initialise without any ui                      |                   |


---

Taiz is packed with tools to help you build faster and smarter. Stay tuned for more features coming soon!
