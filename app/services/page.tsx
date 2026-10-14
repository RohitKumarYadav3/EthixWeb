import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Users, Zap, Shield } from 'lucide-react';
import { SiteHeader } from '@/components/site/header';
import { SiteFooter } from '@/components/site/footer';
import { serviceCategories } from '@/lib/services-data';

export const metadata: Metadata = {
  title: 'Services — 22 Digital Services in 6 Categories',
  description:
    'Websites, AI, growth, data, accessibility, and support. Twenty-two services across six categories for Indian businesses.',
};

const deliveryApproach = [
  { icon: Users, title: 'Collaborative', desc: 'You are involved at every stage — no black boxes, no surprises.' },
  { icon: Zap, title: 'Fast', desc: 'Most projects launch in 2-4 weeks. We move quickly without cutting corners.' },
  { icon: Shield, title: 'Reliable', desc: 'Clear timelines, honest communication, and deliverables that match the scope.' },
];

const processSteps = [
  { num: '01', title: 'Audit', desc: 'We analyze your current setup, competitors, and customer journey.' },
  { num: '02', title: 'Plan', desc: 'A clear roadmap with priorities, timelines, and measurable goals.' },
  { num: '03', title: 'Build', desc: 'Design, develop, and integrate with modern technology and best practices.' },
  { num: '04', title: 'Optimize', desc: 'Launch, measure, and continuously improve for better conversions.' },
];

const serviceFaqs = [
  { q: 'Do you work with existing websites or only new builds?', a: 'Both. We can redesign, optimize, or add functionality to an existing site, or build a new one from scratch. We start with an audit to recommend the best path forward.' },
  { q: 'How is pricing structured?', a: 'Pricing depends on scope and complexity. Website projects are typically fixed-price, while ongoing services like SEO, ads management, and support are monthly retainers. We provide a detailed quote after the discovery call.' },
  { q: 'Can you work with our existing CRM or tools?', a: 'In most cases, yes. We work with popular CRMs (HubSpot, Zoho), payment gateways (Razorpay, PhonePe), and communication tools (WhatsApp Business API). We will confirm compatibility during planning.' },
  { q: 'Do you offer ongoing support after launch?', a: 'Yes. We offer monthly support plans that include technical maintenance, content updates, AI knowledge base updates, and API monitoring. Most clients continue with us post-launch.' },
  { q: 'What if I only need one specific service?', a: 'That is fine. You can engage us for a single service — like a landing page, an SEO audit, or a chatbot — without committing to a full system. We will never upsell you on things you do not need.' },
];

export default function ServicesPage() {
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
              Services & Capabilities
            </div>

            <h1
              className="font-display type-page-title text-balance"
              style={{ animation: 'fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards', opacity: 0 }}
            >
              A full-stack digital<br />
              <span className="text-crimson-gradient">toolkit for growth.</span>
            </h1>

            <p
              className="mx-auto mt-7 max-w-2xl type-body-lg text-content-muted text-pretty"
              style={{ animation: 'fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.25s forwards', opacity: 0 }}
            >
              Twenty-two services across six categories. From your website to
              your AI receptionist to your monthly performance report — every
              piece works as a joined-up system.
            </p>
          </div>
        </div>
      </section>

      {/* Category navigation */}
      <section className="sticky top-[68px] z-30 border-y border-line-subtle bg-surface/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <nav className="flex gap-1.5 overflow-x-auto py-3">
            {serviceCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="type-nav flex shrink-0 items-center gap-2 rounded-full border border-line-subtle bg-surface px-4 py-2 text-content-secondary transition-colors hover:border-crimson/30 hover:bg-content/5 hover:text-content"
              >
                <cat.icon className="h-4 w-4 text-crimson" />
                {cat.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Service categories */}
      {serviceCategories.map((cat, catIndex) => (
        <section
          key={cat.id}
          id={cat.id}
          className={`py-14 md:py-20 ${catIndex % 2 === 1 ? 'border-y border-line-subtle bg-surface-secondary' : ''}`}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            {/* Category header */}
            <div className="mb-10 md:mb-12">
              <div className="mb-6 flex items-center gap-4">
                <span className="section-number font-display text-sm font-bold text-crimson">
                  {String(catIndex + 1).padStart(2, '0')}
                </span>
                <div className="h-px flex-1 bg-content/10" />
              </div>
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-crimson/10">
                  <cat.icon className="h-7 w-7 text-crimson" />
                </div>
                <div>
                  <p className="type-eyebrow mb-2 text-crimson">{cat.label}</p>
                  <h2 className="type-section-title text-balance">
                    {cat.tagline}
                  </h2>
                </div>
              </div>
            </div>

            {/* Service cards */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {cat.services.map((service, sIndex) => (
                <ServiceDetailCard key={service.id} service={service} categoryLabel={cat.label} alternate={sIndex % 2 === 1} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Delivery process */}
      <section className="border-y border-line-subtle bg-surface-secondary py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 md:mb-12">
            <p className="type-eyebrow mb-4 text-crimson">How we deliver</p>
            <h2 className="type-section-title text-balance">
              A clear four-step process.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <div
                key={step.num}
                className="group"
                style={{ animation: 'fade-in-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards', animationDelay: `${i * 100}ms`, opacity: 0 }}
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-crimson/20 bg-crimson/5 transition-all group-hover:border-crimson/50">
                  <span className="font-display text-sm font-bold text-crimson">{step.num}</span>
                </div>
                <h3 className="type-card-title mb-3">{step.title}</h3>
                <p className="type-body-sm text-content-muted text-pretty">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {deliveryApproach.map((item, i) => (
              <div
                key={item.title}
                className="group rounded-xl border border-line-subtle bg-surface p-8 transition-colors duration-300 hover:border-crimson/20"
                style={{ animation: 'fade-in-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards', animationDelay: `${i * 100}ms`, opacity: 0 }}
              >
                <item.icon className="mb-6 h-8 w-8 text-crimson" />
                <h3 className="type-card-title mb-3">{item.title}</h3>
                <p className="type-body-sm text-content-muted text-pretty">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="mb-10 md:mb-12">
            <p className="type-eyebrow mb-4 text-crimson">FAQ</p>
            <h2 className="type-section-title text-balance">
              Questions about scope, pricing, and support.
            </h2>
          </div>
          <div className="space-y-4">
            {serviceFaqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-line-subtle bg-surface transition-colors hover:border-line-strong">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-display text-lg font-semibold text-content">
                  {faq.q}
                  <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line-subtle text-content-secondary transition-transform group-open:rotate-45">
                    <span className="text-lg leading-none">+</span>
                  </span>
                </summary>
                <div className="type-body px-6 pb-6 text-content-muted text-pretty">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

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
              Ready to grow?
            </h2>
            <p className="type-body-lg mx-auto mt-6 max-w-xl text-white/80 text-pretty">
              Tell us about your business and we will recommend the right
              combination of services to reach your goals.
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

function ServiceDetailCard({
  service,
  categoryLabel,
  alternate,
}: {
  service: {
    id: string;
    title: string;
    desc: string;
    problem: string;
    deliverables: string[];
    benefits: string[];
    integrations?: string[];
  };
  categoryLabel: string;
  alternate: boolean;
}) {
  return (
    <div
      className="card-lift group rounded-2xl border border-line-subtle bg-surface p-8 transition-all duration-500 hover:border-crimson/30 md:p-10"
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="type-caption rounded-full border border-line-subtle bg-surface-secondary px-3 py-1 font-medium text-content-secondary">
          {categoryLabel}
        </span>
        {service.integrations && (
          <span className="type-caption text-content-muted">Integrations available</span>
        )}
      </div>

      <h3 className="type-card-title mb-3">{service.title}</h3>
      <p className="type-body-sm mb-6 text-content-muted text-pretty">{service.desc}</p>

      <div className="mb-6 rounded-xl border border-line-subtle bg-surface-secondary p-4">
        <p className="type-eyebrow mb-2 text-crimson">The problem</p>
        <p className="type-body-sm text-content-secondary text-pretty">{service.problem}</p>
      </div>

      <div className="mb-6">
        <p className="type-eyebrow mb-3 text-content-secondary">What you get</p>
        <ul className="space-y-2">
          {service.deliverables.map((d) => (
            <li key={d} className="type-body-sm flex items-center gap-2 text-content-secondary">
              <Check className="h-4 w-4 shrink-0 text-crimson" />
              {d}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <p className="type-eyebrow mb-3 text-content-secondary">Benefits</p>
        <ul className="space-y-2">
          {service.benefits.map((b) => (
            <li key={b} className="type-body-sm flex items-center gap-2 text-content-muted">
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-crimson/70" />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {service.integrations && (
        <div className="mb-6">
          <p className="type-eyebrow mb-2 text-content-secondary">Supported integrations</p>
          <div className="flex flex-wrap gap-2">
            {service.integrations.map((int) => (
              <span key={int} className="type-caption rounded-md border border-crimson/25 bg-crimson/5 px-2.5 py-1 text-crimson">
                {int}
              </span>
            ))}
          </div>
        </div>
      )}

      <Link
        href={`/contact?service=${service.id}`}
        className="type-btn group/btn inline-flex items-center gap-2 text-crimson transition-colors hover:text-crimson-bright"
      >
        Enquire about {service.title}
        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
      </Link>
    </div>
  );
}
