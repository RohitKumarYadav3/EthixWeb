import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Target,
  MessageCircle,
  Wrench,
  FileText,
  TrendingUp,
  Compass,
  ClipboardList,
  Code2,
  Rocket,
  LineChart,
  Layers,
  GitBranch,
  ShieldCheck,
  Check,
  X,
  Users,
  Clock,
  LifeBuoy,
  Mail,
} from 'lucide-react';
import { SiteHeader } from '@/components/site/header';
import { SiteFooter } from '@/components/site/footer';

export const metadata: Metadata = {
  title: 'About — India-Focused Digital Agency',
  description:
    'Ethixweb is a digital agency taking a joined-up approach to software, automation, websites, marketing, and support — engineered for measurable outcomes and built for the way Indian businesses operate.',
};

const principles = [
  {
    icon: Target,
    title: 'Measurable outcomes',
    desc: 'We define what success looks like before we start and track it in plain numbers — enquiry volume, conversion rate, page speed, search ranking — not vanity metrics.',
  },
  {
    icon: MessageCircle,
    title: 'Direct communication',
    desc: 'You work with the people building your project. No account managers, no telephone game, no opaque status reports. Decisions get made quickly because the right people are in the room.',
  },
  {
    icon: Wrench,
    title: 'Reliable engineering',
    desc: 'Production-grade builds, sensible architecture, and code that can be maintained. We optimise for speed, accessibility, and stability because those things compound over time.',
  },
  {
    icon: FileText,
    title: 'Transparent scope',
    desc: 'You see exactly what we are building, why, and what it costs — before we start. Scope changes are documented and agreed, never quietly inflated. No surprises on the invoice.',
  },
  {
    icon: TrendingUp,
    title: 'Continuous improvement',
    desc: 'Launch is a checkpoint, not a finish line. We measure, learn, and refine so your digital presence keeps getting sharper instead of slowly going stale.',
  },
];

const collaborationSteps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We listen first. We map your business goals, customer journey, current tools, and where things break down — then identify the highest-impact problems to solve.',
    points: ['Goal mapping', 'Customer journey', 'Tool audit'],
  },
  {
    num: '02',
    title: 'Planning',
    desc: 'A clear roadmap with priorities, milestones, timelines, and measurable success criteria. You know what we are building, in what order, and why.',
    points: ['Project scope', 'Milestones', 'Success metrics'],
  },
  {
    num: '03',
    title: 'Design & development',
    desc: 'Design, build, and integrate in short cycles with regular check-ins. You see progress early and often, and we course-correct before anything hardens into a problem.',
    points: ['Design system', 'Iterative builds', 'Integrations'],
  },
  {
    num: '04',
    title: 'Launch',
    desc: 'QA, performance pass, analytics verification, and a clean cutover. We make sure what ships is fast, tracked, and ready for real visitors.',
    points: ['QA & testing', 'Performance pass', 'Analytics live'],
  },
  {
    num: '05',
    title: 'Optimization',
    desc: 'We track what matters, report in plain language, and refine based on real data — not guesses. Most clients keep working with us here because the gains compound.',
    points: ['Monthly reports', 'A/B testing', 'Ongoing refinement'],
  },
];

const workingTogether = [
  {
    icon: MessageCircle,
    title: 'Communication',
    desc: 'A single point of contact who is also building the work. Updates on a predictable cadence, questions answered within a business day, and no layer of account managers between you and the people doing the work.',
  },
  {
    icon: ClipboardList,
    title: 'Deliverables',
    desc: 'Every deliverable is tied to a business outcome, not a checklist item. You receive working software, live pages, and documented integrations — not slide decks describing future work.',
  },
  {
    icon: GitBranch,
    title: 'Feedback',
    desc: 'Structured review points inside each cycle, plus the freedom to react to anything you see at any time. Changes are documented and agreed, then folded into the next iteration.',
  },
  {
    icon: ShieldCheck,
    title: 'Ownership',
    desc: 'You own your accounts, your code, your data, and your domains. Nothing is held hostage in a system you cannot access. If you ever leave, you leave with everything intact.',
  },
  {
    icon: LifeBuoy,
    title: 'Support',
    desc: 'After launch we stay on for maintenance, security updates, content changes, and performance tuning — on a plan that matches how much hands-on help you actually want.',
  },
];

const comparison = [
  {
    area: 'Systems',
    joined: 'Website, CRM, WhatsApp, and analytics share one data layer — leads flow automatically end to end.',
    fragmented: 'Each vendor builds in isolation. Leads get copied between tools by hand, and some fall through the cracks.',
  },
  {
    area: 'Accountability',
    joined: 'One team owns the outcome across every surface. If a lead fails to arrive, there is one place to look.',
    fragmented: 'When something breaks, vendors point at each other. You become the project manager gluing it together.',
  },
  {
    area: 'Communication',
    joined: 'Direct access to the people doing the work. Decisions are made in the same conversation as the build.',
    fragmented: 'Briefs pass through account managers, get diluted, and arrive at developers second-hand and late.',
  },
  {
    area: 'Speed',
    joined: 'Changes ship in one place and propagate everywhere. No re-briefing three separate agencies.',
    fragmented: 'Every change is a new procurement cycle. Momentum stalls waiting on the slowest vendor.',
  },
  {
    area: 'Cost',
    joined: 'One relationship, one roadmap, shared infrastructure. Overhead is spent on the work, not on coordination.',
    fragmented: 'Five vendors means five onboarding fees, five handoff tax, and five chances for things to drift out of sync.',
  },
];

const faqs = [
  {
    q: 'How is your team structured?',
    a: 'You work directly with the people building your project — designers, developers, and automation engineers — rather than through a layer of account managers. The person you message is the person writing the code or wiring the integration. That keeps decisions fast and information loss to zero.',
  },
  {
    q: 'Who owns the work once it is delivered?',
    a: 'You do. You own your accounts, your source code, your data, and your domains from day one. Nothing is locked inside a system you cannot access. If our engagement ever ends, you walk away with everything intact and fully transferable.',
  },
  {
    q: 'How do you communicate during a project?',
    a: 'You get a single, direct point of contact who is also working on the build. We set a predictable update cadence up front, answer questions within one business day, and hold structured review points inside each cycle so feedback is caught early rather than after a long heads-down phase.',
  },
  {
    q: 'How long do projects take?',
    a: 'It depends on scope, and we tell you the honest timeline before we start. A focused website might take a few weeks; a website plus CRM integration, WhatsApp automation, and analytics typically takes longer. We work in short cycles with milestones, so you see progress continuously and never wait until the end to find out where things stand.',
  },
  {
    q: 'What happens after launch?',
    a: 'Launch is a checkpoint, not a finish line. We offer ongoing support covering security updates, performance tuning, content changes, and reporting. Most clients continue working with us past launch to optimise based on real data — the gains compound over time rather than fading.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface text-content">
      <SiteHeader />

      {/* ───────────── Hero ───────────── */}
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
              About Ethixweb
            </div>

            <h1
              className="font-display type-page-title text-balance"
              style={{ animation: 'fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards', opacity: 0 }}
            >
              Technology that works<br />
              as <span className="text-crimson-gradient">hard</span> as your<br />
              business.
            </h1>

            <p
              className="mx-auto mt-7 max-w-2xl type-body-lg text-content-muted text-pretty"
              style={{ animation: 'fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.25s forwards', opacity: 0 }}
            >
              We take a joined-up approach to software, automation, websites,
              marketing, and support — so every piece of your digital presence
              pulls in the same direction instead of competing for attention.
            </p>

            <div
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              style={{ animation: 'fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards', opacity: 0 }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-crimson px-7 py-3.5 type-btn text-white transition-all duration-300 hover:bg-crimson-dark hover:shadow-2xl hover:shadow-crimson/30"
              >
                <span>Discuss your challenge</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line-default px-7 py-3.5 type-btn text-content transition-all duration-300 hover:border-line-strong hover:bg-content/5"
              >
                <span>See how we work</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Positioning ───────────── */}
      <section className="relative border-y border-line-subtle bg-surface-secondary py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 md:mb-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="section-number font-display text-sm font-bold text-crimson">01</span>
              <div className="h-px flex-1 bg-content/10" />
            </div>
            <p className="mb-3 type-eyebrow text-crimson">Positioning</p>
            <h2 className="font-display type-section-title text-balance">
              A joined-up approach to<br />everything digital.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6 type-body text-content-muted text-pretty">
              <p>
                Most businesses end up with a patchwork: a website from one
                vendor, a CRM from another, a WhatsApp setup built by someone
                who has never seen the website, and marketing running on its
                own assumptions. Each piece works in isolation. Together, they
                leak leads, duplicate effort, and nobody owns the outcome.
              </p>
              <p>
                We treat your digital presence as one system. Your website is
                the front door, your CRM is the memory, your automation is the
                reflex, and your marketing is the engine that brings people in.
                When those are designed to talk to each other, the customer
                experience feels seamless — and the business runs with far less
                manual work.
              </p>
              <p>
                That is the difference between buying five tools and building
                one capability. We build the capability.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: Code2, label: 'Software', note: 'The systems that run your operations' },
                { icon: Layers, label: 'Automation', note: 'The reflexes that respond instantly' },
                { icon: Compass, label: 'Websites', note: 'The front door customers see first' },
                { icon: TrendingUp, label: 'Marketing', note: 'The engine that brings people in' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-line-subtle bg-surface p-6 transition-colors hover:border-crimson/20"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-crimson/10">
                    <item.icon className="h-5 w-5 text-crimson" />
                  </div>
                  <h3 className="mb-1.5 font-display text-base font-semibold">{item.label}</h3>
                  <p className="text-sm text-content-muted text-pretty">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Our Approach ───────────── */}
      <section className="relative py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 md:mb-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="section-number font-display text-sm font-bold text-crimson">02</span>
              <div className="h-px flex-1 bg-content/10" />
            </div>
            <p className="mb-3 type-eyebrow text-crimson">Our approach</p>
            <h2 className="font-display type-section-title text-balance">
              Solve the real problem.<br />Skip the unnecessary tech.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-line-subtle bg-surface-secondary p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-crimson/10">
                <Target className="h-6 w-6 text-crimson" />
              </div>
              <h3 className="mb-3 font-display type-card-title">Start from the problem</h3>
              <p className="type-body-sm text-content-muted text-pretty">
                We begin with the business problem, not a feature list. If a
                spreadsheet solves it better than custom software, we will say
                so. The right tool is the one that removes friction, not the
                one that looks impressive on an invoice.
              </p>
            </div>

            <div className="rounded-2xl border border-line-subtle bg-surface-secondary p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-crimson/10">
                <Layers className="h-6 w-6 text-crimson" />
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold">Build what compounds</h3>
              <p className="text-content-muted text-pretty">
                We prioritise work that keeps paying off — automation that runs
                forever, a fast site that ranks for years, an integration that
                saves an hour a day. We avoid one-off polish that quietly decays
                the moment we leave.
              </p>
            </div>

            <div className="rounded-2xl border border-line-subtle bg-surface-secondary p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-crimson/10">
                <FileText className="h-6 w-6 text-crimson" />
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold">Say no to noise</h3>
              <p className="text-content-muted text-pretty">
                A redesign is not always the answer. A new CRM is not always the
                answer. We push back when a request will not move the needle,
                because trust is worth more than a bigger scope — and the goal
                is results, not a longer deliverable list.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Mission & Principles ───────────── */}
      <section className="relative border-y border-line-subtle bg-surface-secondary py-14 md:py-20">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-crimson/3 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-crimson/3 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 md:mb-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="section-number font-display text-sm font-bold text-crimson">03</span>
              <div className="h-px flex-1 bg-content/10" />
            </div>
            <p className="mb-3 type-eyebrow text-crimson">Mission &amp; principles</p>
            <h2 className="font-display type-section-title text-balance">
              What we hold ourselves to.
            </h2>
            <p className="mt-5 max-w-2xl type-body text-content-muted text-pretty">
              Our mission is simple: build digital systems that create
              measurable, lasting value for Indian businesses — and do it
              honestly. These principles are how we keep that promise.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <div
                key={p.title}
                className="group rounded-2xl border border-line-subtle bg-surface p-8 transition-all duration-300 hover:border-crimson/20"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-crimson/10 transition-colors group-hover:bg-crimson/20">
                  <p.icon className="h-6 w-6 text-crimson" />
                </div>
                <h3 className="mb-3 font-display text-xl font-semibold">{p.title}</h3>
                <p className="text-content-muted text-pretty">{p.desc}</p>
              </div>
            ))}
            {/* Mission tile */}
            <div className="rounded-2xl border border-crimson/20 bg-crimson/5 p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-crimson/15">
                <Compass className="h-6 w-6 text-crimson" />
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold">The mission</h3>
              <p className="text-content-secondary text-pretty">
                Help Indian businesses compete and win with technology that is
                fast, honest, and built around the way they actually work — not
                the way a template assumes they should.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── How We Collaborate ───────────── */}
      <section className="relative py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 md:mb-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="section-number font-display text-sm font-bold text-crimson">04</span>
              <div className="h-px flex-1 bg-content/10" />
            </div>
            <p className="mb-3 type-eyebrow text-crimson">How we collaborate</p>
            <h2 className="font-display type-section-title text-balance">
              Five steps, one direction.
            </h2>
            <p className="mt-5 max-w-2xl type-body text-content-muted text-pretty">
              A clear path from the first conversation to ongoing improvement —
              with no black boxes and no surprise endings.
            </p>
          </div>

          <div className="relative">
            {/* Vertical connector for mobile / horizontal for desktop */}
            <div className="space-y-4 md:space-y-0">
              {collaborationSteps.map((step, i) => (
                <div
                  key={step.num}
                  className="group relative rounded-2xl border border-line-subtle bg-surface-secondary p-6 transition-all duration-300 hover:border-crimson/20 md:flex md:items-start md:gap-8 md:p-8"
                >
                  {/* Number node */}
                  <div className="mb-5 flex items-center gap-4 md:mb-0 md:flex-col md:items-start md:gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-crimson/20 bg-crimson/5 transition-all duration-300 group-hover:border-crimson/50 group-hover:bg-crimson/10">
                      <span className="font-display text-sm font-bold text-crimson">{step.num}</span>
                    </div>
                    {i < collaborationSteps.length - 1 && (
                      <div className="hidden h-8 w-px bg-gradient-to-b from-crimson/30 to-transparent md:block" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="mb-2 font-display text-xl font-semibold md:text-2xl">{step.title}</h3>
                    <p className="mb-4 text-content-muted text-pretty">{step.desc}</p>
                    <ul className="flex flex-wrap gap-2">
                      {step.points.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-center gap-1.5 rounded-md border border-line-subtle px-2.5 py-1 text-xs text-content-faint"
                        >
                          <Check className="h-3 w-3 text-crimson/60" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── What Working Together Looks Like ───────────── */}
      <section className="relative border-y border-line-subtle bg-surface-secondary py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 md:mb-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="section-number font-display text-sm font-bold text-crimson">05</span>
              <div className="h-px flex-1 bg-content/10" />
            </div>
            <p className="mb-3 type-eyebrow text-crimson">What working together looks like</p>
            <h2 className="font-display type-section-title text-balance">
              The day-to-day, in plain terms.
            </h2>
          </div>

          <div className="divide-y divide-line-subtle overflow-hidden rounded-2xl border border-line-subtle bg-surface">
            {workingTogether.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col gap-5 p-6 transition-colors hover:bg-content/[0.02] md:flex-row md:items-start md:gap-8 md:p-8"
              >
                <div className="flex shrink-0 items-center gap-4 md:w-56 md:flex-col md:items-start md:gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-crimson/10 transition-colors group-hover:bg-crimson/20">
                    <item.icon className="h-6 w-6 text-crimson" />
                  </div>
                  <h3 className="font-display text-lg font-semibold md:text-xl">{item.title}</h3>
                </div>
                <p className="flex-1 text-content-muted text-pretty md:text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Comparison ───────────── */}
      <section className="relative py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 md:mb-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="section-number font-display text-sm font-bold text-crimson">06</span>
              <div className="h-px flex-1 bg-content/10" />
            </div>
            <p className="mb-3 type-eyebrow text-crimson">Ethixweb vs a fragmented setup</p>
            <h2 className="font-display type-section-title text-balance">
              One connected system,<br />or five disconnected vendors.
            </h2>
            <p className="mt-5 max-w-2xl type-body text-content-muted text-pretty">
              The difference is not just convenience — it is leads retained,
              hours saved, and outcomes actually owned by someone.
            </p>
          </div>

          {/* Comparison table */}
          <div className="overflow-hidden rounded-2xl border border-line-subtle">
            {/* Header row */}
            <div className="grid grid-cols-1 border-b border-line-subtle bg-surface-secondary md:grid-cols-3">
              <div className="p-5 text-sm font-semibold uppercase tracking-widest text-content-faint md:p-6">
                Area
              </div>
              <div className="flex items-center gap-2 border-t border-line-subtle p-5 md:border-l md:border-t-0 md:p-6">
                <ShieldCheck className="h-5 w-5 text-crimson" />
                <span className="font-display text-sm font-semibold text-content md:text-base">Ethixweb — connected</span>
              </div>
              <div className="flex items-center gap-2 border-t border-line-subtle p-5 md:border-l md:border-t-0 md:p-6">
                <Users className="h-5 w-5 text-content-faint" />
                <span className="font-display text-sm font-semibold text-content-muted md:text-base">Fragmented vendors</span>
              </div>
            </div>

            {/* Body rows */}
            {comparison.map((row, i) => (
              <div
                key={row.area}
                className={`grid grid-cols-1 md:grid-cols-3 ${i < comparison.length - 1 ? 'border-b border-line-subtle' : ''}`}
              >
                <div className="p-5 font-display text-base font-semibold text-content md:p-6">
                  {row.area}
                </div>
                <div className="flex gap-3 border-t border-line-subtle p-5 md:border-l md:border-t-0 md:p-6">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-crimson" />
                  <p className="text-sm text-content-secondary text-pretty md:text-[15px]">{row.joined}</p>
                </div>
                <div className="flex gap-3 border-t border-line-subtle p-5 md:border-l md:border-t-0 md:p-6">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-content-faint" />
                  <p className="text-sm text-content-faint text-pretty md:text-[15px]">{row.fragmented}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      <section className="relative border-y border-line-subtle bg-surface-secondary py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="mb-10 md:mb-12">
            <div className="mb-6 flex items-center gap-4">
              <span className="section-number font-display text-sm font-bold text-crimson">07</span>
              <div className="h-px flex-1 bg-content/10" />
            </div>
            <p className="mb-3 type-eyebrow text-crimson">FAQ</p>
            <h2 className="font-display type-section-title text-balance">
              Questions about working together.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-line-subtle bg-surface transition-colors hover:border-line-subtle"
              >
                <summary className="flex cursor-pointer items-center justify-between p-6 font-display text-lg font-semibold text-content">
                  {faq.q}
                  <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line-subtle text-content-faint transition-transform group-open:rotate-45">
                    <span className="text-lg leading-none">+</span>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-content-muted text-pretty">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Closing CTA ───────────── */}
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
              Tell us the problem.<br />
              We will bring the tech.
            </h2>
            <p className="mx-auto mt-6 max-w-xl type-body text-white/80 text-pretty">
              Whether it is a slow website, leads slipping through the cracks,
              or five tools that refuse to talk to each other — bring us the
              business challenge and we will work out the system that solves it.
            </p>
            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 type-btn text-crimson transition-all duration-300 hover:bg-graphite hover:text-white"
            >
              <span>Start a conversation</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                hello@ethixweb.com
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                We respond within one business day
              </span>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
