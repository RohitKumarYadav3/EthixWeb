# Ethixweb — Web Engineering & Digital Agency Platform

A high-performance digital agency platform built for **Ethixweb** (Ethixweb USA LLC, registered in Wyoming, USA, with global delivery in India). 

The platform is designed to showcase custom web engineering, AI automations, and growth systems with an interactive 3D hero, custom light/dark modes, full blog CMS, and an end-to-end lead management admin dashboard powered by Supabase.

---

## Quick Links to Key Pages

- **Home Page** (`/`): Interactive 3D neural network, service solutions, and client reviews.
- **Services** (`/services`): Full breakdown of custom websites, AI receptionists, SEO, and workflows with transparent pricing.
- **Our Work** (`/our-work`): Real case studies with before/after screenshots and measurable business metrics.
- **Industries** (`/industries`): Industry-tailored digital playbooks (Healthcare, Real Estate, Retail, Professional Services).
- **About Us** (`/about`): Global delivery model, engineering principles, and core team.
- **Blog** (`/blog`): Technical insights and business playbooks with individual post routing (`/blog/[slug]`).
- **Contact** (`/contact`): Validated enquiry intake form connected to Supabase.
- **Admin Portal** (`/admin/login` & `/admin`): Password-protected lead pipeline dashboard with status filtering, notes, and pagination.

---

## Tech Stack & Why We Chose It

We kept the tech stack modern, fast, and free of unnecessary bloat:

| Layer | Technology | Why We Used It |
|---|---|---|
| **Framework** | **Next.js 13.5 (App Router)** | Fast server-side rendering for SEO, automatic code-splitting, and serverless API routes without needing a separate backend server. |
| **Language** | **TypeScript** | Type-safety across forms, database models, and API routes to eliminate runtime errors before shipping. |
| **Styling** | **Tailwind CSS** | Custom design tokens (Ethixweb Crimson, Deep Graphite, Warm Ivory) with responsive mobile-first classes. |
| **3D Graphics** | **Three.js + React Three Fiber** | Interactive node network on the home page that responds to mouse movement, with zero layout shift and reduced-motion fallback. |
| **Database** | **Supabase (PostgreSQL)** | Managed Postgres database for inquiries and rate-limiting. Uses service-role keys for secure server-side queries. |
| **Data Validation** | **Zod** | Strict validation rules for enquiry submissions, admin logins, and lead status updates. |
| **Authentication** | **HMAC Cookie Sessions + bcryptjs** | Lightweight, secure admin authentication with HttpOnly cookies. No third-party auth vendor lock-in. |
| **Testing** | **Jest + ts-jest** | Unit and integration test suite covering input validation, token verification, and password checks. |

---

## Design Rationale

### 1. What Makes the Platform India-Specific?
Rather than a generic corporate template, Ethixweb is engineered around the realities and operational strengths of the Indian tech ecosystem:
- **Interactive India Operations Network Map**: A live geographic SVG visualization of all 8 major Indian tech hubs (Bengaluru Primary HQ, Delhi NCR, Mumbai, Hyderabad, Pune, Chennai, Kolkata, Ahmedabad) with active corridors, low-latency backbone routing (<25ms), and global wave arcs connecting to US, UK, and Canadian clients.
- **Real-Time IST Synchronization**: The global header features a live, ticking Indian Standard Time (IST) clock alongside US PST/EST business hours so international and Indian teams stay aligned.
- **WhatsApp-First & Local Lead Workflows**: Directly addresses how Indian businesses actually close deals — integrating WhatsApp automations, fast mobile forms, and CRM integrations alongside traditional email.
- **India-Tailored Industry Playbooks**: Sector-specific solutions for Indian market verticals (Healthcare clinics, Real Estate developers, D2C retail brands, Professional CA/Legal services) with local SEO and conversion benchmarks.
- **Dual-Entity Transparency Model**: Clear distinction between the registered US corporate entity (Ethixweb USA LLC, Wyoming) for contracts and IP ownership, and the New Delhi delivery center for 24/7 engineering velocity.

---

### 2. What We Improved Over the Current / Previous Site
| Area | Previous / Generic Agency Site | Our New Ethixweb Platform |
|---|---|---|
| **Aesthetics & Immersion** | Flat, cookie-cutter templates with stock photos | Custom Three.js 3D neural network, crimson laser glows, and responsive interactive canvases |
| **India Map Visualization** | Missing or faint static image | Full interactive SVG map of India with live hub selection, telemetry drawers, and clear contrast in both light and dark modes |
| **Theme Experience** | Hard toggle or broken dark mode | Smooth circular View Transition ripple animation with custom-tuned high-contrast typography across both modes |
| **Lead Engine & Admin** | Static non-functional form or unverified email links | Full-stack PostgreSQL (Supabase) integration with honeypot spam protection, rate limiting, and an authenticated Kanban-style admin lead dashboard (`/admin`) |
| **Legal & Compliance** | Broken 404 links or jarring page redirects | Zero-redirect in-page modal dialogs for Cancellation & Refunds, Terms & Conditions, and Privacy Policy |
| **Navigation & Micro-Interactions** | Standard rigid menus | Smooth-scrolling top anchors, animated brand docks, active LinkedIn feeds, and live timezone tickers |

---

### 3. PageSpeed Insights (90+ on Mobile & Desktop)
To guarantee **90+ Lighthouse and Google PageSpeed Insights scores** across both mobile and desktop devices, we implemented core web performance engineering:
- **Self-Hosted Next.js Fonts (`next/font/google`)**: Inter and Space Grotesk are downloaded and bundled at build time with `display: 'swap'`, completely eliminating render-blocking external Google Fonts CSS requests.
- **Zero Cumulative Layout Shift (CLS = 0)**: Pre-calculated aspect ratios, SVG viewBox coordinates, and reserved container heights ensure zero content jumping during page load.
- **Lazy Hydration & Dynamic 3D Loading**: Heavy Three.js 3D hero scenes are loaded asynchronously via `next/dynamic` (`ssr: false`) with prefers-reduced-motion fallbacks, allowing critical DOM elements to render instantly.
- **Optimized Asset Pipeline & Minification**: Next.js SWC minification enabled, server response compression enabled, and `poweredByHeader` disabled to reduce payload size.
- **Mobile-First Layouts**: Fully responsive grid systems tailored for mobile networks (3G/4G/5G) with minimal initial JS payloads and instant First Contentful Paint (FCP).

---

### 4. Distinctive Brand Identity (Crimson & Graphite)
Most tech agencies use generic SaaS blue or purple. Ethixweb uses a deliberate palette of **Deep Graphite (`#0f0f13`)**, **Vibrant Crimson (`#dc2626` / `#ef4444`)**, and **Warm Ivory (`#fbfbfa`)**. It feels authoritative, energetic, and distinct on both desktop and mobile screens.

---

### 5. Satisfying Circular Theme Switch Animation
Toggling between light and dark mode uses the browser's native **View Transitions API** (`document.startViewTransition`) with an expanding circular clip-path wave originating from the toggle button. Both Sun and Moon icons feature spring-loaded rotation and glowing halos.

---

### 6. Interactive Footer with Neural Background Animation
The footer replaces generic links with an interactive bento-box layout:
- **Animated Background Canvas**: Floating crimson nodes and laser connections that mirror the home page 3D hero.
- **Active Social Hub**: Direct link to Ethixweb's official LinkedIn page, plus animated interactive micro-interactions on other icons.
- **In-Page Legal Modals**: Cancellation & Refund, Terms & Conditions, and Privacy Policy open in clean modal dialogs so visitors can review policies without getting redirected or hitting 404 pages.
- **Smooth Scroll**: Clicking the logo or "Back to top" smoothly glides back to the top of the page.

---

## Getting Started Locally

### Prerequisites
- Node.js 18.x or 20.x
- npm

### 1. Clone & Install Dependencies
```bash
git clone <your-repository-url>
cd project
npm install --legacy-peer-deps
```

### 2. Set Up Environment Variables
Create a `.env` file in the project root:

```ini
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Admin Dashboard Access
ADMIN_EMAIL=admin@ethixweb.com
ADMIN_PASSWORD=admin123
ADMIN_PASSWORD_HASH=$2b$10$Ok/cJLOL4yHfX4dNSZrX3O6wenTsXWj.QkPjbsnxz07jIm/Hau5MO

# Session Secret (random 64-character string)
AUTH_SECRET=4f9b2d8e1a7c3f5e9b2d8e1a7c3f5e9b4f9b2d8e1a7c3f5e9b2d8e1a7c3f5e9b

# Public Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database Setup (Supabase)

If setting up a fresh Supabase project, run the SQL script located in:
`supabase/migrations/20261013142753_create_enquiries_and_rate_limits.sql`

This script creates:
1. **`enquiries` table**:
   - `id` (UUID primary key)
   - `name`, `email`, `phone`, `company`, `service`, `budget`, `message`
   - `status` (`new`, `contacted`, `qualified`, `won`, `lost`)
   - `notes` (Admin internal notes)
   - `created_at`, `updated_at` timestamps
2. **`rate_limits` table**:
   - Persistent IP rate-limiting for spam protection.

---

## Admin Portal & Lead Management

To access the lead management portal:
1. Navigate to `/admin/login`.
2. Default credentials:
   - **Email**: `admin@ethixweb.com`
   - **Password**: `admin123`
3. Features:
   - Real-time lead count and status overview.
   - Filter leads by status (`new`, `contacted`, `qualified`, `won`, `lost`) and service category.
   - Update lead status and save internal progress notes.
   - Delete leads.

*To change the admin password, generate a new bcrypt hash:*
```bash
node -e "console.log(require('bcryptjs').hashSync('YourNewPassword', 10))"
```
*Paste the resulting hash into `ADMIN_PASSWORD_HASH` in your `.env`.*

---

## Deployment to Vercel

The project is pre-configured and verified for Vercel deployment:

1. Push your code to your GitHub repository:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. Import the project in [Vercel](https://vercel.com/new).
3. Under **Project Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD_HASH`
   - `AUTH_SECRET`
   - `NEXT_PUBLIC_SITE_URL` *(set to your live domain e.g. `https://ethixweb.com`)*
4. Click **Deploy**. Vercel will build and launch your site automatically.

---

## Running Automated Tests

Run the built-in Jest test suite:
```bash
npm test
```
Validates form schemas, spam honeypot filters, session cookie generation, and token tampering defenses.

---

## License

Copyright © 2026 Ethixweb USA LLC. All rights reserved.
