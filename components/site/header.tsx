'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/site/theme-toggle';
import { ISTClock } from '@/components/site/ist-clock';
import { Logo } from '@/components/site/logo';

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/industries', label: 'Industries' },
  { href: '/our-work', label: 'Our Work' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-surface/90 backdrop-blur-xl border-b border-line-subtle py-2.5 shadow-md shadow-black/5'
            : 'bg-transparent py-4'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <div className="shrink-0">
            <Logo asLink priority size="md" showEmblem={false} />
          </div>

          {/* Desktop Navigation Links (>= lg screens) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 type-nav text-content-secondary">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors duration-200 text-sm font-medium',
                    isActive
                      ? 'text-crimson font-semibold'
                      : 'hover:text-crimson text-content-secondary'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Stack (Desktop >= lg) */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
            <ISTClock />
            <ThemeToggle />

            {/* Admin Login Portal Button */}
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 rounded-full border border-line-subtle bg-surface px-3 py-1.5 text-xs font-semibold text-content-secondary shadow-sm transition-all duration-200 hover:border-crimson hover:text-crimson hover:shadow-sm"
              title="Admin Portal Login"
            >
              <Shield className="h-3.5 w-3.5 text-crimson" />
              <span>Admin</span>
            </Link>

            {/* Primary Action Button */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-crimson px-4 py-2 xl:px-5 xl:py-2.5 text-xs xl:text-sm font-semibold text-white hover:bg-crimson-dark transition-all shadow-md shadow-crimson/25 hover:shadow-lg hover:shadow-crimson/35 active:scale-[0.98]"
            >
              <span>Start a project</span>
              <ArrowUpRight className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
            </Link>
          </div>

          {/* Tablet & Mobile Actions Stack (< lg) */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <ISTClock />
            <ThemeToggle />
            
            {/* Admin Icon Button on Mobile */}
            <Link
              href="/admin/login"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-subtle bg-surface text-content-secondary hover:border-crimson hover:text-crimson transition shadow-sm"
              title="Admin Portal Login"
              aria-label="Admin Portal"
            >
              <Shield className="h-4 w-4 text-crimson" />
            </Link>

            {/* Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line-subtle bg-surface text-content hover:bg-surface-secondary transition shadow-sm"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Sheet */}
        {mobileOpen && (
          <div className="lg:hidden mx-4 mt-3 rounded-2xl border border-line-subtle bg-surface/98 backdrop-blur-2xl p-6 shadow-2xl transition-all animate-fade-in">
            <nav className="flex flex-col gap-3.5 type-nav !text-base text-content">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'py-1.5 transition-colors font-medium border-b border-line-subtle/50 pb-2.5',
                      isActive ? 'text-crimson font-bold' : 'hover:text-crimson text-content'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-5 pt-3 border-t border-line-subtle flex flex-col gap-3">
              <Link
                href="/admin/login"
                onClick={() => setMobileOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line-subtle bg-surface-secondary py-2.5 text-sm font-semibold text-content hover:text-crimson hover:border-crimson transition shadow-sm"
              >
                <Shield className="h-4 w-4 text-crimson" />
                <span>Admin Login Portal</span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-crimson py-3 text-sm font-semibold text-white hover:bg-crimson-dark transition shadow-md shadow-crimson/25"
              >
                <span>Start a project</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

