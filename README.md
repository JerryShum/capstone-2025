# StoryWeaver / Capstone 2025

**An All-In-One (AIO) creator suite built as a Turborepo monorepo.** This application provides a powerful node-based interface (leveraging React Flow) for building visual, generative workflows powered by AI.

## Project Structure

This monorepo is divided into four main workspaces:

- **`studio`**: The core node-based creator environment. Built with React, Vite, TailwindCSS, Zustand, and React Flow. This package provides the interactive canvas where users can build and connect various generative nodes.
- **`server`**: The backend API. Built with Bun, Hono, Drizzle ORM (PostgreSQL), and integrates with Google GenAI and Google Cloud Storage for handling AI generation tasks and asset storage.
- **`client`**: The broader frontend application (landing pages, dashboards, etc.). Built with React, Vite, TailwindCSS, TanStack Router/Query, Radix UI, and Zustand.
- **`shared`**: A package containing shared TypeScript definitions, Zod schemas, and common React Flow utilities used across frontend and backend environments.

## Core Technologies

- **Monorepo Management**: Turborepo, Bun workspaces
- **Frontend**: React, Vite, TailwindCSS, React Flow, Zustand, Radix UI, TanStack Router
- **Backend**: Bun, Hono, PostgreSQL (via Drizzle ORM)
- **AI / Cloud Services**: Google GenAI, Google Cloud Storage

## Development Status

This project is currently under active development. Current roadmap elements include:
- An AI-powered infinite canvas
- Frame-by-frame visual generation
- Automated code analysis and generation based on visual flowcharts

## Getting Started

To install dependencies and start the development servers:

```bash
bun install
bun run dev
```

> **Note**: This application uses `.env` files for configuration. Ensure your local environment is correctly configured with your Google Cloud Storage and Google GenAI credentials.
