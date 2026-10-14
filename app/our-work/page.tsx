'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SiteHeader } from '@/components/site/header';
import { SiteFooter } from '@/components/site/footer';
import { BrowserMockup } from '@/components/site/browser-mockup';

type ProjectCategory = 'all' | 'website' | 'ecommerce' | 'b2b' | 'ai';

interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  industry: string;
  problem: string;
  approach: string;
  services: string[];
  integrations: string[];
  outcome: string;
  mockup: 'seo' | 'ecommerce' | 'crm' | 'ai';
  tags: string[];
}

const projects: Project[] = [
  {
    id: 'home-services-website',
    title: 'Home Services Website',
    category: 'website',
    categoryLabel: 'Website + Local SEO',
    industry: 'Local Services',
    problem: 'A plumbing business in Pune was not appearing on Google Maps, had no website, and was missing calls while on jobs. Leads came only through word of mouth.',
    approach: 'We built a mobile-first website with service-area landing pages, set up and optimized the Google Business Profile, and integrated a WhatsApp booking button. A lightweight CRM logs every enquiry automatically.',
    services: ['Website Design', 'Local SEO', 'Google Business Profile', 'WhatsApp Workflows'],
    integrations: ['WhatsApp Business API', 'Google Business Profile', 'CRM'],
    outcome: 'The business now appears in the Google Maps pack for their service area, and every enquiry is logged and followed up automatically — no more missed leads while on a job.',
    mockup: 'seo',
    tags: ['Next.js', 'Local SEO', 'WhatsApp', 'CRM'],
  },
  {
    id: 'd2c-storefront',
    title: 'D2C E-commerce Storefront',
    category: 'ecommerce',
    categoryLabel: 'E-commerce + CRM',
    industry: 'D2C Brand',
    problem: 'A skincare D2C brand selling through Instagram had no website, no checkout, and no way to track customers. Orders were managed manually in a spreadsheet.',
    approach: 'We designed a storefront with product pages optimized for mobile, integrated UPI checkout, and connected order confirmations to WhatsApp automatically. A CRM tracks every customer and purchase for remarketing.',
    services: ['E-commerce Website', 'Analytics', 'Meta Ads', 'Email Marketing'],
    integrations: ['Razorpay (UPI)', 'WhatsApp API', 'CRM', 'GA4'],
    outcome: 'The brand now owns its checkout experience, captures every customer in a CRM, and sends automated WhatsApp order updates — reducing manual work and enabling remarketing.',
    mockup: 'ecommerce',
    tags: ['Next.js', 'UPI', 'WhatsApp API', 'Inventory'],
  },
  {
    id: 'manufacturing-leads',
    title: 'Manufacturing Lead Generation',
    category: 'b2b',
    categoryLabel: 'Website + CRM',
    industry: 'B2B / Manufacturing',
    problem: 'A manufacturing company had an outdated website with no enquiry tracking. Leads came through phone calls only, with no qualification or follow-up system.',
    approach: 'We redesigned the website with a structured product catalog, SEO-optimized category pages, and enquiry forms that feed directly into a CRM. Leads are scored by company size and order value, and routed to the sales team instantly.',
    services: ['Website Redesign', 'Product Catalog', 'SEO', 'CRM Integration'],
    integrations: ['CRM', 'GA4', 'Google Search Console'],
    outcome: 'The company now appears in organic search for industrial product queries, and every enquiry is tracked, scored, and followed up through a structured sales pipeline.',
    mockup: 'crm',
    tags: ['B2B', 'Catalog', 'CRM', 'SEO'],
  },
  {
    id: 'ai-lead-management',
    title: 'AI Lead Management System',
    category: 'ai',
    categoryLabel: 'AI + CRM',
    industry: 'B2B Services',
    problem: 'A professional services firm was losing leads because they could not respond fast enough. Enquiries coming in after hours waited until the next business day, and many went to competitors.',
    approach: 'We deployed an AI receptionist that responds to website and WhatsApp enquiries instantly, 24/7. It qualifies leads based on service type and urgency, books consultations, and routes complex conversations to the team with full context.',
    services: ['AI Chatbot', 'Lead Scoring', 'WhatsApp Automation', 'CRM'],
    integrations: ['WhatsApp API', 'Google Calendar', 'CRM', 'AI'],
    outcome: 'Enquiries now get an instant response at any hour. Qualified leads are booked into consultations automatically, and the team receives only the conversations that need a human touch.',
    mockup: 'ai',
    tags: ['AI', 'WhatsApp', 'Lead Scoring', '24/7'],
  },
];

const filters: { value: ProjectCategory; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'website', label: 'Websites' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'b2b', label: 'B2B / Manufacturing' },
  { value: 'ai', label: 'AI Systems' },
];

export default function OurWorkPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-surface text-content">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="grid-pattern absolute inset-0 opacity-[0.03]" />
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-crimson/5 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-line-subtle bg-content/5 px-4 py-2 type-eyebrow text-content-secondary backdrop-blur-sm"
              style={{ animation: 'fade-in-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards' }}
            >
              <span className="h-2 w-2 rounded-full bg-crimson animate-glow" />
              Our Work & Concept Projects
            </div>

            <h1
              className="font-display type-page-title text-balance"
              style={{ animation: 'fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards', opacity: 0 }}
            >
              Concept projects that<br />
              <span className="text-crimson-gradient">show how we think.</span>
            </h1>

            <p
              className="mx-auto mt-7 max-w-2xl type-body-lg text-content-muted text-pretty"
              style={{ animation: 'fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.25s forwards', opacity: 0 }}
            >
              These are illustrative projects representing the kinds of problems
              we solve and the systems we build. Each one shows a business
              challenge, our approach, and the intended outcome.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[68px] z-30 border-y border-line-subtle bg-surface/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <nav className="flex gap-1.5 overflow-x-auto py-3">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`type-nav shrink-0 rounded-full border px-4 py-2 font-medium transition-all duration-200 ${
                  activeFilter === filter.value
                    ? 'border-crimson bg-crimson text-white shadow-sm shadow-crimson/25'
                    : 'border-line-subtle bg-surface text-content-secondary hover:border-line-strong hover:bg-content/5 hover:text-content'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Project grid */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="card-lift group overflow-hidden rounded-2xl border border-line-subtle bg-surface text-left transition-all duration-500 hover:border-crimson/30"
              >
                <div className="overflow-hidden border-b border-line-subtle">
                  <div className="transition-transform duration-500 group-hover:scale-[1.02]">
                    <BrowserMockup variant={project.mockup} />
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="type-caption rounded-full bg-crimson/10 px-3 py-1 font-medium text-crimson">
                      {project.categoryLabel}
                    </span>
                    <span className="type-caption text-content-muted">{project.industry}</span>
                  </div>
                  <h3 className="type-card-title mb-2">
                    {project.title}
                  </h3>
                  <p className="type-body-sm mb-4 text-content-muted text-pretty line-clamp-2">
                    {project.problem}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.services.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="type-caption rounded-md border border-crimson/25 bg-crimson/5 px-2 py-0.5 text-crimson"
                      >
                        {s}
                      </span>
                    ))}
                    {project.services.length > 3 && (
                      <span className="type-caption rounded-md border border-line-subtle bg-surface-secondary px-2 py-0.5 text-content-secondary">
                        +{project.services.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="type-btn mt-4 flex items-center gap-2 text-crimson">
                    View details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          <p className="type-caption mt-12 text-center text-content-faint italic">
            All projects are illustrative concepts representing our capabilities
            and approach. No actual client results are claimed.
          </p>
        </div>
      </section>

      {/* Project detail modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="bg-crimson-gradient red-glow relative">
          <div className="grid-pattern absolute inset-0 opacity-[0.05]" />
          <div className="absolute right-10 top-10 h-32 w-32 rounded-full border border-line-subtle animate-float" />
          <div
            className="absolute bottom-10 left-10 h-20 w-20 rounded-full border border-line-subtle animate-float"
            style={{ animationDelay: '2s' }}
          />

          <div className="relative mx-auto max-w-5xl px-6 py-24 text-center md:py-32 lg:px-10">
            <h2 className="font-display type-section-title text-white text-balance">
              Want something like this?
            </h2>
            <p className="type-body-lg mx-auto mt-6 max-w-xl text-white/80 text-pretty">
              Tell us about your business and the problem you are trying to
              solve. We will propose an approach that fits.
            </p>
            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 type-btn text-crimson shadow-lg transition-all duration-300 hover:bg-graphite hover:text-white"
            >
              <span>Start a project enquiry</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-line-subtle bg-surface p-6 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-line-subtle bg-surface-secondary text-content-secondary transition-colors hover:border-line-strong hover:bg-content/5 hover:text-content"
          aria-label="Close"
        >
          <span className="text-lg">✕</span>
        </button>

        <div className="mb-4 flex items-center gap-3">
          <span className="type-caption rounded-full bg-crimson/10 px-3 py-1 font-medium text-crimson">
            {project.categoryLabel}
          </span>
          <span className="type-caption text-content-muted">{project.industry}</span>
        </div>

        <h2 className="type-card-title mb-6 !text-2xl md:!text-3xl">{project.title}</h2>

        <div className="mb-6 overflow-hidden rounded-xl border border-line-subtle">
          <BrowserMockup variant={project.mockup} />
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="type-eyebrow mb-2 text-crimson">
              The problem
            </h3>
            <p className="type-body text-content-secondary text-pretty">{project.problem}</p>
          </div>

          <div>
            <h3 className="type-eyebrow mb-2 text-crimson">
              Our approach
            </h3>
            <p className="type-body text-content-secondary text-pretty">{project.approach}</p>
          </div>

          <div>
            <h3 className="type-eyebrow mb-3 text-crimson">
              Services used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.services.map((s) => (
                <span
                  key={s}
                  className="type-caption rounded-md border border-crimson/25 bg-crimson/5 px-3 py-1 text-crimson"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {project.integrations.length > 0 && (
            <div>
              <h3 className="type-eyebrow mb-3 text-crimson">
                Integrations
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.integrations.map((int) => (
                  <span
                    key={int}
                    className="type-caption rounded-md border border-line-subtle bg-surface-secondary px-3 py-1 text-content-secondary"
                  >
                    {int}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="type-eyebrow mb-2 text-crimson">
              Intended outcome
            </h3>
            <p className="type-body text-content-secondary text-pretty">{project.outcome}</p>
          </div>
        </div>

        <div className="mt-8 border-t border-line-subtle pt-6">
          <Link
            href="/contact"
            className="type-btn group inline-flex items-center gap-2 text-crimson hover:text-crimson-bright transition-colors"
          >
            Discuss a similar project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
