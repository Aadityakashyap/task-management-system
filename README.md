# Task Management System

A full-stack Task Management System that allows users to securely register, log in, and manage personal tasks.
Built using Node.js, TypeScript, Express, Prisma, PostgreSQL, and Next.js with industry-standard authentication.

## Features

### Authentication & Security

- User Registration, Login, Logout
- JWT-based authentication
  - Short-lived Access Tokens
  - Refresh Tokens for session persistence
- Secure HttpOnly cookies
- Password hashing using bcrypt
- Protected routes with authentication guards

### Task Management

- Create, Read, Update, Delete (CRUD) tasks
- Tasks are scoped to the authenticated user
- Task status toggle (`PENDING → IN_PROGRESS → DONE`) by editing tasks.
- Pagination, filtering (by status), and search (by title)

### Frontend (Next.js)

- Built with Next.js + TypeScript
- Responsive UI
- Toast notifications for user actions
- Pagination UI
- Auth-guarded routes
- Tailwind CSS for scalable styling
- Dark mode

## Architecture Overview

```
task-management-system/
├── backend/      # Node.js + Express + Prisma ORM
└── frontend/     # Next.js + Tailwind CSS
```

## Tech Stack

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt
- Zod

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- React Toastify

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- PostgreSQL

### Clone the repo:

```bash
git clone task-management-system
cd task-management-system
```

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/tms
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Start backend:

```bash
npm run dev
```

Backend runs at:

```
http://localhost:4000
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Start frontend:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

## Authentication Flow

1. User logs in with email/password
2. Backend issues:
   - Access Token (short-lived)
   - Refresh Token (long-lived)
3. Tokens stored in HttpOnly cookies
4. Protected routes validate access token
5. Refresh endpoint issues new access token when expired

## Checklist

- [x] Node.js + TypeScript backend
- [x] Prisma ORM + SQL database
- [x] JWT authentication with refresh tokens
- [x] Task CRUD with pagination & filtering
- [x] Next.js frontend
- [x] Clean architecture & folder structure

## Screenshots

| Login | SignUp | Dashboard | Create | Search/Sort |
|-------|--------|-----------|-----------|
| ![](screenshots/login.png) | ![](screenshots/signup.png) | ![](screenshots/dashboard.png) | ![](screenshots/create.png) | ![](screenshots/search.png) |