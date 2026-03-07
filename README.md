# StoryWeaver / Capstone 2025

**Empowering anyone to create stunning videos with AI.** 

StoryWeaver is a visual, node-based video creation environment designed to make advanced AI video generation accessible to everyone. By providing an intuitive, interactive canvas (powered by React Flow), users can easily piece together scenes, craft AI prompts, and orchestrate complex generative workflows to bring their stories to life—no prior video editing experience required.

## Project Structure

This monorepo is divided into four main workspaces:

- **`studio`**: The core interactive creator environment. Built with React, Vite, TailwindCSS, Zustand, and React Flow. This package provides the node-based canvas where users visually map out their video narratives and connect generative AI nodes.
- **`server`**: The backend API. Built with Bun, Hono, Drizzle ORM (PostgreSQL), and integrates with Google GenAI and Google Cloud Storage for handling AI video generation tasks and media asset storage.
- **`client`**: The broader frontend application (landing pages, dashboards, etc.). Built with React, Vite, TailwindCSS, TanStack Router/Query, Radix UI, and Zustand.
- **`shared`**: A package containing shared TypeScript definitions, Zod schemas, and common utilities used across frontend and backend environments.

## Core Technologies

- **Monorepo Management**: Turborepo, Bun workspaces
- **Frontend**: React, Vite, TailwindCSS, React Flow, Zustand, Radix UI, TanStack Router
- **Backend**: Bun, Hono, PostgreSQL (via Drizzle ORM)
- **AI / Cloud Services**: Google GenAI, Google Cloud Storage

## Development Status

This project is currently under active development. Current roadmap elements include:
- An AI-powered infinite canvas
- Frame-by-frame visual generation
- Automated sequence and code analysis based on visual flowcharts

## Getting Started

To install dependencies and start the development servers:

```bash
bun install
bun run dev
```

> **Note**: This application uses `.env` files for configuration. Ensure your local environment is correctly configured with your Google Cloud Storage and Google GenAI credentials.
