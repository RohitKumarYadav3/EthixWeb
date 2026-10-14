'use client';

import { useEffect, useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isTransitioningRef.current) return;

    const nextTheme = isDark ? 'light' : 'dark';
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 500);

    const doc = document as unknown as {
      startViewTransition?: (updateCallback: () => void) => {
        ready: Promise<void>;
        finished: Promise<void>;
      };
    };

    // Check if View Transitions API is available
    if (
      typeof doc.startViewTransition === 'function' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      isTransitioningRef.current = true;

      const rect = buttonRef.current?.getBoundingClientRect();
      const x = rect ? rect.left + rect.width / 2 : event.clientX;
      const y = rect ? rect.top + rect.height / 2 : event.clientY;

      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = doc.startViewTransition(() => {
        flushSync(() => {
          // Immediately update DOM class for instant snapshot accuracy
          if (nextTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          setTheme(nextTheme);
        });
      });

      transition.ready
        .then(() => {
          const animation = document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 450,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              pseudoElement: '::view-transition-new(root)',
            }
          );

          animation.onfinish = () => {
            isTransitioningRef.current = false;
          };
        })
        .catch(() => {
          isTransitioningRef.current = false;
          setTheme(nextTheme);
        });

      transition.finished
        .then(() => {
          isTransitioningRef.current = false;
        })
        .catch(() => {
          isTransitioningRef.current = false;
        });
    } else {
      // Smooth fallback with CSS class
      document.documentElement.classList.add('theme-transitioning');
      setTheme(nextTheme);
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
      }, 400);
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label="Toggle light and dark mode"
      title={mounted ? (isDark ? 'Switch to light mode' : 'Switch to dark mode') : 'Toggle theme'}
      onClick={handleToggle}
      className="group relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line-subtle bg-surface text-content shadow-sm transition-all duration-300 hover:border-crimson hover:text-crimson hover:shadow-lg hover:shadow-crimson/20 active:scale-90"
    >
      {/* Background glowing aura */}
      <span
        className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
          isDark
            ? 'bg-gradient-to-tr from-purple-500/15 via-crimson/15 to-transparent opacity-80 group-hover:opacity-100'
            : 'bg-gradient-to-tr from-amber-400/20 via-orange-400/15 to-transparent opacity-80 group-hover:opacity-100'
        }`}
      />

      {/* Click ripple pulse */}
      {isSpinning && (
        <span className="pointer-events-none absolute inset-0 animate-ping rounded-full border-2 border-crimson/50" />
      )}

      {/* Sun icon with rotating ray animation */}
      <div
        className={`relative flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDark
            ? 'scale-0 -rotate-90 opacity-0'
            : 'scale-100 rotate-0 opacity-100 text-amber-500'
        }`}
      >
        <Sun className="h-4 w-4 drop-shadow-[0_0_6px_rgba(245,158,11,0.6)] transition-transform duration-300 group-hover:rotate-45" />
      </div>

      {/* Moon icon with glowing crescent aura */}
      <div
        className={`absolute flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDark
            ? 'scale-100 rotate-0 opacity-100 text-slate-100'
            : 'scale-0 rotate-90 opacity-0'
        }`}
      >
        <Moon className="h-4 w-4 drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] transition-transform duration-300 group-hover:-rotate-12" />
      </div>
    </button>
  );
}
