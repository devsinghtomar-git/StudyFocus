# ExamPrep AI Backend

This is the standalone backend for the ExamPrep AI Android application.
It provides REST APIs for authentication, built with Node.js, Express, TypeScript, Prisma ORM, and PostgreSQL.

## Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL database

## Installation

1. Clone the repository and navigate into it.
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and configure your environment variables:
   - `PORT`: The port your server will run on (default 3000).
   - `JWT_SECRET`: A secure secret string for generating JWT tokens.
   - `DATABASE_URL`: Your PostgreSQL connection string. Example: `postgresql://user:password@localhost:5432/examprep?schema=public`

## Database Setup

1. Make sure your PostgreSQL server is running and the database specified in `DATABASE_URL` exists.
2. Run Prisma migrations to create the tables in your database:
   ```bash
   npx prisma migrate dev --name init
   ```
3. Generate the Prisma client:
   ```bash
   npx prisma generate
   ```

## Running the Server

### Development Mode

Run the server with hot-reloading:
```bash
npm run dev
```

### Production Mode

Build the TypeScript files and start the server:
```bash
npm run build
npm start
```

## API Testing

### 1. Health Check
```bash
curl http://localhost:3000/health
```
Expected response: `{"status": "ok"}`

### 2. Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name": "Dev", "email": "dev@example.com", "password": "password123"}'
```

### 3. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "dev@example.com", "password": "password123"}'
```

### 4. Get Current User (/me)
```bash
# Replace YOUR_TOKEN with the token received from login
curl -X GET http://localhost:3000/api/auth/me \
-H "Authorization: Bearer YOUR_TOKEN"
```
