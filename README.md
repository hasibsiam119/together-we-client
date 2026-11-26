# TogetherWe — Community Event Platform (Frontend)

![Next.js](https://img.shields.io/badge/Next.js-16.4.6-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.3.0-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-06B6D4?logo=tailwindcss&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-1.7.27-000000)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)

TogetherWe is a community-driven social impact platform where people can discover, create, join, and manage local volunteer events. This repository contains the Next.js frontend application.

## Table of Contents

- [Project Overview](#project-overview)
- [Live Demo](#live-demo)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [Development Commands](#development-commands)
- [Backend API Configuration](#backend-api-configuration)
- [Authentication Overview](#authentication-overview)
- [Deployment Instructions](#deployment-instructions)

## Project Overview

TogetherWe connects volunteers with community initiatives such as donation drives, cleanup programs, tree plantation activities, education projects, healthcare support, and other community events.

The frontend provides:

- A public event discovery experience with search and category filtering.
- Detailed event pages with organizer information and event descriptions.
- Authentication with email/password and Google.
- Authenticated event creation, event management, and event participation.
- A responsive interface with light/dark theme support.

The frontend communicates with a separate Express.js and MongoDB backend. Authentication is handled by Better Auth, and protected backend requests use JWTs.

## Live Demo

| Service | URL |
| --- | --- |
| Frontend application | https://together-we-by-hasibsiam.vercel.app/ |
| Backend API | https://together-we-server-eight.vercel.app/ |

## Key Features

- **Event discovery** — Browse upcoming events ordered by date.
- **Search and category filters** — Search by event title or location and filter by event category.
- **Event details** — View event date, location, category, description, thumbnail, and organizer information.
- **Authentication** — Sign up and sign in with email/password or Google.
- **Create events** — Authenticated users can publish events with a title, type, date, location, thumbnail URL, and description.
- **Manage events** — Users can view events created with their account email, edit event details, and delete events.
- **Join events** — Authenticated users can join an event and see their participation status.
- **Joined events** — Users can view all events they have joined and cancel a participation record.
- **Homepage sections** — Hero, feature highlights, featured events, a static community gallery, and a newsletter call-to-action.
- **Responsive navigation** — Mobile menu, account dropdown, theme toggle, and sign-in/sign-up actions.
- **User feedback** — Toast notifications for authentication, event creation, updates, deletion, and joining actions.
- **Loading and 404 states** — Dedicated loading and not-found pages.

### Application Routes

| Route | Description | Access |
| --- | --- | --- |
| `/` | Homepage with featured events and community sections | Public |
| `/upcomingEvents` | Upcoming event listing with search and category filters | Public |
| `/upcomingEvents/[id]` | Event detail page and join action | Public |
| `/sign-in` | Email/password and Google sign-in | Public |
| `/sign-up` | Account registration | Public |
| `/events/create` | Create a new event | Authenticated |
| `/events/manage` | Manage events created by the signed-in user | Authenticated |
| `/events/joined` | View and cancel joined events | Authenticated |

## Technologies Used

| Category | Technology |
| --- | --- |
| Framework | Next.js 16.4.6 (App Router) |
| UI runtime | React 19.3.0 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4.3.3 |
| UI components | shadcn/ui with Base UI (`base-nova` style) |
| Authentication | Better Auth 1.7.27 with the JWT plugin |
| Database | MongoDB Atlas via MongoDB Node.js Driver 7.9.1 |
| Notifications | react-toastify 11.2.0 |
| Icons | lucide-react 1.78.0 |
| Fonts | `next/font` (Geist, Raleway, Roboto, Manrope) |
| Deployment | Vercel |

## Project Structure

```text
togetherwe-client/
├── public/
│   ├── gallery/                       # Static community gallery images
│   ├── Hero.png
│   └── TogetherWe Community Logo.png
├── src/
│   ├── app/
│   │   ├── api/auth/[...all]/route.ts # Better Auth API route
│   │   ├── events/
│   │   │   ├── create/page.tsx        # Create event page
│   │   │   ├── joined/page.tsx        # Joined events page
│   │   │   └── manage/page.tsx        # Manage created events page
│   │   ├── sign-in/page.tsx
│   │   ├── sign-up/page.tsx
│   │   ├── upcomingEvents/
│   │   │   ├── [id]/page.tsx          # Event detail page
│   │   │   └── page.tsx               # Event listing page
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx                   # Homepage
│   ├── components/
│   │   ├── homepage/                  # Hero, navbar, footer, gallery, features
│   │   ├── ui/                        # shadcn/ui components
│   │   ├── upcomingEvents/            # Event explorer and skeleton states
│   │   ├── editEvent.tsx
│   │   ├── eventCard.tsx
│   │   ├── joinedCard.tsx
│   │   └── manageEventCard.tsx
│   ├── lib/
│   │   ├── auth.ts                    # Better Auth server configuration
│   │   ├── auth-client.ts             # Better Auth client configuration
│   │   ├── events.ts                  # Event types, normalization, and date helpers
│   │   ├── getTokenFromClient.ts      # Client-side JWT helper
│   │   ├── getTokenFromServer.ts      # Server-side JWT helper
│   │   └── utils.ts
│   └── proxy.ts                       # Redirects unauthenticated users from protected pages
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js 20.19 or newer
- npm
- A MongoDB Atlas cluster and database
- A running TogetherWe backend API
- Google OAuth credentials if Google sign-in is required

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/hasibsiam119/together-we-client.git
   cd together-we-client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add the variables described in [Environment Variables](#environment-variables).

4. Start the backend API, or point `NEXT_PUBLIC_API_URL` to the deployed backend.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open `http://localhost:3000`.

The `.env` file is ignored by Git. Do not commit real credentials.

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `BETTER_AUTH_SECRET` | Yes | Secret used by Better Auth for signing and encryption. Use a long, random value. |
| `BETTER_AUTH_URL` | Yes | Public base URL of the frontend application, for example `http://localhost:3000` or the production frontend URL. |
| `GOOGLE_CLIENT_ID` | Required for Google sign-in | Google OAuth client ID. |
| `GOOGLE_CLIENT_SECRET` | Required for Google sign-in | Google OAuth client secret. |
| `MONGODB_URL` | Yes | MongoDB Atlas connection string. Better Auth uses the `togetherWe` database. |
| `NEXT_PUBLIC_API_URL` | Yes | Base URL of the TogetherWe backend API, for example `http://localhost:8000` or the production API URL. |

### Example `.env`

```env
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>/togetherWe?retryWrites=true&w=majority
NEXT_PUBLIC_API_URL=http://localhost:8000
```

`NEXT_PUBLIC_API_URL` is exposed to the browser because it uses the `NEXT_PUBLIC_` prefix. Never put secrets in a `NEXT_PUBLIC_` variable.

## Development Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm start` | Start the production server after a build |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Run the TypeScript type checker without emitting files |

No test runner or test files are configured in this repository.

## Backend API Configuration

The frontend reads the backend base URL from `NEXT_PUBLIC_API_URL`. The value is used by both server components and client components.

### Backend endpoints used by the frontend

| Method | Endpoint | Used for |
| --- | --- | --- |
| `GET` | `/events` | Upcoming event listing |
| `GET` | `/featured` | Featured events on the homepage |
| `GET` | `/events/:id` | Event detail page |
| `POST` | `/add-event` | Creating an event |
| `PATCH` | `/events/:id` | Editing an event |
| `DELETE` | `/events/:id` | Deleting an event |
| `GET` | `/events/user/:email` | Listing events created by the signed-in user |
| `POST` | `/joined` | Joining an event |
| `GET` | `/joined/:email` | Listing joined events and checking join status |
| `DELETE` | `/joined/:id` | Cancelling a joined event record |

Protected backend endpoints require a JWT:

```ts
const token = await getTokenFromClient();

const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-event`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(payload),
});
```

The backend enables CORS so the separately deployed frontend can call the API.

## Authentication Overview

Authentication is implemented with Better Auth.

- **Server configuration:** `src/lib/auth.ts`
  - MongoDB adapter using the `togetherWe` database.
  - Email and password authentication enabled.
  - Google social provider configured through environment variables.
  - Better Auth JWT plugin enabled.
  - Session cookie cache enabled with the JWT strategy and a 7-day maximum age.

- **Client configuration:** `src/lib/auth-client.ts`
  - Better Auth React client.
  - JWT client plugin enabled.

- **Auth API route:** `src/app/api/auth/[...all]/route.ts`
  - Exposes the Better Auth HTTP handler at `/api/auth/*`.
  - Includes the JWKS endpoint used by the backend to verify JWTs.

- **JWT helpers:**
  - `src/lib/getTokenFromClient.ts` retrieves a JWT on the client with `authClient.token()`.
  - `src/lib/getTokenFromServer.ts` retrieves a JWT on the server with `auth.api.getToken()`.

- **Protected pages:** `src/proxy.ts`
  - Checks the session for `/events/create`, `/events/joined`, and `/events/manage`.
  - Redirects unauthenticated users to `/sign-in`.

- **Password validation:** The sign-up form requires at least 6 characters, one uppercase letter, and one lowercase letter.

- **Backend verification:** The backend verifies JWTs against the JWKS endpoint exposed by Better Auth at `/api/auth/jwks`.

The frontend and backend are separate deployments. API requests use `Authorization: Bearer <JWT>` headers rather than sharing cookies across origins.

## Deployment Instructions

### Vercel

1. Import the `together-we-client` repository into Vercel.
2. Keep the root directory as the repository root.
3. Use the default Next.js build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
4. Add the environment variables from [Environment Variables](#environment-variables) for the Production environment. Add them to Preview as well if preview deployments need authentication and API access.
5. Deploy the application.

### Production configuration notes

- Set `BETTER_AUTH_URL` to the deployed frontend URL, for example `https://your-frontend-domain.vercel.app`.
- Set `NEXT_PUBLIC_API_URL` to the deployed backend URL, for example `https://your-backend-domain.vercel.app`.
- `NEXT_PUBLIC_API_URL` is embedded at build time. Redeploy the frontend after changing it.
- Configure the Google OAuth authorized redirect URI as:

  ```text
  https://your-frontend-domain/api/auth/callback/google
  ```

- Ensure the backend's `CLIENT_URL` points to this frontend deployment so the backend can fetch the JWKS endpoint.
- Ensure the MongoDB Atlas network access list allows the deployment environment.
- Verify the production build locally with:

  ```bash
  npm run build
  ```
