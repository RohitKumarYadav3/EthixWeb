# Ethixweb India — Premium Digital Agency Website

A distinctive, award-worthy digital agency website tailored for Indian businesses. Built with Next.js, TypeScript, Three.js, and Supabase.

## Features

- **Custom visual identity**: Deep graphite + warm ivory + Ethixweb crimson palette, editorial typography (Space Grotesk + Inter), asymmetric layouts, bento grids
- **Interactive 3D hero**: Original network sculpture built with React Three Fiber, lazy-loaded with SSR disabled and reduced-motion fallback
- **Scroll animations**: IntersectionObserver-based staggered reveals, magnetic-style hover effects, marquee
- **Responsive**: Mobile-first design with breakpoints from 375px to 1440px+
- **5 pages**: Home, Services, About, Contact, Admin Login + Dashboard
- **Working backend**: Enquiry form → database → admin lead management workflow
- **Secure admin**: HMAC-signed HttpOnly cookie sessions, bcrypt password hashing, rate limiting, CSRF/origin protection, honeypot anti-spam
- **SEO**: Metadata, OpenGraph, sitemap.xml, robots.txt, semantic HTML
- **Performance**: Lazy-loaded 3D, minimal JS, optimized fonts via next/font, reduced-motion support

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 13.5 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| 3D | Three.js + React Three Fiber + Drei |
| Animation | CSS transitions + IntersectionObserver |
| Database | Supabase (PostgreSQL) |
| Validation | Zod |
| Auth | bcryptjs + HMAC-signed cookies |
| Testing | Jest + ts-jest |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install --legacy-peer-deps
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Required variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash of admin password |
| `AUTH_SECRET` | Random string for signing session tokens |
| `NEXT_PUBLIC_SITE_URL` | Your site URL (for sitemap, origin checks) |

### Generate Admin Password Hash

```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your_password', 10))"
```

### Generate Auth Secret

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

### Default Admin Credentials

- Email: `admin@ethixweb.com`
- Password: `admin123`

**Change these immediately in production.**

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

## Database Schema

### enquiries

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Contact name |
| email | text | Contact email |
| phone | text | Contact phone |
| company | text | Optional company name |
| service | text | Service interest category |
| budget | text | Budget range (optional) |
| message | text | Enquiry message |
| status | text | Lead status (new, contacted, qualified, won, lost) |
| notes | text | Admin notes |
| created_at | timestamptz | Submission timestamp |
| updated_at | timestamptz | Last modification timestamp |

### rate_limits

Persistent rate limiting table for enquiry submissions and login attempts.

**RLS Policies:**
- `enquiries`: Public (anon) can INSERT only. All read/update/delete operations use the service role key (bypasses RLS) in authenticated API routes.
- `rate_limits`: Full anon CRUD for rate-limit operations (no sensitive data stored).

## API Routes

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/enquiries` | Public | Submit a new enquiry |
| POST | `/api/admin/login` | Public | Admin login |
| POST | `/api/admin/logout` | Session | Admin logout |
| GET | `/api/admin/logout` | - | Check auth status |
| GET | `/api/admin/leads` | Session | Paginated, filterable lead list |
| GET | `/api/admin/leads/[id]` | Session | Lead detail |
| PATCH | `/api/admin/leads/[id]` | Session | Update lead status/notes |
| DELETE | `/api/admin/leads/[id]` | Session | Delete a lead |

## Security Features

- **Server-side Zod validation** on all inputs
- **Request body size limits** (10KB for enquiries, 5KB for login)
- **Honeypot field** for spam detection
- **Persistent rate limiting** backed by database (5 requests per 10 minutes per IP)
- **Origin/CSRF protection** on enquiry submissions
- **HMAC-signed HttpOnly session cookies** with 24-hour expiry
- **bcrypt password hashing** for admin credentials
- **Login throttling** (5 attempts per 10 minutes)
- **Independent auth checks** on every admin API route
- **No public registration** — single admin account via environment variables

## Testing

```bash
npm test
```

Tests cover:
- Enquiry validation (Zod schemas)
- Login validation
- Lead update validation
- Session token creation and verification
- Tampered/expired token rejection
- Password verification (correct, incorrect, missing)
- Honeypot spam detection

## Architecture

```
app/
├── layout.tsx          # Root layout with fonts + metadata
├── page.tsx            # Home page
├── services/page.tsx   # Services page
├── about/page.tsx      # About page
├── contact/page.tsx    # Contact page with form
├── admin/
│   ├── login/page.tsx  # Admin login
│   └── page.tsx        # Lead management dashboard
├── api/
│   ├── enquiries/route.ts      # Public enquiry submission
│   └── admin/
│       ├── login/route.ts      # Admin authentication
│       ├── logout/route.ts     # Session management
│       └── leads/
│           ├── route.ts        # Lead list with pagination/filtering
│           └── [id]/route.ts   # Lead CRUD operations
├── sitemap.ts
└── robots.ts

components/
├── site/
│   ├── header.tsx      # Fixed nav with scroll state + mobile menu
│   ├── footer.tsx      # CTA + links + contact info
│   └── hero-scene.tsx  # R3F 3D network sculpture (lazy-loaded)
└── ui/                 # shadcn/ui components

lib/
├── supabase.ts         # Supabase admin client (service role)
├── validation.ts       # Zod schemas + label maps
├── auth.ts             # Session tokens, cookies, password verification
└── rate-limit.ts       # Database-backed rate limiting

hooks/
└── use-scroll-reveal.ts  # IntersectionObserver scroll animations
```

## India-Specific Design Rationale

- **INR pricing** displayed on all service listings (₹25,000 – ₹3,00,000+ ranges)
- **WhatsApp-first communication** — WhatsApp workflows as a core service, WhatsApp contact in footer
- **Mobile-first design** — India is a smartphone-first market; every layout prioritizes mobile
- **Google Business Profile emphasis** — local SEO is critical for Indian service businesses
- **UPI/payment gateway awareness** in service descriptions
- **Regional language readiness** — multi-language support listed as a feature
- **Realistic Indian business contexts** — D2C brands, local retailers, service businesses
- **Illustrative portfolio** clearly labeled, with no fabricated testimonials or client results

## Deployment

### Vercel

1. Push your code to a Git repository
2. Import the project in Vercel
3. Add all environment variables in the Vercel dashboard
4. Deploy — Vercel automatically detects Next.js

### Supabase

The database is already provisioned. The migration for `enquiries` and `rate_limits` tables has been applied. No additional database setup is needed.

## Performance Notes

- 3D scene is dynamically imported with `ssr: false` and lazy-loads on the client
- Fonts loaded via `next/font` with `display: swap`
- Images use `unoptimized` flag for static deployments (no image optimization server needed)
- CSS animations use `transform` and `opacity` for GPU acceleration
- `prefers-reduced-motion` fully respected — all animations disabled, 3D still renders but static
- Minimal client-side JavaScript — only interactive components are client components

## Unresolved Issues

- Supabase `SERVICE_ROLE_KEY` must be available at runtime for server-side database operations. In this environment it is injected automatically; for self-hosted deployments, ensure it is in your environment.
- Lighthouse/PageSpeed scores have not been measured in this environment (no browser available). The design follows performance best practices but actual scores should be verified after deployment.
- The contact phone number and email are placeholders (`+91 80000 00000`, `hello@ethixweb.com`) — replace with real contact information before going live.
