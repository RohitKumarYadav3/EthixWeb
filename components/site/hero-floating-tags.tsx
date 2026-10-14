'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Activity, TrendingUp, Sparkles } from 'lucide-react';

interface FloatingTag {
  id: string;
  label: string;
  sub: string;
  badge: string;
  icon: typeof Cpu;
  positionClass: string;
  floatDelay: string;
  floatDuration: string;
  depth: number;
}

const TAGS: FloatingTag[] = [
  {
    id: 'ai-systems',
    label: 'AI-powered systems',
    sub: 'Auto-qualify & Route',
    badge: '24/7 Active',
    icon: Cpu,
    positionClass: 'right-[6%] top-[19%]',
    floatDelay: '0s',
    floatDuration: '4.8s',
    depth: 16,
  },
  {
    id: 'connected-workflows',
    label: 'Connected workflows',
    sub: 'Zero Manual Entry',
    badge: 'Live Sync',
    icon: Zap,
    positionClass: 'right-[4%] top-[45%]',
    floatDelay: '1.2s',
    floatDuration: '5.4s',
    depth: 22,
  },
  {
    id: 'performance-tracking',
    label: 'Performance tracking',
    sub: '<20ms Latency Core',
    badge: '90+ SLA',
    icon: Activity,
    positionClass: 'right-[22%] top-[63%]',
    floatDelay: '2.4s',
    floatDuration: '5.0s',
    depth: 14,
  },
  {
    id: 'qualified-leads',
    label: 'More qualified leads',
    sub: '+3.4x Conversion Sync',
    badge: 'Proven ROI',
    icon: TrendingUp,
    positionClass: 'right-[14%] bottom-[15%]',
    floatDelay: '0.8s',
    floatDuration: '5.8s',
    depth: 20,
  },
];

export function HeroFloatingTags() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[15] hidden overflow-hidden lg:block select-none">
      {TAGS.map((tag) => {
        const isHovered = hoveredId === tag.id;
        const Icon = tag.icon;
        const offsetX = mouse.x * tag.depth;
        const offsetY = mouse.y * tag.depth;

        return (
          <div
            key={tag.id}
            className={`pointer-events-auto absolute ${tag.positionClass} transition-transform duration-300 ease-out`}
            style={{
              transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
            }}
            onMouseEnter={() => setHoveredId(tag.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Harmonic Floating Drift Wrapper */}
            <div
              className="animate-float"
              style={{
                animationDuration: tag.floatDuration,
                animationDelay: tag.floatDelay,
              }}
            >
              <div
                className={`group relative flex items-center gap-3.5 rounded-2xl border px-4 py-3 backdrop-blur-xl transition-all duration-300 cursor-pointer ${
                  isHovered
                    ? '-translate-y-2 scale-105 border-crimson/90 bg-surface shadow-2xl shadow-crimson/25 ring-1 ring-crimson/50'
                    : 'border-line-subtle bg-surface/75 hover:border-crimson/50 hover:bg-surface/90 hover:shadow-xl hover:shadow-crimson/15'
                }`}
              >
                {/* Top Subtle Crimson Hairline Beam */}
                <span
                  className={`absolute inset-x-3 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-crimson to-transparent transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-40'
                  }`}
                />

                {/* Animated Pulsing Crimson Beacon Dot */}
                <div className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                  {/* Expanding Radar Wave Ring */}
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
                  {/* Glowing Ambient Core */}
                  <span className="absolute inline-flex h-3 w-3 rounded-full bg-crimson/40 blur-[2px]" />
                  {/* Crisp Center Dot */}
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-crimson shadow-md shadow-crimson/80" />
                </div>

                {/* Tag Content */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xs font-semibold tracking-tight text-content transition-colors group-hover:text-crimson">
                      {tag.label}
                    </span>
                    <Icon className="h-3.5 w-3.5 text-crimson transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  </div>
                  <div className="flex items-center gap-2 pt-0.5">
                    <span className="text-[10px] font-mono text-content-muted transition-colors group-hover:text-content-secondary">
                      ● {tag.sub}
                    </span>
                    <span
                      className={`rounded px-1.5 py-0.2 text-[9px] font-semibold transition-all duration-300 ${
                        isHovered
                          ? 'bg-crimson/20 text-crimson-bright ring-1 ring-crimson/40'
                          : 'bg-content/5 text-content-faint'
                      }`}
                    >
                      {tag.badge}
                    </span>
                  </div>
                </div>

                {/* Ambient Soft Glow Aura on Hover */}
                <span className="pointer-events-none absolute -inset-1 rounded-2xl bg-crimson/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
