# Verandah

Website for **Verandah**, a contemporary Indian kitchen in Jabalpur, Madhya Pradesh.

**Status:** frontend pages complete. No backend yet.

## Tech stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · Framer Motion · Lucide Icons

## Pages

| Route      | Description                                   |
| ---------- | --------------------------------------------- |
| `/`        | Home                                          |
| `/about`   | Our story                                     |
| `/menu`    | Full menu as a horizontal, focus-style slider |
| `/gallery` | Photo gallery with filters and lightbox       |
| `/contact` | Contact details and message form              |

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Project structure

```
app/
  page.tsx            Home
  about/page.tsx
  menu/page.tsx       Menu data lives at the top of this file
  gallery/page.tsx
  contact/page.tsx
hooks/
  useAnimation.ts     Shared animation settings
```

## Before going live

- Replace the placeholder address, phone and email (home, about, contact).
- Add the Google Maps embed link on the contact page.
- Connect the contact form to a real endpoint (see the `TODO` in `contact/page.tsx`).
- Swap the Unsplash stock photos for real restaurant photos.
- Update the home page dishes so they match the menu.

## Roadmap

- [ ] Backend (API, database)
- [ ] Online ordering
- [ ] Table booking
- [ ] Admin panel to edit the menu
