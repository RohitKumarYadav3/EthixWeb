'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { SiteHeader } from '@/components/site/header';
import { SiteFooter } from '@/components/site/footer';

const services = [
  { value: 'website-redesign', label: 'Website Redesign' },
  { value: 'landing-pages', label: 'Landing Pages' },
  { value: 'headless-architecture', label: 'Headless Architecture' },
  { value: 'maintenance-security', label: 'Maintenance & Security' },
  { value: 'knowledge-chatbot', label: 'Knowledge Chatbot' },
  { value: 'llm-chatbot', label: 'LLM Chatbot' },
  { value: 'ai-receptionist', label: 'AI Receptionist / CSR' },
  { value: 'human-handoff', label: 'Human Handoff' },
  { value: 'seo', label: 'SEO' },
  { value: 'google-ads', label: 'Google Ads' },
  { value: 'meta-ads', label: 'Meta Ads (Facebook & Instagram)' },
  { value: 'social-media-reels', label: 'Social Media & Reels' },
  { value: 'email-marketing', label: 'Email Marketing' },
  { value: 'crm-integration', label: 'CRM Integration' },
  { value: 'dashboards', label: 'Dashboards' },
  { value: 'analytics', label: 'Analytics & Tracking' },
  { value: 'monthly-reporting', label: 'Monthly Reporting' },
  { value: 'accessibility-improvements', label: 'Accessibility Improvements' },
  { value: 'accessibility-testing', label: 'Accessibility Testing' },
  { value: 'technical-support', label: 'Technical Support' },
  { value: 'ai-content-updates', label: 'AI & Content Updates' },
  { value: 'api-maintenance', label: 'API Maintenance' },
  { value: 'other', label: 'Other / Not sure' },
];

const budgets = [
  { value: 'under-25k', label: 'Under ₹25,000' },
  { value: '25k-50k', label: '₹25,000 – ₹50,000' },
  { value: '50k-1l', label: '₹50,000 – ₹1,00,000' },
  { value: '1l-3l', label: '₹1,00,000 – ₹3,00,000' },
  { value: '3l-plus', label: '₹3,00,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
];

const contactFaqs = [
  { q: 'What information should I include in my message?', a: 'Tell us about your business, what you are trying to achieve, what problems you are facing, and any existing tools or systems you use. The more context you provide, the more specific our response will be.' },
  { q: 'How much do projects cost?', a: 'Pricing depends on scope. Website projects typically start from ₹25,000. Ongoing services like SEO and support are monthly retainers starting from ₹10,000–₹15,000. We provide a detailed, fixed-price quote after understanding your requirements.' },
  { q: 'Can you work with my existing website?', a: 'Yes. We can redesign, optimize, or add functionality to an existing site. We start with an audit to identify what is working and what needs improvement, then recommend the best path forward.' },
  { q: 'How long do projects take?', a: 'A focused website project typically takes 2-4 weeks. More complex projects involving CRM integration, AI automation, or e-commerce can take longer. We give you a clear timeline before starting.' },
  { q: 'Do you work with businesses outside India?', a: 'Our primary focus is Indian businesses, but we are open to projects where our expertise is a good fit. Mention your location in the enquiry and we will let you know.' },
];

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    city: '',
    service: '',
    budget: '',
    message: '',
    website: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
      setFormState({
        name: '', email: '', phone: '', company: '', city: '',
        service: '', budget: '', message: '', website: '',
      });
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-surface text-content">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-12 md:pt-48 md:pb-16">
        <div className="grid-pattern absolute inset-0 opacity-[0.04]" />
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-crimson/5 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p
            className="type-eyebrow mb-6 text-crimson"
            style={{ animation: 'fade-in-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards' }}
          >
            Contact
          </p>
          <h1
            className="type-page-title text-balance"
            style={{ animation: 'fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards', opacity: 0 }}
          >
            Let&apos;s talk about<br />
            <span className="text-crimson-gradient">your project.</span>
          </h1>
          <p
            className="type-body-lg mt-8 max-w-2xl text-content-muted text-pretty"
            style={{ animation: 'fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.25s forwards', opacity: 0 }}
          >
            Tell us what you are building. We will respond within one business
            day with questions or a proposal — no automated sales sequence,
            just a real response from a real person.
          </p>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.5fr_1fr]">
            {/* Form */}
            <div>
              {status === 'success' ? (
                <div className="flex flex-col items-start gap-6 rounded-2xl border border-crimson/20 bg-crimson/5 p-12">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-crimson/15">
                    <CheckCircle2 className="h-8 w-8 text-crimson" />
                  </div>
                  <div>
                    <h3 className="type-card-title mb-3">Thank you!</h3>
                    <p className="type-body text-content-muted text-pretty">
                      Your enquiry has been received. We will get back to you
                      within one business day. If you need to reach us sooner,
                      call or WhatsApp us directly.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="type-btn text-crimson hover:text-crimson-bright transition-colors"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === 'error' && (
                    <div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3">
                      <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
                      <p className="type-body-sm text-destructive">{errorMessage}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="type-body-sm mb-2 block font-medium text-content-secondary">
                        Name <span className="text-crimson">*</span>
                      </label>
                      <input
                        id="name" name="name" type="text" required
                        value={formState.name} onChange={handleChange}
                        className="w-full rounded-lg border border-line-subtle bg-surface-secondary px-4 py-3 text-content placeholder-content/30 transition-colors focus:border-crimson focus:outline-none"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="type-body-sm mb-2 block font-medium text-content-secondary">
                        Email <span className="text-crimson">*</span>
                      </label>
                      <input
                        id="email" name="email" type="email" required
                        value={formState.email} onChange={handleChange}
                        className="w-full rounded-lg border border-line-subtle bg-surface-secondary px-4 py-3 text-content placeholder-content/30 transition-colors focus:border-crimson focus:outline-none"
                        placeholder="you@business.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="type-body-sm mb-2 block font-medium text-content-secondary">
                        Phone <span className="text-crimson">*</span>
                      </label>
                      <input
                        id="phone" name="phone" type="tel" required
                        value={formState.phone} onChange={handleChange}
                        className="w-full rounded-lg border border-line-subtle bg-surface-secondary px-4 py-3 text-content placeholder-content/30 transition-colors focus:border-crimson focus:outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="type-body-sm mb-2 block font-medium text-content-secondary">
                        Company
                      </label>
                      <input
                        id="company" name="company" type="text"
                        value={formState.company} onChange={handleChange}
                        className="w-full rounded-lg border border-line-subtle bg-surface-secondary px-4 py-3 text-content placeholder-content/30 transition-colors focus:border-crimson focus:outline-none"
                        placeholder="Your business name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="city" className="type-body-sm mb-2 block font-medium text-content-secondary">
                      City / State
                    </label>
                    <input
                      id="city" name="city" type="text"
                      value={formState.city} onChange={handleChange}
                      className="w-full rounded-lg border border-line-subtle bg-surface-secondary px-4 py-3 text-content placeholder-content/30 transition-colors focus:border-crimson focus:outline-none"
                      placeholder="e.g. Pune, Maharashtra"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="type-body-sm mb-2 block font-medium text-content-secondary">
                      Service interested in <span className="text-crimson">*</span>
                    </label>
                    <select
                      id="service" name="service" required
                      value={formState.service} onChange={handleChange}
                      className="w-full rounded-lg border border-line-subtle bg-surface-secondary px-4 py-3 text-content transition-colors focus:border-crimson focus:outline-none"
                    >
                      <option value="">Select a service</option>
                      <optgroup label="Websites">
                        <option value="website-redesign">Website Redesign</option>
                        <option value="landing-pages">Landing Pages</option>
                        <option value="headless-architecture">Headless Architecture</option>
                        <option value="maintenance-security">Maintenance & Security</option>
                      </optgroup>
                      <optgroup label="AI">
                        <option value="knowledge-chatbot">Knowledge Chatbot</option>
                        <option value="llm-chatbot">LLM Chatbot</option>
                        <option value="ai-receptionist">AI Receptionist / CSR</option>
                        <option value="human-handoff">Human Handoff</option>
                      </optgroup>
                      <optgroup label="Growth">
                        <option value="seo">SEO</option>
                        <option value="google-ads">Google Ads</option>
                        <option value="meta-ads">Meta Ads</option>
                        <option value="social-media-reels">Social Media & Reels</option>
                        <option value="email-marketing">Email Marketing</option>
                        <option value="crm-integration">CRM Integration</option>
                      </optgroup>
                      <optgroup label="Data">
                        <option value="dashboards">Dashboards</option>
                        <option value="analytics">Analytics & Tracking</option>
                        <option value="monthly-reporting">Monthly Reporting</option>
                      </optgroup>
                      <optgroup label="Support">
                        <option value="technical-support">Technical Support</option>
                        <option value="ai-content-updates">AI & Content Updates</option>
                        <option value="api-maintenance">API Maintenance</option>
                      </optgroup>
                      <option value="other">Other / Not sure</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="type-body-sm mb-2 block font-medium text-content-secondary">
                      Budget range
                    </label>
                    <select
                      id="budget" name="budget"
                      value={formState.budget} onChange={handleChange}
                      className="w-full rounded-lg border border-line-subtle bg-surface-secondary px-4 py-3 text-content transition-colors focus:border-crimson focus:outline-none"
                    >
                      <option value="">Select a budget range (optional)</option>
                      {budgets.map((b) => (
                        <option key={b.value} value={b.value}>{b.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="type-body-sm mb-2 block font-medium text-content-secondary">
                      Tell us about your project <span className="text-crimson">*</span>
                    </label>
                    <textarea
                      id="message" name="message" required rows={5}
                      value={formState.message} onChange={handleChange}
                      className="w-full rounded-lg border border-line-subtle bg-surface-secondary px-4 py-3 text-content placeholder-content/30 transition-colors focus:border-crimson focus:outline-none"
                      placeholder="What are you building? What problems are you trying to solve? What does success look like?"
                    />
                  </div>

                  <input
                    type="text" name="website"
                    value={formState.website} onChange={handleChange}
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    tabIndex={-1} autoComplete="off" aria-hidden="true"
                  />

                  <div className="flex items-center justify-between gap-4">
                    <p className="type-caption text-content-faint">
                      Your information is only used to respond to your enquiry. We do not share it.
                    </p>
                    <button
                      type="submit" disabled={status === 'loading'}
                      className="type-btn group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-crimson px-8 py-4 text-white shadow-lg transition-all duration-300 hover:bg-crimson-dark hover:shadow-2xl hover:shadow-crimson/30 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === 'loading' ? 'Sending...' : 'Send enquiry'}
                      {status !== 'loading' && <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="rounded-2xl border border-line-subtle bg-surface-secondary p-8">
                <h3 className="type-card-title mb-6">Direct contact</h3>
                <div className="space-y-5">
                  <a href="mailto:hello@ethixweb.com" className="group flex items-center gap-4 text-content-secondary transition-colors hover:text-crimson">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-crimson/10">
                      <Mail className="h-5 w-5 text-crimson" />
                    </div>
                    <div>
                      <p className="type-caption text-content-faint">Email</p>
                      <p className="type-body-sm font-medium">hello@ethixweb.com</p>
                    </div>
                  </a>
                  <a href="tel:+918000000000" className="group flex items-center gap-4 text-content-secondary transition-colors hover:text-crimson">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-crimson/10">
                      <Phone className="h-5 w-5 text-crimson" />
                    </div>
                    <div>
                      <p className="type-caption text-content-faint">Phone / WhatsApp</p>
                      <p className="type-body-sm font-medium">+91 80000 00000</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 text-content-secondary">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-crimson/10">
                      <MapPin className="h-5 w-5 text-crimson" />
                    </div>
                    <div>
                      <p className="type-caption text-content-faint">Location</p>
                      <p className="type-body-sm font-medium">India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-line-subtle bg-surface-secondary p-8">
                <h3 className="type-card-title mb-4">What happens next?</h3>
                <ol className="space-y-4">
                  <li className="type-body-sm flex gap-3 text-content-muted">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-crimson/15 text-xs font-bold text-crimson">1</span>
                    We review your enquiry and research your business.
                  </li>
                  <li className="type-body-sm flex gap-3 text-content-muted">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-crimson/15 text-xs font-bold text-crimson">2</span>
                    We respond within one business day with questions or a proposal.
                  </li>
                  <li className="type-body-sm flex gap-3 text-content-muted">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-crimson/15 text-xs font-bold text-crimson">3</span>
                    If we are a fit, we scope the project and start building.
                  </li>
                </ol>
              </div>

              <div className="rounded-2xl border border-line-subtle bg-surface-secondary p-8">
                <h3 className="type-card-title mb-2 !text-lg">Already a client?</h3>
                <p className="type-body-sm mb-4 text-content-muted">Manage your project and access support resources.</p>
                <Link href="/admin/login" className="type-btn inline-flex items-center gap-2 text-crimson hover:text-crimson-bright transition-colors">
                  Admin login
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line-subtle bg-surface-secondary py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="mb-10 md:mb-12">
            <p className="type-eyebrow mb-4 text-crimson">FAQ</p>
            <h2 className="type-section-title text-balance">
              Common questions.
            </h2>
          </div>
          <div className="space-y-4">
            {contactFaqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-line-subtle bg-surface transition-colors hover:border-line-subtle">
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

      <SiteFooter />
    </div>
  );
}
