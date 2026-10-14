'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Linkedin,
  Facebook,
  Instagram,
  Building2,
  Mail,
  Clock,
  ArrowUpRight,
  ArrowUp,
  X as CloseIcon,
  ShieldCheck,
  RotateCcw,
  FileText,
  Sparkles,
  MapPin,
  CheckCircle2,
  Copy,
} from 'lucide-react';
import { Logo } from '@/components/site/logo';

type PolicyTab = 'refunds' | 'terms' | 'privacy';

/**
 * Animated Interactive Neural Network Canvas (similar to Home page HeroScene)
 * Renders drifting crimson nodes, proximity connection lines, and glowing pulsing hubs
 */
function FooterNetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      isHub: boolean;
      pulsePhase: number;
    }

    let nodes: Node[] = [];
    const mouse = { x: -1000, y: -1000, active: false };

    const initNodes = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      const nodeCount = Math.floor(Math.max(30, Math.min(width / 24, 65)));
      nodes = [];

      for (let i = 0; i < nodeCount; i++) {
        const isHub = i % 7 === 0;
        const baseRadius = isHub ? 3.5 : 1.8;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isHub ? 0.25 : 0.45),
          vy: (Math.random() - 0.5) * (isHub ? 0.25 : 0.45),
          radius: baseRadius,
          baseRadius,
          isHub,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    initNodes();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initNodes, 150);
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    let lastTime = performance.now();
    let isVisible = false;
    let isRunning = false;

    const render = (time: number) => {
      if (!isVisible) {
        isRunning = false;
        return;
      }

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Determine theme from document class
      const isDark = document.documentElement.classList.contains('dark');
      const maxDistance = Math.min(width, height) * 0.28;

      // Update and draw lines between nodes
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        if (!prefersReducedMotion) {
          n1.x += n1.vx;
          n1.y += n1.vy;

          // Bounce off boundaries
          if (n1.x < 0 || n1.x > width) n1.vx *= -1;
          if (n1.y < 0 || n1.y > height) n1.vy *= -1;

          // Subtle interactive attraction to mouse
          if (mouse.active) {
            const dx = mouse.x - n1.x;
            const dy = mouse.y - n1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180 && dist > 10) {
              const force = (1 - dist / 180) * 0.15;
              n1.x += (dx / dist) * force;
              n1.y += (dy / dist) * force;
            }
          }
        }

        // Connect with other nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (isDark ? 0.22 : 0.15);
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);

            // Slight curve like homepage hero web
            const midX = (n1.x + n2.x) / 2;
            const midY = (n1.y + n2.y) / 2;
            const bend = Math.sin(time * 0.001 + i) * 6;
            ctx.quadraticCurveTo(midX + bend, midY - bend, n2.x, n2.y);

            ctx.strokeStyle = isDark
              ? `rgba(239, 68, 68, ${alpha})`
              : `rgba(220, 38, 38, ${alpha * 0.85})`;
            ctx.lineWidth = n1.isHub || n2.isHub ? 1.2 : 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes and glowing hubs
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.pulsePhase += delta * 2;
        const pulse = Math.sin(n.pulsePhase);

        if (n.isHub) {
          // Hub pulsing halo ring
          const haloRadius = n.baseRadius * 3 + pulse * 2;
          ctx.beginPath();
          ctx.arc(n.x, n.y, Math.max(1, haloRadius), 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? 'rgba(239, 68, 68, 0.08)'
            : 'rgba(220, 38, 38, 0.06)';
          ctx.fill();

          // Hub core
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.baseRadius + pulse * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? '#ef4444' : '#dc2626';
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = isDark ? 10 : 4;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          // Standard node
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? 'rgba(248, 113, 113, 0.7)'
            : 'rgba(185, 28, 28, 0.6)';
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (!isRunning && isVisible) {
        isRunning = true;
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopAnimation = () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? false;
        if (isVisible) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      stopAnimation();
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-65 dark:opacity-85"
      style={{ display: 'block' }}
    />
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  const [activeModal, setActiveModal] = useState<PolicyTab | null>(null);
  const [socialFeedback, setSocialFeedback] = useState<string | null>(null);
  const [clickedIcon, setClickedIcon] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNonWorkingSocialClick = (platform: string) => {
    setClickedIcon(platform);
    setSocialFeedback(platform);
    setTimeout(() => setClickedIcon(null), 400);
    setTimeout(() => setSocialFeedback(null), 3000);
  };

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('info@ethixweb.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <>
      <footer className="relative overflow-hidden border-t border-border/80 dark:border-line-subtle bg-gradient-to-b from-surface via-surface-secondary/20 to-surface-secondary/40 dark:from-surface dark:via-surface dark:to-surface text-content transition-colors duration-300">
        {/* Animated Background Canvas (Homage to homepage 3D node network) */}
        <FooterNetworkAnimation />

        {/* Ambient Top Laser Seam */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-crimson to-transparent opacity-80" />

        {/* Ambient Breathing Radial Glow Pockets */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-[650px] rounded-full bg-crimson/10 blur-[110px] animate-pulse" />
        <div className="pointer-events-none absolute -bottom-32 right-12 h-80 w-80 rounded-full bg-crimson/8 blur-3xl" />

        {/* Main Footer Wrapper */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-16 lg:px-10">
          {/* Top Telemetry & Status Bar */}
          <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-border/80 dark:border-line-subtle bg-surface-secondary/80 dark:bg-surface-secondary/60 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                SYSTEM STATUS: ACTIVE · SERVING US &amp; GLOBAL
              </span>
              <span className="text-xs font-semibold text-content-secondary dark:text-content-faint hidden md:inline tracking-wide">
                WYOMING · WASHINGTON · NEW DELHI
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-content-secondary dark:text-content-muted">
              <span>Ready to transform your business?</span>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-1.5 font-bold text-crimson transition-colors hover:text-crimson-bright"
              >
                <span>Start a project</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Bento-Style 4-Column Layout */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
            {/* Box 1: Brand & Social Dock (Only LinkedIn, Facebook, Instagram) */}
            <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl border border-border/80 dark:border-line-subtle bg-surface/95 dark:bg-surface/80 p-6 shadow-md dark:shadow-sm backdrop-blur-md">
              <div>
                <Link
                  href="/"
                  onClick={handleLogoClick}
                  className="group inline-flex items-center gap-3 focus:outline-none"
                  title={pathname === '/' ? 'Ethixweb (Click to scroll to top)' : 'Ethixweb Home'}
                >
                  <Logo size="md" showEmblem={false} />
                </Link>

                <p className="mt-4 text-sm leading-relaxed font-medium text-content-secondary dark:text-content-muted">
                  Revamp your online presence with bespoke designs crafted for your business success.
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border dark:border-line-subtle bg-surface-secondary/90 px-3 py-1 text-[11px] font-medium text-content-secondary dark:text-content-faint">
                  <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
                  <span>Custom Engineering · AI Automation · High-Conversion Web</span>
                </div>
              </div>

              {/* Social Dock (Only LinkedIn, Facebook, Instagram) */}
              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-wider text-content dark:text-content-faint mb-3">
                  Connect With Us
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* LinkedIn - THE ONLY WORKING LINK */}
                  <a
                    href="https://www.linkedin.com/company/ethixweb/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ethixweb on LinkedIn"
                    className="group relative flex h-11 items-center gap-2.5 rounded-xl border border-crimson/40 bg-crimson/10 px-4 text-crimson transition-all duration-300 hover:-translate-y-1 hover:bg-crimson hover:text-white hover:shadow-lg hover:shadow-crimson/30 active:scale-95"
                  >
                    <Linkedin className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
                    <span className="text-xs font-bold">LinkedIn</span>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75 group-hover:bg-white" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson group-hover:bg-white" />
                    </span>
                  </a>

                  {/* Facebook - Non working with satisfying click animation */}
                  <button
                    type="button"
                    aria-label="Facebook (Launching Soon)"
                    onClick={() => handleNonWorkingSocialClick('Facebook')}
                    className={`group flex h-11 w-11 items-center justify-center rounded-xl border border-border/80 dark:border-line-subtle bg-surface-secondary text-content-secondary transition-all duration-300 hover:-translate-y-1 hover:border-crimson hover:bg-crimson/10 hover:text-crimson hover:shadow-md active:scale-90 dark:text-content-muted ${
                      clickedIcon === 'Facebook' ? 'scale-125 ring-2 ring-crimson' : ''
                    }`}
                  >
                    <Facebook className="h-4 w-4 transition-transform group-hover:scale-110" />
                  </button>

                  {/* Instagram - Non working with satisfying click animation */}
                  <button
                    type="button"
                    aria-label="Instagram (Launching Soon)"
                    onClick={() => handleNonWorkingSocialClick('Instagram')}
                    className={`group flex h-11 w-11 items-center justify-center rounded-xl border border-border/80 dark:border-line-subtle bg-surface-secondary text-content-secondary transition-all duration-300 hover:-translate-y-1 hover:border-crimson hover:bg-crimson/10 hover:text-crimson hover:shadow-md active:scale-90 dark:text-content-muted ${
                      clickedIcon === 'Instagram' ? 'scale-125 ring-2 ring-crimson' : ''
                    }`}
                  >
                    <Instagram className="h-4 w-4 transition-transform group-hover:scale-110" />
                  </button>
                </div>

                {/* Animated Feedback Toast */}
                {socialFeedback && (
                  <div className="mt-3 flex items-center gap-2 rounded-xl border border-crimson/30 bg-surface p-2.5 text-xs text-crimson shadow-lg animate-in fade-in slide-in-from-top-1 duration-200">
                    <Sparkles className="h-4 w-4 shrink-0 animate-spin" />
                    <span>
                      Connect with our leadership team on{' '}
                      <a
                        href="https://www.linkedin.com/company/ethixweb/posts/?feedView=all"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold underline hover:text-crimson-bright"
                      >
                        LinkedIn
                      </a>
                      ! Our {socialFeedback} channel is launching soon.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Box 2: Operations & Direct Contact (Span 3) */}
            <div className="lg:col-span-3 rounded-2xl border border-border/80 dark:border-line-subtle bg-surface/95 dark:bg-surface/80 p-6 shadow-md dark:shadow-sm backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-content dark:text-content-faint">
                  Global Contact
                </h3>
                <span className="rounded-full bg-crimson/10 px-2.5 py-0.5 text-[10px] font-bold text-crimson">
                  US HQ
                </span>
              </div>

              <div className="space-y-4 text-sm text-content-secondary dark:text-content-muted">
                {/* Registered Entity */}
                <div className="flex items-start gap-3">
                  <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-crimson" />
                  <div>
                    <p className="font-bold text-content text-sm sm:text-base">Ethixweb USA LLC</p>
                    <p className="text-xs font-medium text-content-secondary dark:text-content-muted">Registered in Wyoming, United States</p>
                    <p className="text-xs font-medium text-content-secondary dark:text-content-muted">Serving Kent, WA &amp; North America</p>
                  </div>
                </div>

                {/* Email with copy button */}
                <div className="flex items-center justify-between rounded-xl border border-border/80 dark:border-line-subtle bg-surface-secondary/80 p-2.5">
                  <div className="flex items-center gap-2 text-content">
                    <Mail className="h-4 w-4 text-crimson shrink-0" />
                    <a
                      href="mailto:info@ethixweb.com"
                      className="font-semibold hover:text-crimson text-xs sm:text-sm text-content"
                    >
                      info@ethixweb.com
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    title="Copy email to clipboard"
                    className="rounded p-1 text-content-secondary hover:text-crimson transition-colors dark:text-content-faint"
                  >
                    {copiedEmail ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 shrink-0 text-crimson" />
                  <span className="font-medium text-content-secondary dark:text-content-muted">Mon-Fri · 9:00 AM – 5:00 PM</span>
                </div>

                {/* India Center Badge */}
                <div className="pt-2 border-t border-border/60 dark:border-line-subtle/50">
                  <div className="flex items-start gap-2.5 text-xs text-content-secondary dark:text-content-faint">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    <div>
                      <p className="font-bold text-content dark:text-content-muted">Global Delivery Hub</p>
                      <p className="text-[11px] font-medium text-content-secondary dark:text-content-faint">Engineering &amp; Support · New Delhi, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 3: Company Navigation (Span 2) */}
            <div className="lg:col-span-2 rounded-2xl border border-border/80 dark:border-line-subtle bg-surface/95 dark:bg-surface/80 p-6 shadow-md dark:shadow-sm backdrop-blur-md">
              <h3 className="text-xs font-bold uppercase tracking-wider text-content dark:text-content-faint mb-4">
                Company
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="group inline-flex items-center font-medium text-content-secondary transition-colors hover:text-crimson dark:text-content-muted dark:hover:text-crimson"
                  >
                    <span className="transition-transform group-hover:translate-x-1">About Us</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/industries"
                    className="group inline-flex items-center font-medium text-content-secondary transition-colors hover:text-crimson dark:text-content-muted dark:hover:text-crimson"
                  >
                    <span className="transition-transform group-hover:translate-x-1">Industries</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/our-work"
                    className="group inline-flex items-center font-medium text-content-secondary transition-colors hover:text-crimson dark:text-content-muted dark:hover:text-crimson"
                  >
                    <span className="transition-transform group-hover:translate-x-1">Our Work</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="group inline-flex items-center font-medium text-content-secondary transition-colors hover:text-crimson dark:text-content-muted dark:hover:text-crimson"
                  >
                    <span className="transition-transform group-hover:translate-x-1">Blog</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center font-medium text-content-secondary transition-colors hover:text-crimson dark:text-content-muted dark:hover:text-crimson"
                  >
                    <span className="transition-transform group-hover:translate-x-1">Contact</span>
                  </Link>
                </li>
                <li className="pt-2 border-t border-border/60 dark:border-line-subtle/50">
                  <Link
                    href="/admin/login"
                    className="group inline-flex items-center text-xs font-semibold text-content-muted transition-colors hover:text-crimson dark:text-content-faint"
                  >
                    <span className="transition-transform group-hover:translate-x-1">Admin Portal</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Box 4: Governance & Useful Links with Instant Modal (Span 3) */}
            <div className="lg:col-span-3 rounded-2xl border border-border/80 dark:border-line-subtle bg-surface/95 dark:bg-surface/80 p-6 shadow-md dark:shadow-sm backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-content dark:text-content-faint">
                  Useful Links
                </h3>
                <ShieldCheck className="h-4 w-4 text-crimson" />
              </div>

              <p className="text-xs font-medium text-content-secondary dark:text-content-muted mb-4">
                Enterprise-grade transparency, contracts, and legal documentation:
              </p>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setActiveModal('refunds')}
                  className="w-full flex items-center justify-between rounded-xl border border-border/80 dark:border-line-subtle bg-surface-secondary/80 p-2.5 text-xs font-semibold text-content transition-all hover:border-crimson hover:text-crimson hover:bg-crimson/5 text-left"
                >
                  <span className="flex items-center gap-2">
                    <RotateCcw className="h-3.5 w-3.5 text-crimson" />
                    <span>Cancellation &amp; Refunds</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-content-secondary dark:text-content-faint" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModal('terms')}
                  className="w-full flex items-center justify-between rounded-xl border border-border/80 dark:border-line-subtle bg-surface-secondary/80 p-2.5 text-xs font-semibold text-content transition-all hover:border-crimson hover:text-crimson hover:bg-crimson/5 text-left"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-crimson" />
                    <span>Terms &amp; Conditions</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-content-secondary dark:text-content-faint" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModal('privacy')}
                  className="w-full flex items-center justify-between rounded-xl border border-border/80 dark:border-line-subtle bg-surface-secondary/80 p-2.5 text-xs font-semibold text-content transition-all hover:border-crimson hover:text-crimson hover:bg-crimson/5 text-left"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-crimson" />
                    <span>Privacy Policy</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-content-secondary dark:text-content-faint" />
                </button>
              </div>

              <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-[11px] text-emerald-950 dark:text-emerald-300">
                <p className="font-bold flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>100% Milestone Satisfaction</span>
                </p>
                <p className="text-[10px] text-content-secondary dark:text-content-muted font-medium mt-0.5">
                  Transparent milestone payments &amp; code ownership.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright, Legal & Back-to-Top */}
          <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-border/80 dark:border-line-subtle pt-8 text-xs text-content-secondary dark:text-content-faint sm:flex-row sm:items-center">
            <div>
              <p className="font-semibold text-content dark:text-content-faint">© {new Date().getFullYear()} Ethixweb. All rights reserved.</p>
              <p className="mt-1 text-[11px] font-medium text-content-secondary dark:text-content-faint/80">
                Ethixweb USA LLC | Registered in Wyoming, United States · Global Delivery in India
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              {/* Book an appointment */}
              <Link
                href="/contact"
                className="group inline-flex items-center gap-1.5 font-semibold text-content transition-colors duration-200 hover:text-crimson"
              >
                <span>Book an appointment</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              {/* Back to top button with smooth scroll */}
              <button
                type="button"
                onClick={handleScrollToTop}
                className="group inline-flex items-center gap-1.5 rounded-full border border-border/80 dark:border-line-subtle bg-surface-secondary px-4 py-2 text-xs font-bold text-content transition-all duration-300 hover:border-crimson hover:bg-crimson hover:text-white hover:shadow-lg hover:shadow-crimson/25 active:scale-95 shadow-sm"
              >
                <span>Back to top</span>
                <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Modal for Useful Links (Cancellation, Terms, Privacy) */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop blur */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveModal(null)}
          />

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl border border-line-subtle bg-surface text-content shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-line-subtle px-6 py-4">
              <div className="flex items-center gap-3">
                {activeModal === 'refunds' && <RotateCcw className="h-5 w-5 text-crimson" />}
                {activeModal === 'terms' && <FileText className="h-5 w-5 text-crimson" />}
                {activeModal === 'privacy' && <ShieldCheck className="h-5 w-5 text-crimson" />}
                <div>
                  <h3 className="font-display font-semibold text-content text-base sm:text-lg">
                    {activeModal === 'refunds' && 'Cancellation & Refund Policy'}
                    {activeModal === 'terms' && 'Terms & Conditions'}
                    {activeModal === 'privacy' && 'Privacy Policy'}
                  </h3>
                  <p className="text-xs text-content-faint">Ethixweb USA LLC · Effective 2026</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Close dialog"
                className="rounded-lg p-2 text-content-muted transition-colors hover:bg-surface-secondary hover:text-content"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Policy Tabs */}
            <div className="flex border-b border-line-subtle bg-surface-secondary px-6">
              <button
                type="button"
                onClick={() => setActiveModal('refunds')}
                className={`py-3 px-4 text-xs font-medium border-b-2 transition-all ${
                  activeModal === 'refunds'
                    ? 'border-crimson text-crimson font-semibold'
                    : 'border-transparent text-content-muted hover:text-content'
                }`}
              >
                Cancellation &amp; Refunds
              </button>
              <button
                type="button"
                onClick={() => setActiveModal('terms')}
                className={`py-3 px-4 text-xs font-medium border-b-2 transition-all ${
                  activeModal === 'terms'
                    ? 'border-crimson text-crimson font-semibold'
                    : 'border-transparent text-content-muted hover:text-content'
                }`}
              >
                Terms &amp; Conditions
              </button>
              <button
                type="button"
                onClick={() => setActiveModal('privacy')}
                className={`py-3 px-4 text-xs font-medium border-b-2 transition-all ${
                  activeModal === 'privacy'
                    ? 'border-crimson text-crimson font-semibold'
                    : 'border-transparent text-content-muted hover:text-content'
                }`}
              >
                Privacy Policy
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto px-6 py-6 text-sm text-content-muted space-y-4">
              {activeModal === 'refunds' && (
                <>
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-800 dark:text-emerald-300">
                    <p className="font-medium">100% Milestone Satisfaction Guarantee</p>
                    <p className="text-xs mt-1">
                      Ethixweb structures every custom engineering and web engagement in clear, transparent milestones.
                    </p>
                  </div>
                  <h4 className="font-semibold text-content text-sm">1. Project Cancellations</h4>
                  <p>
                    Clients may request project cancellation prior to milestone sign-off by emailing{' '}
                    <a href="mailto:info@ethixweb.com" className="text-crimson underline">info@ethixweb.com</a>.
                    Work completed up to the date of notice will be pro-rated against the retainer.
                  </p>
                  <h4 className="font-semibold text-content text-sm">2. Refund Eligibility</h4>
                  <p>
                    Discovery and initial strategy phases are fully refundable within the first 7 days if no design mockups have been delivered. Once bespoke code or design deliverables have been approved, milestone payments are non-refundable.
                  </p>
                  <h4 className="font-semibold text-content text-sm">3. Monthly Retainers &amp; Maintenance</h4>
                  <p>
                    Monthly SEO, hosting, or ongoing support retainers can be cancelled anytime with a 14-day written notice prior to the next billing cycle.
                  </p>
                </>
              )}

              {activeModal === 'terms' && (
                <>
                  <h4 className="font-semibold text-content text-sm">1. Acceptance of Terms</h4>
                  <p>
                    By engaging Ethixweb USA LLC (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;), registered in Wyoming, USA, you agree to comply with and be bound by these Terms of Service.
                  </p>
                  <h4 className="font-semibold text-content text-sm">2. Intellectual Property &amp; Ownership</h4>
                  <p>
                    Upon receipt of full payment for agreed milestones, all bespoke source code, visual designs, and copy created specifically for your project become your exclusive intellectual property. Ethixweb retains rights to pre-existing libraries and boilerplate frameworks.
                  </p>
                  <h4 className="font-semibold text-content text-sm">3. Warranties &amp; Uptime</h4>
                  <p>
                    We deliver enterprise-grade performance and accessibility standards. We provide a complimentary 30-day bug-fix guarantee after production deployment.
                  </p>
                  <h4 className="font-semibold text-content text-sm">4. Governing Law</h4>
                  <p>
                    These terms are governed by and construed in accordance with the laws of the State of Wyoming, United States.
                  </p>
                </>
              )}

              {activeModal === 'privacy' && (
                <>
                  <h4 className="font-semibold text-content text-sm">1. Information We Collect</h4>
                  <p>
                    Ethixweb collects only the information necessary to provide our digital engineering and design services: contact details (name, email, phone), project specifications, and analytics telemetry to improve site performance.
                  </p>
                  <h4 className="font-semibold text-content text-sm">2. How We Protect Your Data</h4>
                  <p>
                    All client data is encrypted in transit (TLS 1.3) and at rest (AES-256). We never sell, rent, or trade your personal or business data to third parties.
                  </p>
                  <h4 className="font-semibold text-content text-sm">3. Cookies &amp; Tracking</h4>
                  <p>
                    We use privacy-respecting first-party analytics without cross-site tracking cookies. You may toggle preferences anytime via your browser settings.
                  </p>
                  <h4 className="font-semibold text-content text-sm">4. Contact Our Data Protection Officer</h4>
                  <p>
                    For inquiries regarding privacy, data export, or deletion, please email{' '}
                    <a href="mailto:info@ethixweb.com" className="text-crimson underline">info@ethixweb.com</a>.
                  </p>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-line-subtle bg-surface px-6 py-3">
              <span className="text-xs text-content-faint">Need clarification? Contact info@ethixweb.com</span>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="rounded-lg bg-crimson px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-crimson-dark"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
