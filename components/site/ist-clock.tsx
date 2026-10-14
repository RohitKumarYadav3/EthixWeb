'use client';

import { useEffect, useState } from 'react';

function getISTTimeString(): string {
  try {
    const now = new Date();
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(now);
  } catch {
    // Guaranteed fallback: UTC + 5 hours 30 minutes
    const now = new Date();
    const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istMs = utcMs + (5.5 * 3600000);
    const ist = new Date(istMs);
    const h = String(ist.getHours()).padStart(2, '0');
    const m = String(ist.getMinutes()).padStart(2, '0');
    const s = String(ist.getSeconds()).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }
}

export function ISTClock() {
  const [timeStr, setTimeStr] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeStr(getISTTimeString());

    const timer = setInterval(() => {
      setTimeStr(getISTTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      title="Indian Standard Time (IST - UTC+05:30)"
      className="group inline-flex items-center gap-2 rounded-full border border-line-subtle bg-surface px-3 py-1.5 text-xs text-content shadow-sm transition-all duration-300 hover:border-crimson/50 hover:shadow-md hover:shadow-crimson/10 cursor-default select-none shrink-0"
    >
      {/* Brand Crimson Pulsing Status Beacon */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson shadow-sm shadow-crimson/60" />
      </span>

      {/* IST Label */}
      <span className="font-semibold text-content transition-colors group-hover:text-crimson text-[11px] tracking-wide">
        IST
      </span>

      {/* Live Time Display */}
      <span
        suppressHydrationWarning
        className="font-mono tabular-nums text-content font-semibold transition-colors group-hover:text-crimson text-[11px]"
      >
        {mounted && timeStr ? timeStr : '--:--:--'}
      </span>
    </div>
  );
}

