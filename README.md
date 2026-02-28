# TenThousand Test

A monorepo application with a React frontend and GraphQL backend for form management.

Project is developed according to the technical specifications located in the `docs` folder.

## Setup & Run

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development

Run both client and server concurrently:

```bash
npm run dev
```

This will start:

- Frontend: http://localhost:3000
- Backend: http://localhost:4000

### Individual Services

- Server only: `npm run dev:server`
- Client only: `npm run dev:client`

## Technology Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, GraphQL, Apollo Server
- **Monorepo:** npm workspaces, concurrently
