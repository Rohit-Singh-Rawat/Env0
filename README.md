# Env0

A modern environment variable management application built with the T3 Stack.

## Features

- Secure authentication with Better Auth
- PostgreSQL database with Prisma ORM
- Type-safe API with tRPC
- Modern UI with Tailwind CSS
- Next.js 15 for fast, server-side rendering

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up your environment variables in `.env`:
   ```
   DATABASE_URL="postgresql://postgres:password@localhost:5432/Env-Manager"
   BETTER_AUTH_SECRET="your-secret-key"
   BETTER_AUTH_URL="http://localhost:3000"
   ```
4. Initialize the database:
   ```bash
   pnpm db:push
   ```
5. Start the development server:
   ```bash
   pnpm dev
   ```

## Development

- `pnpm dev` - Start the development server
- `pnpm build` - Build for production
- `pnpm start` - Start the production server
- `pnpm db:studio` - Open Prisma Studio to manage your database
- `pnpm check` - Run Biome linting
- `pnpm typecheck` - Run TypeScript type checking

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [Better Auth](https://github.com/better-auth/better-auth) - Authentication
- [Prisma](https://prisma.io) - Database ORM
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [tRPC](https://trpc.io) - End-to-end typesafe APIs
- [Biome](https://biomejs.dev) - Fast linter and formatter

## Deployment

This application can be deployed to any platform that supports Next.js applications, such as Vercel, Netlify, or using Docker.

Make sure to set up your environment variables properly in your production environment.

## Project Roadmap

### Current Progress

- [x] Basic project setup with T3 Stack
- [x] Authentication foundation with Better Auth
- [x] Database setup with Prisma and PostgreSQL
- [x] Basic UI structure with Tailwind CSS

### TODO: Backend Development

#### 1. Authentication & Authorization

- [ ] Extend user authentication system with role-based access
- [ ] Define roles (Admin, Developer, Viewer)
- [ ] Implement permission system

#### 2. Organization & Project Management

- [ ] Create Organization model in Prisma schema
- [ ] Implement organization CRUD operations
- [ ] Create Project model with organization relationships
- [ ] Implement project CRUD operations
- [ ] Add invitation system for organizations

#### 3. Environment Variable Management

- [ ] Create EnvironmentVariable model
- [ ] Implement encryption for sensitive data
- [ ] Create environment types (development, staging, production)
- [ ] Implement variable versioning and history

#### 4. API Key Management

- [ ] Create APIKey model for CI/CD access
- [ ] Implement key generation, rotation, and revocation
- [ ] Create secure endpoints for CI/CD integration

#### 5. Security Features

- [ ] Implement data encryption at rest
- [ ] Set up audit logging for all actions
- [ ] Create monitoring for unusual access patterns

### TODO: Frontend Development

#### 1. User Interface

- [ ] Design and implement authentication pages
- [ ] Create dashboard with organization and project overview
- [ ] Build organization management interface
- [ ] Build project management interface
- [ ] Create environment variable management UI
- [ ] Implement API key management UI

#### 2. CI/CD Integration

- [ ] Create API endpoints for CI/CD systems
- [ ] Implement authentication mechanism for pipeline access
- [ ] Add documentation for integration with common CI/CD platforms

### Testing & Deployment

- [ ] Write unit tests for core functionality
- [ ] Set up integration tests
- [ ] Implement security testing
- [ ] Create deployment pipeline
- [ ] Document production deployment process

### Priority Order

1. Complete organization and project management
2. Implement environment variable management with encryption
3. Build user interface for managing variables
4. Add API key management for CI/CD integration
5. Enhance security features and auditing
6. Comprehensive testing
7. Production deployment

This roadmap will be updated as development progresses.
