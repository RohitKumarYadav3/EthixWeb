'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BrowserMockupProps {
  variant: 'ecommerce' | 'seo' | 'ai' | 'crm' | 'restaurant' | 'healthcare';
  className?: string;
}

export function BrowserMockup({ variant, className }: BrowserMockupProps) {
  return (
    <div className={cn('browser-frame bg-surface-secondary', className)}>
      {/* Browser bar */}
      <div className="browser-bar">
        <span className="browser-dot bg-crimson/60" />
        <span className="browser-dot bg-amber-500/50" />
        <span className="browser-dot bg-green-500/40" />
        <div className="ml-3 h-4 flex-1 rounded bg-content/5" />
      </div>

      {/* Content preview */}
      <div className="aspect-[16/10] overflow-hidden">
        {variant === 'ecommerce' && <EcommercePreview />}
        {variant === 'seo' && <SeoPreview />}
        {variant === 'ai' && <AiPreview />}
        {variant === 'crm' && <CrmPreview />}
        {variant === 'restaurant' && <RestaurantPreview />}
        {variant === 'healthcare' && <HealthcarePreview />}
      </div>
    </div>
  );
}

function EcommercePreview() {
  return (
    <div className="flex h-full flex-col bg-surface">
      {/* Nav bar */}
      <div className="flex items-center justify-between border-b border-line-subtle px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-crimson/60" />
          <div className="h-2 w-16 rounded bg-content/15" />
        </div>
        <div className="flex gap-3">
          <div className="h-2 w-8 rounded bg-content/10" />
          <div className="h-2 w-8 rounded bg-content/10" />
          <div className="h-2 w-8 rounded bg-content/10" />
        </div>
      </div>
      {/* Hero */}
      <div className="relative flex items-center px-4 py-4">
        <div className="flex-1">
          <div className="mb-2 h-3 w-32 rounded bg-content/20" />
          <div className="mb-2 h-3 w-24 rounded bg-content/10" />
          <div className="mt-3 h-5 w-20 rounded-full bg-crimson/60" />
        </div>
        <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-crimson/30 to-crimson/10" />
      </div>
      {/* Product grid */}
      <div className="grid grid-cols-3 gap-2 px-4 pb-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-line-subtle bg-surface-secondary p-2">
            <div className="mb-1.5 h-12 rounded bg-content/5" />
            <div className="mb-1 h-1.5 w-full rounded bg-content/10" />
            <div className="h-1.5 w-2/3 rounded bg-content/5" />
            <div className="mt-1.5 h-3 w-12 rounded bg-crimson/40" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SeoPreview() {
  return (
    <div className="flex h-full flex-col bg-surface">
      {/* Search bar */}
      <div className="flex items-center gap-2 border-b border-line-subtle px-4 py-3">
        <div className="h-4 w-4 rounded-full border-2 border-crimson/40" />
        <div className="h-4 flex-1 rounded bg-content/5" />
      </div>
      {/* Results */}
      <div className="flex-1 space-y-3 px-4 py-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={cn(i === 0 && 'rounded-lg border border-crimson/20 bg-crimson/5 p-2.5')}>
            <div className="mb-1 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-crimson/40" />
              <div className="h-2 w-20 rounded bg-content/15" />
            </div>
            <div className={cn('h-2.5 w-3/4 rounded', i === 0 ? 'bg-crimson/50' : 'bg-content/10')} />
            <div className="mt-1 h-1.5 w-full rounded bg-content/5" />
            <div className="mt-0.5 h-1.5 w-2/3 rounded bg-content/5" />
          </div>
        ))}
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 border-t border-line-subtle px-4 py-3">
        {['#1', '3x', '92%'].map((stat) => (
          <div key={stat} className="text-center">
            <div className="font-display text-sm font-bold text-crimson">{stat}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AiPreview() {
  return (
    <div className="flex h-full flex-col bg-surface">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-line-subtle px-4 py-2.5">
        <div className="flex h-5 w-5 items-center justify-center rounded bg-crimson/20">
          <div className="h-2 w-2 rounded-full bg-crimson animate-glow" />
        </div>
        <div className="h-2.5 w-20 rounded bg-content/15" />
      </div>
      {/* Chat flow */}
      <div className="flex-1 space-y-2.5 px-4 py-3">
        <div className="flex justify-start">
          <div className="max-w-[70%] rounded-lg rounded-tl-sm bg-content/5 p-2">
            <div className="h-1.5 w-24 rounded bg-content/15" />
            <div className="mt-1 h-1.5 w-16 rounded bg-content/10" />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[70%] rounded-lg rounded-tr-sm bg-crimson/15 p-2">
            <div className="h-1.5 w-20 rounded bg-crimson/40" />
            <div className="mt-1 h-1.5 w-28 rounded bg-crimson/30" />
            <div className="mt-1 h-1.5 w-12 rounded bg-crimson/20" />
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[60%] rounded-lg rounded-tl-sm bg-content/5 p-2">
            <div className="h-1.5 w-20 rounded bg-content/15" />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[75%] rounded-lg rounded-tr-sm bg-crimson/15 p-2">
            <div className="h-1.5 w-28 rounded bg-crimson/40" />
            <div className="mt-1 h-1.5 w-20 rounded bg-crimson/30" />
          </div>
        </div>
      </div>
      {/* Input */}
      <div className="flex items-center gap-2 border-t border-line-subtle px-4 py-2.5">
        <div className="h-4 flex-1 rounded-full bg-content/5" />
        <div className="h-5 w-5 rounded-full bg-crimson/50" />
      </div>
    </div>
  );
}

function CrmPreview() {
  return (
    <div className="flex h-full flex-col bg-surface">
      {/* Sidebar + main */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-12 border-r border-line-subtle py-3">
          <div className="mx-auto mb-3 h-4 w-4 rounded bg-crimson/40" />
          <div className="mx-auto mb-2 h-2 w-6 rounded bg-content/10" />
          <div className="mx-auto mb-2 h-2 w-6 rounded bg-content/5" />
          <div className="mx-auto mb-2 h-2 w-6 rounded bg-content/5" />
          <div className="mx-auto h-2 w-6 rounded bg-content/5" />
        </div>
        {/* Main */}
        <div className="flex-1 p-3">
          <div className="mb-3 flex items-center justify-between">
            <div className="h-3 w-16 rounded bg-content/15" />
            <div className="h-4 w-12 rounded-full bg-crimson/40" />
          </div>
          {/* Kanban columns */}
          <div className="grid grid-cols-3 gap-2">
            {['New', 'Contacted', 'Won'].map((col, ci) => (
              <div key={col} className="space-y-1.5">
                <div className={cn('h-2 w-12 rounded', ci === 0 ? 'bg-blue-500/40' : ci === 1 ? 'bg-amber-500/40' : 'bg-green-500/40')} />
                {[0, 1].map((j) => (
                  <div key={j} className="rounded-md border border-line-subtle bg-surface-secondary p-1.5">
                    <div className="mb-1 h-1.5 w-3/4 rounded bg-content/15" />
                    <div className="h-1 w-1/2 rounded bg-content/5" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Bottom stats */}
      <div className="grid grid-cols-4 gap-2 border-t border-line-subtle px-3 py-2">
        {['127', '42', '18', '12'].map((n) => (
          <div key={n} className="text-center">
            <div className="font-display text-xs font-bold text-content-secondary">{n}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RestaurantPreview() {
  return (
    <div className="flex h-full flex-col bg-surface">
      {/* Hero image area */}
      <div className="relative flex flex-col items-center justify-center bg-gradient-to-b from-crimson/20 to-surface-secondary py-6">
        <div className="mb-2 h-3 w-24 rounded bg-content/20" />
        <div className="mb-3 h-2 w-16 rounded bg-content/10" />
        <div className="h-5 w-20 rounded-full bg-crimson/60" />
      </div>
      {/* Menu items */}
      <div className="flex-1 space-y-2 px-4 py-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-content/5" />
            <div className="flex-1">
              <div className="h-1.5 w-20 rounded bg-content/15" />
              <div className="mt-1 h-1 w-24 rounded bg-content/5" />
            </div>
            <div className="font-display text-xs font-bold text-crimson">₹{[180, 240, 320][i]}</div>
          </div>
        ))}
      </div>
      {/* WhatsApp button */}
      <div className="flex items-center justify-center border-t border-line-subtle py-2.5">
        <div className="h-4 w-28 rounded-full bg-green-500/30" />
      </div>
    </div>
  );
}

function HealthcarePreview() {
  return (
    <div className="flex h-full flex-col bg-surface">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line-subtle px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full border-2 border-crimson/40" />
          <div className="h-2.5 w-16 rounded bg-content/15" />
        </div>
        <div className="h-4 w-12 rounded-full bg-crimson/40" />
      </div>
      {/* Appointment cards */}
      <div className="flex-1 space-y-2 px-4 py-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2.5 rounded-lg border border-line-subtle bg-surface-secondary p-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-crimson/15">
              <div className="h-3 w-3 rounded-full bg-crimson/40" />
            </div>
            <div className="flex-1">
              <div className="h-1.5 w-16 rounded bg-content/15" />
              <div className="mt-1 h-1 w-20 rounded bg-content/5" />
            </div>
            <div className="h-3 w-10 rounded bg-content/10" />
          </div>
        ))}
      </div>
      {/* Calendar mini */}
      <div className="grid grid-cols-7 gap-1 border-t border-line-subtle px-4 py-2.5">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className={cn('mx-auto h-4 w-4 rounded', i === 2 ? 'bg-crimson/60' : 'bg-content/5')} />
        ))}
      </div>
    </div>
  );
}
