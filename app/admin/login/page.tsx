'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { Logo } from '@/components/site/logo';
import { ThemeToggle } from '@/components/site/theme-toggle';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-surface px-6 py-12 text-content">
      <div className="grid-pattern absolute inset-0 opacity-[0.03]" />
      <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-crimson/5 blur-[140px]" />
      <div className="absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-crimson/5 blur-[120px]" />

      <div className="relative w-full max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="type-btn inline-flex items-center gap-2 text-content-muted transition-colors hover:text-crimson"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
          <ThemeToggle />
        </div>

        <div className="rounded-2xl border border-line-subtle bg-surface-secondary/70 p-8 shadow-xl backdrop-blur-xl md:p-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Logo size="md" priority />
              <p className="type-caption mt-2 text-content-faint">Ethixweb India Lead Portal</p>
            </div>
            <span className="type-caption rounded-full border border-line-subtle bg-surface px-3 py-1 font-medium text-content-muted shadow-sm">
              Admin Login
            </span>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
              <p className="type-body-sm text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="type-body-sm mb-2 block font-medium text-content-secondary">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-content-faint" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-line-subtle bg-surface py-3 pl-11 pr-4 text-content placeholder-content/30 transition-colors focus:border-crimson focus:outline-none"
                  placeholder="admin@ethixweb.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="type-body-sm mb-2 block font-medium text-content-secondary">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-content-faint" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-line-subtle bg-surface py-3 pl-11 pr-4 text-content placeholder-content/30 transition-colors focus:border-crimson focus:outline-none"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="type-btn group flex w-full items-center justify-center gap-2 rounded-lg bg-crimson py-3 text-white shadow-lg transition-all duration-300 hover:bg-crimson-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
              {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
