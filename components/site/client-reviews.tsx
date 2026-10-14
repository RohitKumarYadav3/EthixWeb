'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  role: string;
  date: string;
  rating: number;
  snippet: string;
  fullText: string;
}

const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Kayla KJ',
    role: 'Verified Client',
    date: 'March 2025',
    rating: 5,
    snippet:
      'Ethixweb did an incredible job on our business website. It is very sharp, modern looking and has all the extra bells and whistles we need. The team was easy to work with, great communication and done in efficient time. They provided all details from start to finish and gave us exactly what we envisioned.',
    fullText:
      'Ethixweb did an incredible job on our business website. It is very sharp, modern looking and has all the extra bells and whistles we need. The team was easy to work with, great communication and done in efficient time. They provided all details from start to finish and gave us exactly what we envisioned.',
  },
  {
    id: '2',
    name: 'Ryan Taylor',
    role: 'Verified Client',
    date: 'October 2024',
    rating: 5,
    snippet:
      "I have been contacted by many people/companies that want to build a website for my business, but I'm always skeptical about it. I decided to give Ethixweb that chance and they have proven themselves! I have been with them 2 years and within that first year my revenue and client bookings increased dramatically.",
    fullText:
      "I have been contacted by many people/companies that want to build a website for my business, but I'm always skeptical about it. I decided to give Ethixweb that chance and they have proven themselves! I have been with them 2 years and within that first year my revenue and client bookings increased dramatically. They are always available to help and innovate.",
  },
  {
    id: '3',
    name: 'Clinton McCulloch',
    role: 'Verified Client',
    date: 'October 2024',
    rating: 5,
    snippet:
      'I had Ethixweb.com create me a website not only did they do it extremely professional, but they did it extremely fast and it come out fabulous. They are very professional and they communicate great. I would highly recommend this company to create your next website. The team exceeded all expectations.',
    fullText:
      'I had Ethixweb.com create me a website not only did they do it extremely professional, but they did it extremely fast and it come out fabulous. They are very professional and they communicate great. I would highly recommend this company to create your next website. The team exceeded all expectations from concept to deployment.',
  },
  {
    id: '4',
    name: 'Leslie S.',
    role: 'Verified Client',
    date: 'January 2025',
    rating: 5,
    snippet:
      'Amazing experience from start to finish. The website speed, SEO rankings, and AI workflow integration completely transformed how we handle customer inquiries. Communication was seamless across time zones and delivery was on schedule.',
    fullText:
      'Amazing experience from start to finish. The website speed, SEO rankings, and AI workflow integration completely transformed how we handle customer inquiries. Communication was seamless across time zones and delivery was on schedule.',
  },
];

export function ClientReviews() {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Top Split: Section Header on Left & Trustpilot Hero Card on Right */}
        <div className="mb-14 grid grid-cols-1 items-start justify-between gap-10 lg:grid-cols-12">
          {/* Header Left */}
          <div className="reveal lg:col-span-7">
            <p className="mb-3 type-eyebrow text-crimson">
              Client Reviews
            </p>
            <h2 className="font-display type-section-title text-content text-balance">
              Trusted by businesses<br />worldwide.
            </h2>
            <p className="mt-5 max-w-xl type-body text-content-muted text-pretty">
              Real feedback from clients who trusted Ethixweb to design, build, and grow their
              digital presence.
            </p>
          </div>

          {/* Trustpilot Score Card Right */}
          <div className="reveal lg:col-span-5 flex justify-end">
            <div className="w-full max-w-md rounded-2xl border border-line-subtle bg-surface/90 p-7 text-center backdrop-blur-xl shadow-xl shadow-crimson/5">
              {/* Trustpilot logo header */}
              <div className="flex items-center justify-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-crimson text-white shadow-sm shadow-crimson/30">
                  ★
                </span>
                <span className="font-display text-xl font-bold tracking-tight text-content">
                  Trustpilot
                </span>
              </div>

              {/* Big Score */}
              <div className="mt-4 flex items-baseline justify-center gap-1.5">
                <span className="font-display text-5xl font-black tracking-tight text-content">
                  4.0
                </span>
                <span className="text-xl font-semibold text-content-faint">/ 5</span>
              </div>

              {/* Rating Stars - Red Brand Theme */}
              <div className="mt-2.5 flex items-center justify-center gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex h-6 w-6 items-center justify-center rounded-sm bg-crimson text-white text-sm shadow-sm shadow-crimson/20"
                  >
                    ★
                  </div>
                ))}
                <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-surface-tertiary text-content-faint text-sm">
                  ★
                </div>
              </div>

              <p className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-content-faint">
                TRUSTPILOT RATING
              </p>

              {/* 24/7 Global Availability */}
              <div className="my-5 rounded-xl border border-line-subtle bg-surface-secondary/70 py-3 px-4">
                <div className="font-display text-xl font-bold text-content">24/7</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-content-faint">
                  GLOBAL AVAILABILITY
                </div>
              </div>

              <p className="text-xs text-content-muted">
                Real feedback from real clients. We&apos;re proud to deliver work that earns trust,
                every time.
              </p>

              {/* Read reviews button */}
              <a
                href="https://www.trustpilot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-crimson py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-crimson-dark hover:shadow-lg hover:shadow-crimson/25"
              >
                Read reviews
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="reveal grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((review) => {
            const isExp = expanded[review.id];
            return (
              <div
                key={review.id}
                className="flex flex-col justify-between rounded-2xl border border-line-subtle bg-surface/80 p-6 backdrop-blur-md transition-all duration-300 hover:border-crimson/30 hover:bg-surface hover:shadow-lg"
              >
                <div>
                  {/* 5 Stars - Red Brand Theme */}
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <div
                        key={i}
                        className="flex h-4 w-4 items-center justify-center rounded-sm bg-crimson text-white text-[10px] shadow-sm shadow-crimson/20"
                      >
                        ★
                      </div>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm leading-relaxed text-content-secondary">
                    &ldquo;
                    {isExp
                      ? review.fullText
                      : review.snippet.length > 210
                      ? `${review.snippet.slice(0, 210)}...`
                      : review.snippet}
                    &rdquo;
                  </p>

                  {review.snippet.length > 210 && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(review.id)}
                      className="mt-2 text-xs font-semibold uppercase tracking-wider text-crimson hover:underline"
                    >
                      {isExp ? 'Read less' : 'Read more'}
                    </button>
                  )}
                </div>

                {/* Author Info & Trustpilot branding */}
                <div className="mt-6 flex items-end justify-between border-t border-line-subtle pt-4">
                  <div>
                    <h4 className="font-display text-sm font-semibold text-content">
                      {review.name}
                    </h4>
                    <p className="text-[11px] text-content-faint uppercase tracking-wider">
                      {review.role} · {review.date}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-content-faint">
                    Trustpilot
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to read more reviews */}
        <div className="reveal mt-12 text-center">
          <a
            href="https://www.trustpilot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-content-muted transition-colors hover:text-crimson"
          >
            <span>Read more reviews on Trustpilot</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
