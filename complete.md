# Restaurant Website — Frontend Setup

## Tech Stack

- Next.js 16 + TypeScript
- App Router
- Tailwind CSS v4
- Redux Toolkit
- shadcn/ui
- Framer Motion
- Axios
- Express + TypeScript
- MongoDB
- Cloudinary

## Architecture

- Feature-based architecture
- Each feature has:
  - `ui`
  - `hooks`
  - `state`
  - `api`
- Shared components in `components/`
- Next.js native layouts for Public/Admin
- Redux centralized in `store/`

## Folder Structure

src/
│
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   │
│   ├── (public)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── menu/
│   │   ├── gallery/
│   │   └── contact/
│   │
│   └── admin/
│       ├── layout.tsx
│       ├── login/
│       └── dashboard/
│
├── features/
│   ├── home/
│   ├── about/
│   ├── menu/
│   ├── gallery/
│   ├── contact/
│   └── admin/
│
├── components/
│   └── ui/
│       ├── Navbar.tsx
│       └── Footer.tsx
│
├── store/
│   ├── store.ts
│   ├── rootReducer.ts
│   └── ReduxProvider.tsx
│
├── hooks/
│   └── redux.ts
│
├── services/
├── lib/
├── types/
└── config/

## Completed

- [x] Folder architecture
- [x] Public Layout
- [x] Admin Layout
- [x] Navbar & Footer
- [x] Redux Toolkit
- [x] Redux Store
- [x] Root Reducer
- [x] Redux Provider
- [x] Basic Counter Slice
- [x] Typed Redux Hooks

## Next Steps

1. Axios setup
2. Tailwind CSS v4
3. shadcn/ui
4. Framer Motion
5. UI development with Google Stitch
6. Backend integration