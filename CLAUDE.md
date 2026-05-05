# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server on port 5173
npm run build     # type-check + Vite production build
npm run lint      # ESLint
```

The dev server proxies `/api/*` → `http://localhost:3000`, so the backend API must be running locally on port 3000.

## Architecture

### Request flow

All HTTP calls go through a single Axios instance (`src/api/axios.ts`) that:
- attaches the JWT `accessToken` from Zustand store on every request
- calls `logout()` automatically on any 401 response

Services (`src/api/*.service.ts`) are plain objects that wrap the Axios instance and return typed data. React Query hooks (`src/hooks/use*.ts`) consume those services and own all caching/invalidation logic. Pages and components call only hooks — never services directly.

### Auth

State is kept in a Zustand store (`src/hooks/useAuthStore.ts`) persisted to `localStorage` under the key `auth-storage`. The store holds `accessToken`, `refreshToken`, and the current `user` (`ADMIN | USER`).

`useMe()` (called once inside `<Layout>`) fetches `/auth/me` on mount and writes the user object into the store. It is skipped when there is no token.

Route protection is handled by two wrapper components:
- `<ProtectedRoute>` — redirects to `/login` if unauthenticated; accepts an `adminOnly` prop that redirects non-admins to `/`.
- `<GuestRoute>` — redirects authenticated users away from `/login` and `/register`.

### Forms

Every form uses `react-hook-form` + `@hookform/resolvers/zod`. The Zod schema lives in `src/schemas/`, exports both the schema and its inferred TypeScript type, and is the single source of truth for validation messages (written in Portuguese).

### Feedback / alerts

All user-facing feedback (success, error, delete confirmation) goes through helper functions in `src/utils/swal.ts` which wrap SweetAlert2. Use those helpers — do not call `Swal.fire` directly. Error messages are extracted via `getErrorMessage` from `src/api/errors.ts`, which handles Axios error shapes, HTTP status codes, and network failures.

### Styling

Tailwind CSS v4 via `@tailwindcss/vite`. Global base styles (body background, font smoothing) are in `src/styles/global.css`. The `<Layout>` wrapper in `App.tsx` also sets the page background — both must be kept in sync when changing the base background color.

## Conventions

- New resource = one service file, one hook file, one schema file, list/create/edit pages, and table/form components mirroring the existing pattern (see `space`, `equipment`, `scheduling`).
- Query keys are a module-level constant `KEY` in each hook file.
- `adminOnly` routes are declared in `App.tsx` via the `<ProtectedRoute adminOnly>` prop.
- Prettier config: no semicolons, single quotes, trailing commas, 80-char print width.
