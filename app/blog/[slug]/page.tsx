import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Clock } from 'lucide-react';
import { SiteHeader } from '@/components/site/header';
import { SiteFooter } from '@/components/site/footer';
import { blogArticles, getArticleBySlug, getRelatedArticles } from '@/lib/blog-data';

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: 'Article not found' };
  return {
    title: `${article.title} — Field Notes`,
    description: article.summary,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(params.slug, 2);

  return (
    <div className="min-h-screen bg-surface text-content">
      <SiteHeader />

      {/* Article hero */}
      <article className="relative">
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="grid-pattern absolute inset-0 opacity-[0.03]" />
          <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-crimson/5 blur-[120px]" />

          <div className="relative mx-auto max-w-3xl px-6 lg:px-10">
            <Link
              href="/blog"
              className="type-btn mb-8 inline-flex items-center gap-2 text-content-faint transition-colors hover:text-crimson"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Field Notes
            </Link>

            <div className="mb-6 flex items-center gap-4">
              <span className="type-caption rounded-full bg-crimson/10 px-3 py-1 text-crimson">
                {article.category}
              </span>
              <span className="type-caption flex items-center gap-1.5 text-content-faint">
                <Clock className="h-3.5 w-3.5" />
                {article.readTime}
              </span>
            </div>

            <h1
              className="type-page-title text-balance"
              style={{ animation: 'fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards', opacity: 0 }}
            >
              {article.title}
            </h1>

            <p
              className="type-body-lg mt-6 text-content-muted text-pretty"
              style={{ animation: 'fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.15s forwards', opacity: 0 }}
            >
              {article.summary}
            </p>
          </div>
        </section>

        {/* Article body */}
        <section className="pb-24 md:pb-32">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <div className="space-y-8">
              {article.content.map((section, i) => (
                <div key={i}>
                  {section.heading && (
                    <h2 className="type-card-title mb-4 !text-2xl md:!text-3xl">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs.map((para, j) => (
                    <p key={j} className="type-body mb-5 text-content-secondary leading-relaxed text-pretty">
                      {para}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="space-y-3">
                      {section.list.map((item, k) => (
                        <li key={k} className="type-body flex items-start gap-3 text-content-secondary">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                          <span className="text-pretty">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Inline CTA */}
            <div className="mt-16 rounded-2xl border border-crimson/20 bg-crimson/5 p-8">
              <h3 className="type-card-title mb-3">
                Want help implementing this?
              </h3>
              <p className="type-body-sm mb-6 text-content-muted text-pretty">
                We work with Indian businesses to put these ideas into practice.
                Tell us about your project and we will propose an approach.
              </p>
              <Link
                href="/contact"
                className="type-btn group inline-flex items-center gap-2 rounded-full bg-crimson px-6 py-3 text-white shadow-lg transition-all duration-300 hover:bg-crimson-dark"
              >
                Start a project enquiry
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="border-t border-line-subtle bg-surface-secondary py-14 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="type-section-title mb-8 md:mb-10 text-balance">
              Related articles
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="card-lift group rounded-2xl border border-line-subtle bg-surface p-6 transition-all duration-500 hover:border-crimson/30"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="type-caption rounded-full bg-crimson/10 px-3 py-1 text-crimson">
                      {rel.category}
                    </span>
                    <span className="type-caption flex items-center gap-1.5 text-content-faint">
                      <Clock className="h-3.5 w-3.5" />
                      {rel.readTime}
                    </span>
                  </div>
                  <h3 className="type-card-title mb-3 !text-lg md:!text-xl leading-snug">
                    {rel.title}
                  </h3>
                  <p className="type-body-sm text-content-muted text-pretty">{rel.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
