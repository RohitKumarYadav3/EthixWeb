'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Activity, TrendingUp } from 'lucide-react';

interface NetworkNode {
  id: string;
  label: string;
  sub: string;
  cornerLabel: string;
  icon: typeof Cpu;
  xPct: number; // percentage from left
  yPct: number; // percentage from top
  emblemCornerX: number; // logo anchor point (0-1000)
  emblemCornerY: number; // logo anchor point (0-1000)
  nodeX: number; // badge anchor point (0-1000)
  nodeY: number; // badge anchor point (0-1000)
  depth: number; // parallax depth multiplier
}

const NODES: NetworkNode[] = [
  {
    id: 'ai-systems',
    label: 'AI-powered systems',
    sub: 'Auto-qualify & Route',
    cornerLabel: 'Top Bar Corner',
    icon: Cpu,
    xPct: 88,
    yPct: 16,
    emblemCornerX: 670,
    emblemCornerY: 320,
    nodeX: 880,
    nodeY: 160,
    depth: 14,
  },
  {
    id: 'connected-workflows',
    label: 'Connected workflows',
    sub: 'Zero Manual Entry',
    cornerLabel: 'Mid Arm Corner',
    icon: Zap,
    xPct: 91,
    yPct: 44,
    emblemCornerX: 665,
    emblemCornerY: 445,
    nodeX: 910,
    nodeY: 440,
    depth: 22,
  },
  {
    id: 'performance-tracking',
    label: 'Performance tracking',
    sub: '<20ms Latency Core',
    cornerLabel: 'Spine Base Corner',
    icon: Activity,
    xPct: 54,
    yPct: 68,
    emblemCornerX: 560,
    emblemCornerY: 575,
    nodeX: 540,
    nodeY: 680,
    depth: 16,
  },
  {
    id: 'qualified-leads',
    label: 'More qualified leads',
    sub: '+3.4x Conversion Sync',
    cornerLabel: 'Bottom Arm Corner',
    icon: TrendingUp,
    xPct: 86,
    yPct: 72,
    emblemCornerX: 675,
    emblemCornerY: 575,
    nodeX: 860,
    nodeY: 720,
    depth: 20,
  },
];

export function HeroConnectedNetwork() {
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
      {/* SVG Connecting Pipelines Emitter from Emblem Corners */}
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="emblemTraceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF4D5A" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#E11D2E" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#991B1B" stopOpacity="0.2" />
          </linearGradient>

          <filter id="packetGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dynamic laser connecting lines from Logo corners to Feature badges */}
        {NODES.map((node, i) => {
          const isHovered = hoveredId === node.id;
          const pathD = `M ${node.emblemCornerX} ${node.emblemCornerY} Q ${(node.emblemCornerX + node.nodeX) / 2} ${(node.emblemCornerY + node.nodeY) / 2 - 25} ${node.nodeX} ${node.nodeY}`;

          return (
            <g key={`pipe-${node.id}`}>
              {/* Static trace line */}
              <path
                d={pathD}
                stroke={isHovered ? '#FF4D5A' : 'url(#emblemTraceGrad)'}
                strokeWidth={isHovered ? 2.6 : 1.8}
                strokeDasharray="4 6"
                className={`transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-65'}`}
              />

              {/* Animated Moving Data Packet streaming from logo corner to badge */}
              <circle r={isHovered ? 5 : 4} fill="#FF4D5A" filter="url(#packetGlowFilter)">
                <animateMotion
                  path={pathD}
                  dur={`${2.2 + i * 0.4}s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Reverse returning sync packet */}
              <circle r="3" fill="#FFFFFF" opacity="0.85">
                <animateMotion
                  path={pathD}
                  dur={`${3.0 + i * 0.5}s`}
                  repeatCount="indefinite"
                  keyPoints="1;0"
                  keyTimes="0;1"
                />
              </circle>

              {/* Pulsing indicator node at the Logo's corner connection */}
              <g transform={`translate(${node.emblemCornerX}, ${node.emblemCornerY})`}>
                <circle
                  r={isHovered ? 8 : 5}
                  fill="#FF4D5A"
                  fillOpacity={isHovered ? 0.6 : 0.3}
                  className="animate-ping"
                />
                <circle r={isHovered ? 4.5 : 3} fill="#FFFFFF" />
              </g>
            </g>
          );
        })}
      </svg>

      {/* Floating Interactive Badge Pills with Live Parallax */}
      {NODES.map((node) => {
        const isHovered = hoveredId === node.id;
        const Icon = node.icon;
        const offsetX = mouse.x * node.depth;
        const offsetY = mouse.y * node.depth;

        return (
          <div
            key={node.id}
            className="pointer-events-auto absolute transition-transform duration-200 ease-out"
            style={{
              left: `${node.xPct}%`,
              top: `${node.yPct}%`,
              transform: `translate(-50%, -50%) translate3d(${offsetX}px, ${offsetY}px, 0)`,
            }}
            onMouseEnter={() => setHoveredId(node.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div
              className={`group relative flex items-center gap-3 rounded-2xl border px-4 py-2.5 backdrop-blur-xl transition-all duration-300 cursor-pointer ${
                isHovered
                  ? '-translate-y-1.5 scale-105 border-crimson/90 bg-surface shadow-2xl shadow-crimson/30 ring-1 ring-crimson/60'
                  : 'border-line-subtle bg-surface/75 hover:border-crimson/50 hover:bg-surface/90 hover:shadow-xl hover:shadow-crimson/15'
              }`}
            >
              {/* Pulsing Red Dot Network Hub Node linked to Logo Corner */}
              <div className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-crimson shadow-md shadow-crimson/60" />
              </div>

              {/* Label & Details */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-xs font-semibold text-content transition-colors group-hover:text-white">
                    {node.label}
                  </span>
                  <Icon className="h-3 w-3 text-crimson transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <span className="text-[10px] font-mono text-content-muted transition-colors group-hover:text-crimson-bright">
                  ● {node.sub}
                </span>
              </div>

              {/* Active Ambient Glow Aura on hover */}
              <span className="pointer-events-none absolute -inset-1 rounded-2xl bg-crimson/15 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
