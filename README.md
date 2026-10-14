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

### 1. Distinctive Brand Identity (Crimson & Graphite)
Most tech agencies use generic shades of SaaS blue or purple. Ethixweb uses a deliberate palette of **Deep Graphite (`#0f0f13`)**, **Vibrant Crimson (`#dc2626` / `#ef4444`)**, and **Warm Ivory (`#fbfbfa`)**. It feels authoritative, energetic, and distinct on both desktop and mobile screens.

### 2. Dual-Market Architecture (US Corporate + India Engineering)
Ethixweb operates as a US LLC with an engineering delivery center in India. The design communicates this through:
- **Live IST Clock**: Displays current Indian Standard Time in the header.
- **Dual Timezones**: Kent, WA (PST) and New Delhi (IST) business hours displayed across contact areas.
- **INR & Transparent Scopes**: Transparent pricing ranges and WhatsApp automation workflows tailored for international and Indian businesses.

### 3. Satisfying Circular Theme Switch Animation
Toggling between light and dark mode uses the browser's native **View Transitions API** (`document.startViewTransition`) with an expanding circular clip-path wave originating from the toggle button. Both Sun and Moon icons feature spring-loaded rotation and glowing halos.

### 4. Interactive Footer with Neural Background Animation
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
