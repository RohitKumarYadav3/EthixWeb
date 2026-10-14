'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { SiteHeader } from '@/components/site/header';
import { SiteFooter } from '@/components/site/footer';
import { blogArticles, blogCategories } from '@/lib/blog-data';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredArticles =
    activeCategory === 'All'
      ? blogArticles
      : blogArticles.filter((a) => a.category === activeCategory);

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
              Field Notes & Engineering Logs
            </div>

            <h1
              className="font-display type-page-title text-balance"
              style={{ animation: 'fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards', opacity: 0 }}
            >
              Practical writing on<br />
              <span className="text-crimson-gradient">digital growth.</span>
            </h1>

            <p
              className="mx-auto mt-7 max-w-2xl type-body-lg text-content-muted text-pretty"
              style={{ animation: 'fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.25s forwards', opacity: 0 }}
            >
              Notes on websites, AI, SEO, and the systems that connect them —
              written for Indian businesses that want to understand what actually
              works.
            </p>
          </div>
        </div>
      </section>

      {/* Category filters */}
      <section className="sticky top-[68px] z-30 border-y border-line-subtle bg-surface/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <nav className="flex gap-2 overflow-x-auto py-3">
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`type-nav shrink-0 rounded-full border px-4 py-2 font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'border-crimson bg-crimson text-white shadow-sm shadow-crimson/25'
                    : 'border-line-subtle bg-surface text-content-secondary hover:border-line-strong hover:bg-content/5 hover:text-content shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Article grid */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="card-lift group flex flex-col rounded-2xl border border-line-subtle bg-surface-secondary p-6 transition-all duration-500 hover:border-crimson/30 hover:shadow-xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="type-caption rounded-full bg-crimson/10 px-3 py-1 font-medium text-crimson">
                    {article.category}
                  </span>
                  <span className="type-caption flex items-center gap-1.5 text-content-faint">
                    <Clock className="h-3.5 w-3.5" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="type-card-title mb-3 !text-lg md:!text-xl leading-snug text-balance">
                  {article.title}
                </h3>
                <p className="type-body-sm mb-6 flex-1 text-content-muted text-pretty">
                  {article.summary}
                </p>
                <div className="type-btn flex items-center gap-2 text-crimson font-semibold opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
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

          <div className="relative mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
            <h2 className="font-display type-section-title text-balance text-white">
              Want this working for your business?
            </h2>
            <p className="type-body-lg mx-auto mt-6 max-w-xl text-white/85 text-pretty">
              Reading is good. Building is better. Let&apos;s put these ideas
              into practice for your business.
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
