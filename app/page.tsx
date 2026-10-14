'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  ArrowRight, Globe, Search, MessageCircle, Database,
  Check, Zap, TrendingUp, Shield, Wrench,
  Network, BrainCircuit, Code2, Headphones, Layers, Gauge,
  type LucideIcon,
} from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { SiteHeader } from '@/components/site/header';
import { SiteFooter } from '@/components/site/footer';
import { serviceCategories } from '@/lib/services-data';
import { HeroFloatingTags } from '@/components/site/hero-floating-tags';
const HeroScene = dynamic(() => import('@/components/site/hero-scene').then(m => m.HeroScene), {
  ssr: false,
  loading: () => null,
});

const OperationsNetwork = dynamic(() => import('@/components/site/operations-network').then(m => m.OperationsNetwork), {
  ssr: true,
  loading: () => <div className="min-h-[500px]" />,
});

const ClientReviews = dynamic(() => import('@/components/site/client-reviews').then(m => m.ClientReviews), {
  ssr: true,
  loading: () => <div className="min-h-[300px]" />,
});

const TechEcosystemMarquee = dynamic(() => import('@/components/site/tech-ecosystem-marquee').then(m => m.TechEcosystemMarquee), {
  ssr: true,
  loading: () => <div className="min-h-[100px]" />,
});

const solutions: { icon: LucideIcon; title: string; desc: string; href: string }[] = [
  { icon: Headphones, title: 'AI Receptionists', desc: 'Handle enquiries, qualify leads, and book appointments — 24/7 on web and WhatsApp.', href: '/services#ai' },
  { icon: BrainCircuit, title: 'AI Automation', desc: 'Automate repetitive tasks with intelligent workflows — from lead scoring to content generation.', href: '/services#ai' },
  { icon: Globe, title: 'Websites', desc: 'Conversion-focused websites built to load fast, rank well, and turn visitors into customers.', href: '/services#websites' },
  { icon: Code2, title: 'Web Applications', desc: 'Custom dashboards, portals, and tools that solve specific business problems.', href: '/services#websites' },
  { icon: Database, title: 'CRM Integrations', desc: 'Connect your website, forms, WhatsApp, and email into one lead management system.', href: '/services#growth' },
  { icon: Search, title: 'SEO', desc: 'Technical and content optimization that helps your business rank on Google.', href: '/services#growth' },
  { icon: Wrench, title: 'Maintenance & Support', desc: 'Security, updates, troubleshooting, and ongoing content management.', href: '/services#support' },
  { icon: Zap, title: 'Digital Operations', desc: 'Connected systems that automate workflows and eliminate manual data entry.', href: '/services' },
];

const trustPoints = [
  { icon: MessageCircle, title: 'Senior-led collaboration', desc: 'You work directly with the people building your project. No account managers, no handoffs, no miscommunication.' },
  { icon: Network, title: 'Connected business systems', desc: 'Your website, CRM, WhatsApp, and analytics work as one system. Data flows automatically — no manual copy-paste.' },
  { icon: Shield, title: 'Clear scopes and communication', desc: 'You see exactly what we are building, why, and what it costs — before we start. Scope changes are documented and agreed.' },
  { icon: Gauge, title: 'Performance and accessibility', desc: 'Every site targets 90+ Lighthouse scores. Fast loading means better SEO, higher conversions, and lower bounce rates.' },
  { icon: TrendingUp, title: 'Measurable business outcomes', desc: 'We define what success looks like before we start, then track it. You see real numbers, not vanity metrics.' },
  { icon: Headphones, title: 'Ongoing support after launch', desc: 'Launch is the beginning, not the end. We offer maintenance, reporting, and continuous optimization.' },
];

const operatingModel = [
  {
    icon: Shield,
    title: 'Reliable systems',
    desc: 'Thoughtful architecture, security, and dependable integrations.',
    points: ['Production-grade builds', 'Security hardening at every layer', 'Monitoring and alerting', 'Backup and recovery'],
  },
  {
    icon: Layers,
    title: 'Connected execution',
    desc: 'Strategy, design, development, automation, and marketing working together.',
    points: ['One team across every surface', 'Shared data layer between tools', 'No vendor finger-pointing', 'Changes ship in one place'],
  },
  {
    icon: TrendingUp,
    title: 'Continuous improvement',
    desc: 'Analytics, reporting, and iterative optimization.',
    points: ['Monthly performance reports', 'A/B testing and refinement', 'Data-driven recommendations', 'Compounding gains over time'],
  },
];

const processSteps = [
  { num: '01', title: 'Discover and audit', desc: 'We analyze your current digital presence, competitors, and customer journey to identify gaps and opportunities.' },
  { num: '02', title: 'Plan and prioritize', desc: 'A clear roadmap with priorities, timelines, and measurable goals. You know exactly what we are building and why.' },
  { num: '03', title: 'Build and launch', desc: 'Design, develop, and integrate. Fast, accessible, production-grade builds using modern technology and best practices.' },
  { num: '04', title: 'Measure and optimize', desc: 'Launch, measure, and continuously improve. We track what matters and refine for better conversions over time.' },
];

export default function HomePage() {
  useScrollReveal();
  const [mount3D, setMount3D] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return;
      if ('requestIdleCallback' in window) {
        const win = window as unknown as {
          requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
          cancelIdleCallback: (id: number) => void;
        };
        const id = win.requestIdleCallback(() => setMount3D(true), { timeout: 1000 });
        return () => win.cancelIdleCallback(id);
      } else {
        const timer = setTimeout(() => setMount3D(true), 250);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-surface text-content">
      <SiteHeader />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden [isolation:isolate]">
        <div className="absolute inset-0 bg-surface" />
        <div className="absolute inset-0 bg-gradient-to-br from-crimson/5 via-surface to-surface" />
        <div className="absolute -right-10 top-1/4 h-[500px] w-[500px] rounded-full bg-crimson/8 blur-[150px]" />
        <div className="absolute left-0 bottom-0 h-[300px] w-[400px] rounded-full bg-crimson/4 blur-[120px]" />

        <div className="absolute inset-0 z-0 pointer-events-none">
          {mount3D && <HeroScene />}
        </div>

        <div className="absolute inset-y-0 left-0 z-10 w-full bg-gradient-to-r from-surface via-surface/75 to-transparent md:w-[68%] lg:w-[55%]" />
        <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-surface to-transparent" />

        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pt-24 pb-16 lg:px-10 md:pt-28">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line-subtle bg-content/5 px-4 py-2 type-eyebrow text-content-secondary backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-crimson animate-glow" />
              Premium digital operations team
            </div>

            <h1 className="font-display type-hero text-content text-balance">
              We run the<br />
              <span className="text-crimson">tech.</span><br />
              You run the<br />
              <span className="text-crimson">business.</span>
            </h1>

            <p className="mt-7 max-w-xl type-body-lg text-content-muted text-pretty">
              We connect websites, AI automation, marketing, and business
              systems to help businesses attract leads and grow.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-crimson px-7 py-3.5 type-btn text-white transition-all duration-300 hover:bg-crimson-dark hover:shadow-2xl hover:shadow-crimson/40"
              >
                <span>Start a project</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/our-work"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-content/20 px-7 py-3.5 type-btn text-content transition-all duration-300 hover:border-content/40 hover:bg-content/10 backdrop-blur-sm"
              >
                <span>See our work</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Floating tags with harmonic drift, beacon pulse, and mouse parallax */}
        <HeroFloatingTags />
      </section>

      {/* ═══════════════ SECTION 1 — Tech Ecosystem Marquee ═══════════════ */}
      <TechEcosystemMarquee />

      {/* ═══════════════ SECTION 2 — Solutions ═══════════════ */}
      <section className="relative py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal mb-10 md:mb-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="section-number font-display text-sm font-bold text-crimson">01</span>
              <div className="h-px flex-1 bg-line-subtle" />
            </div>
            <p className="mb-3 type-eyebrow text-crimson">Solutions</p>
            <h2 className="font-display type-section-title text-balance">
              The systems that grow<br />your business.
            </h2>
            <p className="mt-5 max-w-2xl type-body text-content-muted text-pretty">
              Connected technology, automation, websites, and marketing
              operations — working together so your business runs more
              efficiently and every lead is captured, followed up, and
              converted.
            </p>
          </div>

          <div className="reveal-stagger grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line-subtle bg-surface/70 p-6 md:p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-crimson/40 hover:bg-surface hover:shadow-2xl hover:shadow-crimson/10"
              >
                {/* Top gradient glow indicator on hover */}
                <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-crimson to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Ambient corner light on hover */}
                <span className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-crimson/10 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-crimson/20 bg-crimson/10 text-crimson transition-all duration-300 group-hover:scale-110 group-hover:border-crimson/50 group-hover:bg-crimson group-hover:text-white group-hover:shadow-lg group-hover:shadow-crimson/25">
                    <s.icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-3" />
                  </div>
                  <h3 className="mb-2 font-display type-card-title text-content transition-colors duration-200">
                    {s.title}
                  </h3>
                  <p className="type-body-sm text-content-muted text-pretty">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1.5 type-caption font-semibold text-crimson">
                  <span>Explore capability</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 3 — Service Catalogue ═══════════════ */}
      <section className="relative border-y border-line-subtle bg-surface-secondary py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal mb-10 md:mb-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="section-number font-display text-sm font-bold text-crimson">02</span>
              <div className="h-px flex-1 bg-line-subtle" />
            </div>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-3 type-eyebrow text-crimson">Full catalogue</p>
                <h2 className="font-display type-section-title text-balance">
                  22 services.<br />One accountable team.
                </h2>
              </div>
              <Link href="/services" className="group inline-flex items-center gap-2 type-btn text-crimson hover:text-crimson-bright transition-colors">
                <span>View all services</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="reveal-stagger grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/services#${cat.id}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line-subtle bg-surface/70 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-crimson/40 hover:bg-surface hover:shadow-2xl hover:shadow-crimson/10"
              >
                {/* Top gradient glow indicator on hover */}
                <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-crimson to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Ambient corner light on hover */}
                <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-crimson/10 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div>
                  <div className="mb-5 flex items-center gap-3.5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-crimson/20 bg-crimson/10 text-crimson transition-all duration-300 group-hover:scale-110 group-hover:border-crimson/50 group-hover:bg-crimson group-hover:text-white group-hover:shadow-lg group-hover:shadow-crimson/25">
                      <cat.icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-3" />
                    </div>
                    <div>
                      <h3 className="font-display type-card-title text-content transition-colors duration-200">{cat.label}</h3>
                      <p className="type-caption text-content-faint">{cat.services.length} services</p>
                    </div>
                  </div>
                  <p className="mb-4 type-body-sm text-content-muted text-pretty">{cat.tagline}</p>
                  <ul className="space-y-1.5">
                    {cat.services.map((s) => (
                      <li key={s.id} className="flex items-center gap-2 type-body-sm text-content-secondary transition-colors duration-200 group-hover:text-content">
                        <span className="h-1.5 w-1.5 rounded-full bg-crimson/50 transition-colors duration-200 group-hover:bg-crimson" />
                        {s.title}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-center gap-1.5 border-t border-line-subtle/50 pt-4 type-caption font-semibold text-crimson">
                  <span>Explore {cat.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 4 — Global Operations Network ═══════════════ */}
      <OperationsNetwork />

      {/* ═══════════════ SECTION 5 — Client Reviews ═══════════════ */}
      <ClientReviews />

      {/* ═══════════════ SECTION 6 — Trust & Credibility ═══════════════ */}
      <section className="relative py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal mb-10 md:mb-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="section-number font-display text-sm font-bold text-crimson">03</span>
              <div className="h-px flex-1 bg-line-subtle" />
            </div>
            <p className="mb-3 type-eyebrow text-crimson">Why Ethixweb</p>
            <h2 className="font-display type-section-title text-balance">
              Built around the work<br />that matters.
            </h2>
          </div>

          <div className="reveal-stagger grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trustPoints.map((item) => (
              <div
                key={item.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line-subtle bg-surface/70 p-6 md:p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-crimson/40 hover:bg-surface hover:shadow-2xl hover:shadow-crimson/10"
              >
                {/* Top gradient glow indicator on hover */}
                <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-crimson to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Ambient corner light on hover */}
                <span className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-crimson/10 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-crimson/20 bg-crimson/10 text-crimson transition-all duration-300 group-hover:scale-110 group-hover:border-crimson/50 group-hover:bg-crimson group-hover:text-white group-hover:shadow-lg group-hover:shadow-crimson/25">
                    <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-3" />
                  </div>
                  <h3 className="mb-2 font-display type-card-title text-content transition-colors duration-200">{item.title}</h3>
                  <p className="type-body-sm text-content-muted text-pretty">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION — Operating Model ═══════════════ */}
      <section className="relative border-y border-line-subtle bg-surface-secondary py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal mb-10 md:mb-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="section-number font-display text-sm font-bold text-crimson">04</span>
              <div className="h-px flex-1 bg-line-subtle" />
            </div>
            <p className="mb-3 type-eyebrow text-crimson">Operating model</p>
            <h2 className="font-display type-section-title text-balance">
              Built like an extension<br />of your team.
            </h2>
          </div>

          <div className="reveal-stagger grid grid-cols-1 gap-6 md:grid-cols-3">
            {operatingModel.map((model) => (
              <div
                key={model.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line-subtle bg-surface/70 p-7 md:p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-crimson/40 hover:bg-surface hover:shadow-2xl hover:shadow-crimson/10"
              >
                {/* Top gradient glow indicator on hover */}
                <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-crimson to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Ambient corner light on hover */}
                <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-crimson/10 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-crimson/20 bg-crimson/10 text-crimson transition-all duration-300 group-hover:scale-110 group-hover:border-crimson/50 group-hover:bg-crimson group-hover:text-white group-hover:shadow-lg group-hover:shadow-crimson/25">
                    <model.icon className="h-6 w-6 transition-transform duration-300 group-hover:rotate-3" />
                  </div>
                  <h3 className="mb-2 font-display type-card-title text-content">{model.title}</h3>
                  <p className="mb-6 type-body-sm text-content-muted text-pretty">{model.desc}</p>
                  <ul className="space-y-2.5 border-t border-line-subtle/50 pt-5">
                    {model.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm text-content-secondary transition-colors duration-200 group-hover:text-content">
                        <Check className="h-4 w-4 shrink-0 text-crimson transition-transform duration-200 group-hover:scale-110" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION — Process ═══════════════ */}
      <section className="relative py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal mb-10 md:mb-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="section-number font-display text-sm font-bold text-crimson">05</span>
              <div className="h-px flex-1 bg-line-subtle" />
            </div>
            <p className="mb-3 type-eyebrow text-crimson">How we work</p>
            <h2 className="font-display type-section-title text-balance">
              A process built for<br />real outcomes.
            </h2>
          </div>

          <div className="reveal-stagger grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div
                key={step.num}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line-subtle bg-surface/70 p-6 md:p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-crimson/40 hover:bg-surface hover:shadow-2xl hover:shadow-crimson/10"
              >
                {/* Top gradient glow indicator on hover */}
                <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-crimson to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Ambient corner light on hover */}
                <span className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-crimson/10 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-crimson/20 bg-crimson/10 text-crimson transition-all duration-300 group-hover:scale-110 group-hover:border-crimson/50 group-hover:bg-crimson group-hover:text-white group-hover:shadow-lg group-hover:shadow-crimson/25">
                    <span className="font-display text-base font-bold">{step.num}</span>
                  </div>
                  <h3 className="mb-2 font-display type-card-title text-content transition-colors duration-200">{step.title}</h3>
                  <p className="type-body-sm text-content-muted text-pretty">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 9 — Final CTA ═══════════════ */}
      <section className="relative overflow-hidden">
        <div className="bg-crimson-gradient red-glow relative">
          <div className="grid-pattern absolute inset-0 opacity-[0.05]" />
          <div className="absolute right-10 top-10 h-32 w-32 rounded-full border border-white/20 animate-float" />
          <div className="absolute bottom-10 left-10 h-20 w-20 rounded-full border border-white/20 animate-float" style={{ animationDelay: '2s' }} />

          <div className="reveal relative mx-auto max-w-5xl px-6 py-16 text-center md:py-24 lg:px-10">
            <h2 className="font-display type-section-title text-white text-balance">
              Ready for a smarter<br />digital operation?
            </h2>
            <p className="mx-auto mt-6 max-w-xl type-body text-white/80 text-pretty">
              Tell us where your website, systems, or marketing need
              improvement. We&apos;ll help you identify the next steps.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 type-btn text-crimson transition-all duration-300 hover:bg-graphite hover:text-white"
              >
                <span>Start a project</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/our-work"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 type-btn text-white transition-all duration-300 hover:bg-white/10"
              >
                <span>Explore our work</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-6 type-caption text-white/60">We respond within one business day.</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
