# Liwa Menu — Admin Frontend

Admin dashboard frontend for the Liwa Menu project. Built with Vite + React + Tailwind CSS. This app provides the admin UI to manage restaurants, users, licenses, packages, payments and other backend resources.

## Key features

- Admin authentication (login, register, forgot password, email verify)
- Restaurant, menu, orders and user management
- License & package management and payment flows
- Reusable UI components and icon set
- State management via Redux slices and a centralized api module
- Fast dev experience with Vite

## Repo layout

- src/
  - assets/ — icons, images, animations (Lottie)
  - components/ — reusable UI components (header, sidebar, tables, forms)
  - pages/ — route pages (home, restaurants, licenses, users, etc.)
  - redux/ — api.js and feature slices
  - hooks/, utils/, context/ — helpers and custom hooks
  - main.jsx, App.jsx — app bootstrap and router
- public/ — static files
- config/ — small configuration helpers (e.g., toast)
- index.html, vite.config.js, tailwind.config.js

## Prerequisites

- Node.js 18+ (or compatible)
- npm, pnpm or yarn
- Backend running (set API base URL in .env)

## Environment

Create or update .env in the admin folder. Common variables:

- VITE_API_BASE_URL — backend API base (example: http://localhost:5000/api)
- Any other VITE\_ prefixed variables your app expects

Vite only exposes env variables prefixed with VITE\_.

## Quick start (macOS)

1. Install dependencies
   ```bash
   cd /Users/ibro/Documents/Real_Projects/liwamenu-abou/admin
   npm install
   ```
2. Start dev server
   ```bash
   npm run dev
   ```
3. Build for production
   ```bash
   npm run build
   npm run preview
   ```

## Useful npm scripts

Check package.json. Typical scripts:

- dev — start development server
- build — production build
- preview — preview production build

## Integration notes

- Update VITE_API_BASE_URL to point to the running backend (user or backend folders).
- API endpoints and DTOs are defined in src/redux/api.js — align with backend contract.
- Tailwind classes are used across components; ensure tailwind.config.js includes src paths.

## Development tips

- Use MenuJson.json from other folders for mock/menu examples when testing UI.
- Icons are React components in src/assets/icon — import them rather than inline SVG.
- For new pages: add component under src/pages and register route in App.jsx.
- Check middleware/loading slice for consistent loading UX.

## Deployment

- Configured for Vercel (if desired). Build output is dist.
- Ensure production env variables point to production backend.

## Troubleshooting

- Blank page / missing data: verify VITE_API_BASE_URL and backend CORS.
- Tailwind not applying: confirm tailwind.config.js purge/content paths include src/\*_/_.
- Lottie fails: confirm asset paths in src/assets/anim are correct.

## Next steps (optional)

- Add Dockerfile + docker-compose for local multi-service dev (API + admin + user).
- Add CI (GitHub Actions) to lint/build on push.
- Generate Postman or OpenAPI client from backend controllers.
  //
