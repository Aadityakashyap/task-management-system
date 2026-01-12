# Task Management System

A full-stack Task Management System built with Next.js (TypeScript), Tailwind CSS, and Prisma ORM.  
It provides secure authentication, responsive UI/UX, and complete task CRUD functionality with filtering, search, and pagination.

---

## Features

- Authentication
  - User registration, login, logout
  - JWT-based security (Access + Refresh tokens)
  - Password hashing with bcrypt
- Task Management
  - Create, view, edit, delete tasks
  - Filtering by status, searching by title
  - Pagination for large task lists
- Frontend
  - Responsive design
  - Dark/light mode toggle
  - Smooth animations & transitions
  - Toast notifications
- Backend
  - Node.js + TypeScript API routes
  - Prisma ORM with SQLite
  - Zod validation & error handling

---

## Tech Stack

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, Next.js API Routes, Prisma ORM
- Database: SQLite
- Auth: JWT (Access + Refresh), bcrypt password hashing
- Validation: Zod

---

## Getting Started

### 1. Clone the repo

```bash
git clone task-management-system
cd task-management-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env`:

```env
DATABASE_URL="file:./data/dev.db"
JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_ACCESS_EXPIRES="15m"
JWT_REFRESH_EXPIRES="7d"
NODE_ENV="development"
```

### 4. Setup database

```bash
npm run prisma:generate
npm run prisma:dbpush
```

### 5. Run development server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Deployment (Vercel + PostgreSQL)

### 1. Provision PostgreSQL Database

- Use any PostgreSQL instance.
- Copy the connection string (e.g. `postgresql://user:password@host:5432/dbname`).

### 2. Update Environment Variables

In Vercel project settings, add:

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"
JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_ACCESS_EXPIRES="15m"
JWT_REFRESH_EXPIRES="7d"
NODE_ENV="production"
```

### 3. Prisma Setup for PostgreSQL

Update `schema.prisma` to use PostgreSQL provider:

```prisma
datasource db {
  provider = "postgresql"
}
```

### 4. Run Migrations

Before deploying, push schema to PostgreSQL:

```bash
 npm run prisma:generate
 npm run prisma:dbpush
```

### 5. Deploy to Vercel

- Push your repo to GitHub.
- Go to Vercel → Import Project.
- Select your repo, configure environment variables.
- Deploy.

### 6. Verify Deployment

Visit your Vercel your domain and test authentication + tasks.

---

## Security

- Passwords hashed with bcrypt
- JWT Access (short-lived) + Refresh (long-lived)
- Refresh token rotation & revocation
- HttpOnly cookies for tokens
- Input validation with Zod
