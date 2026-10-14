import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Store,
  ShoppingCart,
  Factory,
  Briefcase,
  ArrowRight,
  Check,
  AlertCircle,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { SiteHeader } from '@/components/site/header';
import { SiteFooter } from '@/components/site/footer';
import { BrowserMockup } from '@/components/site/browser-mockup';

export const metadata: Metadata = {
  title: 'Industries — Solutions for Indian Business Segments',
  description:
    'Tailored digital solutions for home and local services, D2C and e-commerce, manufacturing and B2B, and professional services. See the challenges, recommended services, and example workflows Ethixweb builds for each segment.',
};

type Industry = {
  id: 'local-services' | 'd2c-ecommerce' | 'manufacturing-b2b' | 'professional-services';
  label: string;
  icon: typeof Store;
  title: string;
  tagline: string;
  challenges: string[];
  services: string[];
  workflow: string[];
  mockup: 'seo' | 'ecommerce' | 'crm' | 'healthcare';
  cta: string;
};

const industries: Industry[] = [
  {
    id: 'local-services',
    label: 'Home & Local Services',
    icon: Store,
    title: 'Home and local services',
    tagline:
      'Get found on Google, never miss a lead, and turn one-time customers into repeat business.',
    challenges: [
      'Not showing up on Google Maps when nearby customers search',
      'Missing calls while on a job — leads slip through the cracks',
      'No follow-up system after a service is completed',
      'No online reviews to build trust with new customers',
    ],
    services: [
      'Website Design',
      'Local SEO',
      'Google Business Profile',
      'WhatsApp Workflows',
      'CRM Integration',
    ],
    workflow: [
      'Customer searches for a service on Google',
      'Finds your Google Business Profile in the map pack',
      'Visits your mobile-first website to check services and pricing',
      'Sends a WhatsApp enquiry with one tap',
      'CRM logs the lead automatically with source and intent',
      'Automated follow-up is sent if there is no response within a day',
    ],
    mockup: 'seo',
    cta: 'Get your local service business found',
  },
  {
    id: 'd2c-ecommerce',
    label: 'D2C & E-commerce',
    icon: ShoppingCart,
    title: 'D2C and e-commerce',
    tagline:
      'Recover abandoned carts, automate order confirmations, and turn first-time buyers into loyal fans.',
    challenges: [
      'High cart abandonment with no recovery mechanism',
      'No automated order confirmation or shipping updates',
      'Customer data scattered across Instagram, Shopify, and spreadsheets',
      'No remarketing engine to drive repeat purchases',
    ],
    services: [
      'E-commerce Website',
      'Analytics',
      'Meta Ads',
      'Email Marketing',
      'CRM Integration',
    ],
    workflow: [
      'Customer discovers the brand on Instagram through an ad or post',
      'Visits the product page from a tracked UTM link',
      'Adds to cart and checks out seamlessly via UPI',
      'WhatsApp order confirmation is sent automatically with details',
      'CRM records the purchase, product, and customer profile',
      'Email remarketing sequence targets the customer for a repeat purchase',
    ],
    mockup: 'ecommerce',
    cta: 'Scale your D2C brand',
  },
  {
    id: 'manufacturing-b2b',
    label: 'Manufacturing & B2B',
    icon: Factory,
    title: 'Manufacturing and B2B',
    tagline:
      'Modernize your online presence, qualify enquiries automatically, and give your sales team a pipeline that works.',
    challenges: [
      'Outdated website that undersells your capabilities',
      'No system to track and respond to incoming enquiries',
      'No lead qualification — sales chases low-intent contacts',
      'Poor search visibility for the industrial products you manufacture',
    ],
    services: [
      'Website Redesign',
      'Product Catalog',
      'SEO',
      'CRM Integration',
      'Analytics',
    ],
    workflow: [
      'Buyer searches for an industrial product or specification',
      'Lands on your SEO-optimized product catalog page',
      'Submits an enquiry form with quantity and requirements',
      'CRM qualifies the lead based on company size and order value',
      'Sales team gets an instant notification with a lead score',
      'Quotation is sent, tracked, and followed up through the CRM',
    ],
    mockup: 'crm',
    cta: 'Modernize your B2B presence',
  },
  {
    id: 'professional-services',
    label: 'Professional Services',
    icon: Briefcase,
    title: 'Professional services',
    tagline:
      'Book appointments online, answer enquiries instantly with AI, and build trust before the first meeting.',
    challenges: [
      'No online appointment system — clients call during business hours only',
      'Slow enquiry response loses prospects to faster competitors',
      'No content strategy to demonstrate expertise and authority',
      'No trust signals — testimonials, case studies, or credentials',
    ],
    services: [
      'Trust-focused Website',
      'Appointment Booking',
      'AI FAQ Assistant',
      'Local SEO',
      'Monthly Reporting',
    ],
    workflow: [
      'Client searches for a professional service in their area',
      'Visits a polished, trust-focused website with credentials',
      'AI assistant answers initial questions instantly, 24/7',
      'Client books an appointment online from available slots',
      'Automated reminders are sent before the appointment',
      'Follow-up and review request are sent after the visit',
    ],
    mockup: 'healthcare',
    cta: 'Build trust and book more clients',
  },
];

const industryFaqs = [
  {
    q: 'Does Ethixweb only work with specific industries?',
    a: 'No. The four segments on this page — home and local services, D2C and e-commerce, manufacturing and B2B, and professional services — cover the majority of Indian businesses we work with, but we have also built solutions for education, healthcare, real estate, and hospitality. If your business serves customers or clients online, we can almost certainly help. Tell us about your segment on the contact form and we will share relevant examples.',
  },
  {
    q: 'How does the process differ by industry?',
    a: 'The core four-step process — Audit, Plan, Build, Optimize — stays the same, but the emphasis shifts. For local services we prioritize Google Business Profile and WhatsApp lead capture. For D2C we focus on conversion rate, payment flow, and remarketing. For manufacturing and B2B we invest heavily in catalog structure, SEO, and enquiry qualification. For professional services we lead with trust design, booking automation, and an AI assistant. The discovery call determines the exact priorities for your business.',
  },
  {
    q: 'Do we need an existing website to work with you?',
    a: 'Not at all. We build new websites from scratch and we also redesign, optimize, or add functionality to existing ones. If you already have a site, we start with an audit to identify what is working and what is not, then recommend whether a refresh or a full rebuild is the better investment. If you are starting from zero, we handle everything from domain and hosting to design, development, and launch.',
  },
  {
    q: 'Does pricing vary by industry?',
    a: 'Pricing is driven by scope and complexity rather than industry label, though certain industries tend to need more. A local services site with WhatsApp integration is typically lighter than a full D2C e-commerce build with payment, logistics, and remarketing. A manufacturing catalog with hundreds of SKUs and SEO is priced differently from a professional services site with booking and an AI assistant. After the discovery call we provide a detailed, fixed-price quote with no hidden line items.',
  },
];

export default function IndustriesPage() {
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
              Industries & Segments
            </div>

            <h1
              className="font-display type-page-title text-balance"
              style={{ animation: 'fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards', opacity: 0 }}
            >
              Built for how Indian<br />
              <span className="text-crimson-gradient">businesses operate.</span>
            </h1>

            <p
              className="mx-auto mt-7 max-w-2xl type-body-lg text-content-muted text-pretty"
              style={{ animation: 'fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.25s forwards', opacity: 0 }}
            >
              From the local service provider who misses calls on site
              to the D2C brand fighting cart abandonment — we assemble the
              right combination of services for how your segment actually
              wins customers.
            </p>
          </div>
        </div>
      </section>

      {/* Industry selector */}
      <section className="sticky top-[68px] z-30 border-y border-line-subtle bg-surface/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <nav className="flex gap-2 overflow-x-auto py-3">
            {industries.map((industry) => (
              <a
                key={industry.id}
                href={`#${industry.id}`}
                className="type-nav flex shrink-0 items-center gap-2 rounded-full border border-line-subtle bg-surface px-4 py-2 text-content-secondary transition-colors hover:border-crimson/30 hover:bg-content/5 hover:text-content shadow-sm"
              >
                <industry.icon className="h-4 w-4 text-crimson" />
                {industry.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Industry sections */}
      {industries.map((industry, index) => (
        <IndustrySection key={industry.id} industry={industry} index={index} />
      ))}

      {/* FAQ */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="mb-10 md:mb-12">
            <p className="type-eyebrow mb-4 text-crimson">FAQ</p>
            <h2 className="type-section-title text-balance">
              Questions about industries, scope, and pricing.
            </h2>
          </div>
          <div className="space-y-4">
            {industryFaqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-line-subtle bg-surface-secondary transition-colors hover:border-line-subtle"
              >
                <summary className="flex cursor-pointer items-center justify-between p-6 font-display text-lg font-semibold text-content">
                  {faq.q}
                  <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line-subtle text-content-faint transition-transform group-open:rotate-45">
                    <span className="text-lg leading-none">+</span>
                  </span>
                </summary>
                <div className="type-body px-6 pb-6 text-content-muted text-pretty">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden">
        <div className="bg-crimson-gradient red-glow relative">
          <div className="grid-pattern absolute inset-0 opacity-[0.05]" />
          <div className="absolute right-10 top-10 h-32 w-32 rounded-full border border-line-subtle animate-float" />
          <div
            className="absolute bottom-10 left-10 h-20 w-20 rounded-full border border-line-subtle animate-float"
            style={{ animationDelay: '2s' }}
          />

          <div className="relative mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
            <h2 className="font-display type-section-title text-balance text-white">
              Tell us your segment.
            </h2>
            <p className="type-body-lg mx-auto mt-6 max-w-xl text-white/85 text-pretty">
              We will map the exact combination of services your business
              needs to find, convert, and keep more customers.
            </p>
            <Link
              href="/contact"
              className="type-btn group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-crimson shadow-lg transition-all duration-300 hover:bg-graphite hover:text-white"
            >
              Start a project enquiry
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function IndustrySection({ industry, index }: { industry: Industry; index: number }) {
  const Icon = industry.icon;
  const isOdd = index % 2 === 0; // first section (index 0) gets graphite-light

  return (
    <section
      id={industry.id}
      className={`scroll-mt-32 py-14 md:py-20 ${isOdd ? 'border-y border-line-subtle bg-surface-secondary' : ''}`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-10 md:mb-12">
          <div className="mb-6 flex items-center gap-4">
            <span className="section-number font-display text-sm font-bold text-crimson">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="h-px flex-1 bg-content/10" />
          </div>
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-crimson/10">
              <Icon className="h-7 w-7 text-crimson" />
            </div>
            <div>
              <p className="type-eyebrow mb-2 text-crimson">
                {industry.label}
              </p>
              <h2 className="type-section-title text-balance">
                {industry.title}
              </h2>
              <p className="type-body-lg mt-4 max-w-2xl text-content-muted text-pretty">
                {industry.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Two-column: content + mockup */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: content */}
          <div className="order-2 lg:order-1">
            {/* Challenges */}
            <div className="mb-10">
              <div className="mb-5 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-crimson" />
                <h3 className="type-eyebrow !text-xs text-content-secondary">
                  Common challenges
                </h3>
              </div>
              <ul className="space-y-3">
                {industry.challenges.map((challenge) => (
                  <li
                    key={challenge}
                    className="type-body-sm flex items-start gap-3 rounded-lg border border-line-subtle bg-surface p-4 text-content-secondary text-pretty"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson/60" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended services */}
            <div className="mb-10">
              <div className="mb-5 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-crimson" />
                <h3 className="type-eyebrow !text-xs text-content-secondary">
                  Recommended services
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {industry.services.map((service) => (
                  <span
                    key={service}
                    className="type-caption rounded-full border border-crimson/20 bg-crimson/5 px-4 py-2 text-crimson/90"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Workflow */}
            <div className="mb-10">
              <div className="mb-5 flex items-center gap-2">
                <Workflow className="h-5 w-5 text-crimson" />
                <h3 className="type-eyebrow !text-xs text-content-secondary">
                  Example workflow
                </h3>
              </div>
              <ol className="space-y-0">
                {industry.workflow.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-crimson/30 bg-crimson/5 font-display text-sm font-bold text-crimson">
                        {i + 1}
                      </span>
                      {i < industry.workflow.length - 1 && (
                        <span className="my-1 w-px flex-1 bg-content/10" />
                      )}
                    </div>
                    <p className="type-body-sm pb-6 pt-1 text-content-secondary text-pretty">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tailored CTA */}
            <Link
              href="/contact"
              className="type-btn group inline-flex items-center gap-2 text-crimson transition-colors hover:text-crimson-bright"
            >
              {industry.cta}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right: browser mockup */}
          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-36">
              <BrowserMockup
                variant={industry.mockup}
                className="card-lift rounded-2xl border border-line-subtle shadow-2xl shadow-black/40 transition-all duration-500 hover:border-crimson/30"
              />
              <p className="type-caption mt-4 text-center text-content-faint">
                Live system preview
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
